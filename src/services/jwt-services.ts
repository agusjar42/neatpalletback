import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import { TokenServiceBindings } from '../keys';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
    constructor(
      @inject(TokenServiceBindings.TOKEN_SECRET)
      private jwtSecret: string,
      @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
      private jwtExpiresIn: string
    ) {}
  
    async verifyToken(token: string): Promise<UserProfile> {
      if (!token) {
        throw new HttpErrors.Unauthorized(
          `Error Sesión invalida`,
        );
      }

      let userProfile: UserProfile;
  
      try {
        // decodificar el perfil de usuario del token
        const decodedToken = await verifyAsync(token, this.jwtSecret);
        // no copiar los campos de token 'iat' y 'exp', ni 'email' al perfil de usuario
        userProfile = Object.assign(
          {[securityId]: '', nombre: ''},
          {
            [securityId]: decodedToken.id,
            nombre: decodedToken.nombre,
            id: decodedToken.id,
            rol_id: decodedToken.rol_id,
          },
        );
      } catch (error) {
        throw new HttpErrors.Unauthorized(
          `Sesión caducada`,
        );
      }
      return userProfile;
    }
  
    async generateToken(userProfile: UserProfile): Promise<string> {
      if (!userProfile) {
        throw new HttpErrors.Unauthorized(
          'Error al iniciar Sesión',
        );
      }
      const userInfoForToken = {
        id: userProfile[securityId],
        nombre: userProfile.nombre,
        rolId: userProfile.rol_id,
      };
      // Generamos el JSON Web Token
      let token: string;
      try {
        token = await signAsync(userInfoForToken, this.jwtSecret, {
          expiresIn: Number(this.jwtExpiresIn),
        });
      } catch (error) {
        throw new HttpErrors.Unauthorized(`Error al iniciar Sesión`);
      }
  
      return token;
    }
  }