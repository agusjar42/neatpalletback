import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import crypto from 'crypto';
import {
  RefrescarTokenRepository,
  UsuarioCredencialesRepository,
  UsuarioRepository,
} from '../repositories';
import {PasswordHasherBindings, PasswordResetBindings} from '../keys';
import {PasswordHasher} from './hash.password.bcryptjs';
import {EmailService} from './email.service';
import {PasswordPolicyService} from './password-policy.service';
import {PasswordResetThrottleService} from './password-reset-throttle.service';

export class PasswordResetService {
  private readonly passwordPolicy: PasswordPolicyService;

  constructor(
    @repository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    @repository(UsuarioCredencialesRepository)
    private usuarioCredencialesRepository: UsuarioCredencialesRepository,
    @repository(RefrescarTokenRepository)
    private refrescarTokenRepository: RefrescarTokenRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    private passwordHasher: PasswordHasher,
    @inject(PasswordResetBindings.EMAIL_SERVICE)
    private emailService: EmailService,
    @inject(PasswordResetBindings.THROTTLE_SERVICE)
    private throttleService: PasswordResetThrottleService,
    @inject(PasswordResetBindings.FRONTEND_BASE_URL)
    private frontendBaseUrl: string,
    @inject(PasswordResetBindings.TOKEN_TTL_MINUTES)
    private tokenTtlMinutes: number,
    @inject(PasswordResetBindings.TOKEN_PEPPER)
    private tokenPepper: string,
    @inject(PasswordResetBindings.PASSWORD_MIN_LENGTH)
    private passwordMinLength: number,
    @inject(PasswordResetBindings.PASSWORD_REQUIRE_LETTER)
    private passwordRequireLetter: boolean,
    @inject(PasswordResetBindings.PASSWORD_REQUIRE_NUMBER)
    private passwordRequireNumber: boolean,
  ) {
    this.passwordPolicy = new PasswordPolicyService({
      minLength: this.passwordMinLength,
      requireLetter: this.passwordRequireLetter,
      requireNumber: this.passwordRequireNumber,
    });
  }

  normalizeEmail(email: string): string {
    return String(email ?? '')
      .trim()
      .toLowerCase();
  }

  async requestPasswordReset(
    email: string,
    requestIp?: string,
    userAgent?: string,
  ): Promise<void> {
    const normalizedEmail = this.normalizeEmail(email);
    const ip = requestIp?.trim() || 'unknown';
    const allowed = this.throttleService.allowForgot(ip, normalizedEmail);
    if (!allowed) return;

    const user = await this.usuarioRepository.findOne({
      where: {mail: normalizedEmail},
    });
    if (!user?.id) return;

    const {rawToken, tokenHash} = this.generateToken();
    const now = new Date();
    const createdAt = now.toISOString();
    const expiresAt = new Date(
      now.getTime() + this.tokenTtlMinutes * 60_000,
    ).toISOString();

    // Invalidate any previous unused reset tokens for this user
    await this.refrescarTokenRepository.updateAll(
      {fechaUso: createdAt},
      {usuarioId: user.id, tipoToken: 'passwordReset', fechaUso: null},
    );

    // Store only the hash (no raw token)
    await this.refrescarTokenRepository.create({
      usuarioId: user.id,
      tipoToken: 'passwordReset',
      hashToken: tokenHash,
      fechaExpiracion: expiresAt,
      fechaUso: undefined,
      ipSolicitud: requestIp?.slice(0, 45),
      agenteUsuario: userAgent?.slice(0, 512),
      usuarioCreacion: user.id,
    });

    const link = this.buildResetLink(rawToken);
    await this.emailService.sendPasswordReset(normalizedEmail, link);
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    this.passwordPolicy.validateOrThrow(newPassword);

    const tokenHash = this.hashToken(rawToken);
    const token = await this.refrescarTokenRepository.findOne({
      where: {hashToken: tokenHash, tipoToken: 'passwordReset'},
    });

    if (!token?.id) {
      throw new HttpErrors.BadRequest('Invalid or expired reset token.');
    }

    const now = new Date();
    if (token.fechaUso) {
      throw new HttpErrors.BadRequest('Invalid or expired reset token.');
    }
    if (new Date(String(token.fechaExpiracion ?? '')).getTime() <= now.getTime()) {
      throw new HttpErrors.BadRequest('Invalid or expired reset token.');
    }

    const userId = Number(token.usuarioId);
    if (!userId) {
      throw new HttpErrors.BadRequest('Invalid or expired reset token.');
    }
    const user = await this.usuarioRepository.findById(userId);
    const hashedPassword = await this.passwordHasher.hashPassword(newPassword);

    const existingCredentials = await this.usuarioCredencialesRepository.findOne(
      {where: {usuarioId: userId}},
    );
    if (existingCredentials?.id) {
      await this.usuarioCredencialesRepository.updateById(existingCredentials.id, {
        password: hashedPassword,
      });
    } else {
      await this.usuarioCredencialesRepository.create({
        usuarioId: userId,
        password: hashedPassword,
      });
    }

    const fechaModificacion = now.toISOString();
    await this.usuarioRepository.updateById(user.id, {
      fechaModificacion,
    });

    await this.refrescarTokenRepository.updateById(token.id, {
      fechaUso: fechaModificacion,
      usuarioModificacion: userId,
    });

    // Revoke refresh tokens if supported
    await this.refrescarTokenRepository.deleteAll({
      and: [
        {usuarioId: userId},
        {or: [{tipoToken: 'refresh'}, {tipoToken: null}]},
      ],
    });

    // Cleanup expired tokens for this user
    await this.refrescarTokenRepository.deleteAll({
      and: [
        {usuarioId: userId},
        {tipoToken: 'passwordReset'},
        {fechaExpiracion: {lt: now.toISOString()}},
      ],
    });
  }

  generateToken(): {rawToken: string; tokenHash: string} {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    return {rawToken, tokenHash};
  }

  hashToken(rawToken: string): string {
    const h = crypto.createHash('sha256');
    h.update(String(rawToken), 'utf8');
    if (this.tokenPepper) h.update(this.tokenPepper, 'utf8');
    return h.digest('hex');
  }

  buildResetLink(rawToken: string): string {
    //
    //Obtenemos la URL base del frontend desde las variables de entorno según el entorno actual (PRO, DEV, PRE, LOCAL)
    //
    let baseUrl = (process.env.ENTORNO == "PRO") ? process.env.HOST_PRO : (process.env.ENTORNO == "DEV") ? process.env.HOST_DEV : (process.env.ENTORNO == "PRE") ? process.env.HOST_PRE : process.env.HOST_LOCAL;
    //
    //Si el entorno es local entonces forzamos el protocolo http, en caso contrario forzamos https
    //
    baseUrl = (process.env.ENTORNO === "LOCAL") ? ('http://' + baseUrl + ':3000') : ('https://' + baseUrl);
    const base = String(baseUrl ?? '').replace(/\/+$/, '');
    //
    //Si no está configurada la URL base, lanzamos un error porque no podemos generar el enlace de restablecimiento sin ella
    //
    if (!base) {
      throw new HttpErrors.InternalServerError(
        'FRONTEND_BASE_URL is not configured.',
      );
    }
    //
    //Devolvemos la URL completa para el restablecimiento de contraseña, incluyendo el token como parámetro de consulta. El frontend usará este token para validar la solicitud de restablecimiento. El token se codifica para asegurar que se transmita correctamente en la URL.
    //
    return `${base}/reset-password?token=${encodeURIComponent(rawToken)}`;
  }
}
