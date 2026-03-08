import {Client, expect} from '@loopback/testlab';
import {NeatpalletBackApplication} from '../..';
import {setupApplication} from './test-helper';
import {
  RefrescarTokenRepository,
  UsuarioCredencialesRepository,
  UsuarioRepository,
} from '../../repositories';
import {PasswordHasherBindings, PasswordResetBindings} from '../../keys';
import {PasswordHasher} from '../../services/hash.password.bcryptjs';
import crypto from 'crypto';

class TestEmailService {
  sent: Array<{toEmail: string; link: string}> = [];
  async sendPasswordReset(toEmail: string, link: string): Promise<void> {
    this.sent.push({toEmail, link});
  }
}

class AllowAllThrottleService {
  allowForgot(_ip: string, _email: string): boolean {
    return true;
  }
}

describe('AuthPasswordController (acceptance)', () => {
  let app: NeatpalletBackApplication;
  let client: Client;
  let emailService: TestEmailService;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    emailService = new TestEmailService();

    const bindOrRebind = (key: string, value: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyApp = app as any;
      if (typeof anyApp.isBound === 'function' && anyApp.isBound(key)) {
        anyApp.unbind(key);
      }
      anyApp.bind(key).to(value);
    };

    bindOrRebind(PasswordResetBindings.EMAIL_SERVICE.key, emailService);
    bindOrRebind(
      PasswordResetBindings.THROTTLE_SERVICE.key,
      new AllowAllThrottleService(),
    );
    bindOrRebind(
      PasswordResetBindings.FRONTEND_BASE_URL.key,
      'https://frontend.test',
    );
    bindOrRebind(PasswordResetBindings.TOKEN_TTL_MINUTES.key, 30);
    bindOrRebind(PasswordResetBindings.TOKEN_PEPPER.key, 'test-pepper');
    bindOrRebind(PasswordResetBindings.PASSWORD_MIN_LENGTH.key, 10);
    bindOrRebind(PasswordResetBindings.PASSWORD_REQUIRE_LETTER.key, true);
    bindOrRebind(PasswordResetBindings.PASSWORD_REQUIRE_NUMBER.key, true);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    emailService.sent = [];

    const usuarioRepo = await app.getRepository(UsuarioRepository);
    const credRepo = await app.getRepository(UsuarioCredencialesRepository);
    const tokenRepo = await app.getRepository(RefrescarTokenRepository);
    const passwordHasher = await app.get<PasswordHasher>(
      PasswordHasherBindings.PASSWORD_HASHER,
    );

    await tokenRepo.deleteAll();
    await credRepo.deleteAll();
    await usuarioRepo.deleteAll();

    const user = await usuarioRepo.create({
      empresaId: 1,
      rolId: 1,
      idiomaId: 1,
      nombre: 'Test',
      mail: 'user@example.com',
    });
    await credRepo.create({
      usuarioId: user.id!,
      password: await passwordHasher.hashPassword('OldPassword1'),
    });
  });

  it('forgot always returns 200 for existing and non-existing emails', async () => {
    const res1 = await client
      .post('/auth/password/forgot')
      .send({email: ' USER@example.com '})
      .expect(200);
    expect(res1.body).to.deepEqual({
      message: 'If an account exists for that email, we sent a reset link.',
    });
    expect(emailService.sent).to.have.length(1);

    const res2 = await client
      .post('/auth/password/forgot')
      .send({email: 'doesnotexist@example.com'})
      .expect(200);
    expect(res2.body).to.deepEqual(res1.body);
    expect(emailService.sent).to.have.length(1);
  });

  it('reset succeeds with valid token', async () => {
    await client
      .post('/auth/password/forgot')
      .send({email: 'user@example.com'})
      .expect(200);

    const link = emailService.sent[0].link;
    const token = new URL(link).searchParams.get('token');
    expect(typeof token).to.equal('string');

    await client
      .post('/auth/password/reset')
      .send({token, newPassword: 'NewPassword123'})
      .expect(200);

    await client
      .post('/usuarios/login')
      .send({mail: 'user@example.com', password: 'NewPassword123'})
      .expect(200);
  });

  it('token is single-use', async () => {
    await client
      .post('/auth/password/forgot')
      .send({email: 'user@example.com'})
      .expect(200);

    const token = new URL(emailService.sent[0].link).searchParams.get('token');
    await client
      .post('/auth/password/reset')
      .send({token, newPassword: 'NewPassword123'})
      .expect(200);

    await client
      .post('/auth/password/reset')
      .send({token, newPassword: 'AnotherPassword123'})
      .expect(400);
  });

  it('expired token is rejected', async () => {
    await client
      .post('/auth/password/forgot')
      .send({email: 'user@example.com'})
      .expect(200);

    const link = emailService.sent[0].link;
    const token = new URL(link).searchParams.get('token')!;

    // Expire the stored token
    const tokenRepo = await app.getRepository(RefrescarTokenRepository);
    const pepper = 'test-pepper';
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .update(pepper)
      .digest('hex');
    const record = await tokenRepo.findOne({
      where: {hashToken: tokenHash, tipoToken: 'passwordReset'},
    });
    expect(record).to.not.be.null();
    await tokenRepo.updateById(record!.id!, {
      fechaExpiracion: new Date(Date.now() - 60_000).toISOString(),
    });

    await client
      .post('/auth/password/reset')
      .send({token, newPassword: 'NewPassword123'})
      .expect(400);
  });

  it('password policy enforced', async () => {
    await client
      .post('/auth/password/forgot')
      .send({email: 'user@example.com'})
      .expect(200);

    const token = new URL(emailService.sent[0].link).searchParams.get('token');
    await client
      .post('/auth/password/reset')
      .send({token, newPassword: 'short1'})
      .expect(422);
  });
});
