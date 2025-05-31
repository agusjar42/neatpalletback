// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication';
import {RefrescarTokenService} from './services/refresh-token.service';
import {BindingKey} from '@loopback/context';
import { PasswordHasher } from './services/hash.password.bcryptjs';
import { Usuario } from './models';
import { Credentials } from './repositories';
import { ExpressRequestHandler } from '@loopback/rest';
import {FileUploadHandler} from './types';

export namespace TokenServiceConstants {
    export const TOKEN_SECRET_VALUE = 'myjwts3cr3t' //-> LLave secreta con que se encriptara nuestro token
    export const TOKEN_EXPIRES_IN_VALUE = '600' //-> Duración en milisegundos
}

// Define el nombre de las variables que usamos para el token
export namespace TokenServiceBindings {
    export const TOKEN_SECRET = BindingKey.create<string>(
        'authentication.jwt.secret',
    );
    export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
        'authentication.jwt.expires.in.seconds',
    );
    export const TOKEN_SERVICE = BindingKey.create<TokenService>(
        'services.authentication.jwt.tokenservice',
    );
}

export namespace FileUploadBindings {
  /**
 * Binding key for the file upload service
 */
  export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
    'services.FileUpload',
  );

  /**
   * Binding key for the storage directory
   */
  export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

}
export namespace RefreshTokenConstants {
    /**
     * The default secret used when generating refresh token.
     */
    export const REFRESH_SECRET_VALUE = process.env.REFRESH_SECRET_VALUE || '';
    /**
     * The default expiration time for refresh token.
     */
    export const REFRESH_EXPIRES_IN_VALUE = process.env.REFRESH_EXPIRES_IN_VALUE || '';
    /**
     * The default issuer used when generating refresh token.
     */
    export const REFRESH_ISSUER_VALUE = process.env.REFRESH_ISSUER_VALUE || '';
  }

export namespace RefreshTokenServiceBindings {
    export const REFRESH_TOKEN_SERVICE = BindingKey.create<RefrescarTokenService>(
      'services.authentication.jwt.refresh.tokenservice',
    );
    export const REFRESH_SECRET = BindingKey.create<string>(
      'authentication.jwt.refresh.secret',
    );
    export const REFRESH_EXPIRES_IN = BindingKey.create<string>(
      'authentication.jwt.refresh.expires.in.seconds',
    );
    export const REFRESH_ISSUER = BindingKey.create<string>(
      'authentication.jwt.refresh.issuer',
    );
    /**
     * The backend datasource for refresh token's persistency.
     */
    export const DATASOURCE_NAME = 'mysql';
    /**
     * Key for the repository that stores the refresh token and its bound user
     * information
     */
    export const REFRESH_REPOSITORY = 'repositories.RefreshTokenRepository';
  }

// Define el nombre de las variables que usamos para el servicio de usuario
export namespace UserServiceBindings {
    export const USER_SERVICE = BindingKey.create<UserService<Usuario, Credentials>>(
      'services.user.service',
    );
  }

// Define el nombre de las variables que usamos para el servicio de Desencriptar-Encriptar el Password
export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
        'services.hasher'
    );
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}