import { UserService } from '@loopback/authentication';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { PasswordHasherBindings } from '../keys';
import { Usuario } from '../models/usuario.model';
import { Credentials, UsuarioRepository } from '../repositories/usuario.repository';
import { PasswordHasher } from './hash.password.bcryptjs';
import { validateCredentials } from './validator';

export class MyUserService implements UserService<Usuario, Credentials> {
    constructor(
        @repository(UsuarioRepository)
        public userRepository: UsuarioRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher
    ) { }

    async verifyCredentials(credentials: Credentials): Promise<Usuario> {
        const invalidCredentialsError = 'Credenciales Incorrectas';
        validateCredentials(credentials);

        const foundUser = await this.userRepository.findOne({
            //   fields: {
            //     id: true,
            //     mail: true,
            //     rol_id: true
            //   },
            where: { mail: credentials.mail }
        });
        if (!foundUser) {
            throw new HttpErrors.NotFound(
                `Usuario con mail ${credentials.mail} no encontrado.`
            );
        } 
        /*else {
            if (foundUser.activoSN == N) {
                throw new HttpErrors.Forbidden(
                    `Usuario con mail ${credentials.mail} no tiene activa la cuenta.`
                )
            }
        }*/

        const credentialsFound = await this.userRepository.findCredentials(
            foundUser.id,
        );
        if (!credentialsFound) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        // Comparamos las contraseñas
        const passwordMatched = await this.passwordHasher.comparePassword(
            credentials.password,
            credentialsFound.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('Las credenciales no son correctas.');
        }

        return foundUser;
    }

    // Convierte el modelo de usuario a un tipo UserProfile, esto porque se necesita procesar de esta forma a la hora de crear el token
    convertToUserProfile(user: Usuario): UserProfile {
        // Dado que el nombre y el apellido son opcionales, no se genera ningún error si no se proporcionan
        return {
            [securityId]: String(user.id),
            id: user.id,
            mail: user.mail,
            rolId: user.rolId,
            empresaId: user.empresaId,
        };
    }
}