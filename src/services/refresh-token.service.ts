import {TokenService} from '@loopback/authentication';
import {BindingScope, inject, injectable, uuid} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {
  RefreshTokenServiceBindings,
  TokenServiceBindings,
  UserServiceBindings
} from '../keys';
import { RefrescarToken, RefrescarTokenRelations } from '../models';
import { RefrescarTokenRepository } from '../repositories';
import { TokenObject } from '../types';
import { MyUserService } from './user-service';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

@injectable({scope: BindingScope.TRANSIENT})
export class RefrescarTokenService {
  constructor(
    @inject(RefreshTokenServiceBindings.REFRESH_SECRET)
    private refreshSecret: string,
    @inject(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN)
    private refreshExpiresIn: string,
    @inject(RefreshTokenServiceBindings.REFRESH_ISSUER)
    private refreshIssure: string,
    @repository(RefrescarTokenRepository)
    public RefrescarTokenRepository: RefrescarTokenRepository,
    @inject(UserServiceBindings.USER_SERVICE) public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
  ) { }
  /**
   * Genera un token de actualización, y lo vincula con el perfil de usuario + token dado
   * Luego guarda el registro
   */
  async generateToken(
    userProfile: UserProfile,
    token: string,
  ): Promise<TokenObject> {
    const data = {
      token: uuid(),
    };
    const refreshToken = await signAsync(data, this.refreshSecret, {
      expiresIn: Number(this.refreshExpiresIn),
      issuer: this.refreshIssure,
    });
    const result = {
      accessToken: token,
      refreshToken: refreshToken,
    };
    await this.RefrescarTokenRepository.create({
      usuarioId:  Number(userProfile[securityId]),
      refreshToken: result.refreshToken,
    });
    return result;
  }

  /*
   * Actualiza el token de acceso vinculado con el token de actualización proporcionado.
   */
  async refreshToken(refreshToken: string): Promise<TokenObject> {
    try {
      if (!refreshToken) {
        throw new HttpErrors.Unauthorized(
          `Error al verificar el token: 'refresh token' es null`,
        );
      }

      const userRefreshData = await this.verifyToken(refreshToken);
      const user = await this.userService.userRepository.findById(
        Number(userRefreshData.usuarioId),
      );
      const userProfile: UserProfile =
        this.userService.convertToUserProfile(user);

      // crea un token web JSON basado en el perfil del usuario (userProfile)
      const token = await this.jwtService.generateToken(userProfile);

      return {
        accessToken: token,
      };
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error al verificar el token: ${error.message}`,
      );
    }
  }

  /*
   * [TODO] test and endpoint
   */
  async revokeToken(refreshToken: string) {
    try {
      await this.RefrescarTokenRepository.delete(
        new RefrescarToken({refreshToken: refreshToken}),
      );
    } catch (e) {
      // ignore
    }
  }

  /**
   * Verifica la validez de un token de actualización y asegura de que exista en el backend.
   * @param refreshToken
   */
  async verifyToken(
    refreshToken: string,
  ): Promise<RefrescarToken & RefrescarTokenRelations> {
    try {
      await verifyAsync(refreshToken, this.refreshSecret);
      const userRefreshData = await this.RefrescarTokenRepository.findOne({
        where: {refreshToken: refreshToken},
      });

      if (!userRefreshData) {
        throw new HttpErrors.Unauthorized(
          `Error al verificar el token: token no válido`,
        );
      }
      return userRefreshData;
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error al verificar el token: ${error.message}`,
      );
    }
  }
}
