import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer } from '@loopback/authorization';
import { inject, Provider } from '@loopback/core';
import { UserProfile, securityId } from '@loopback/security';
import _ from 'lodash';
import { repository } from '@loopback/repository';
import { UsuarioRepository } from '../repositories/usuario.repository';
/**
 * Clase para configurar de manera global la protección de la API
 * Donde podremos configurar cada endpoint protegido o no, por medio del Decorador -> @authorize({allowedRoles: ['admin', 'api']})
 */
export class MyAuthorizationProvider implements Provider<Authorizer> {
    constructor(
        @repository(UsuarioRepository)
        public usuarioRepository: UsuarioRepository,
    ) { }

    /**
     * @returns authenticateFn
     */
    value(): Authorizer {
        return this.authorize.bind(this);
    }
    //
    //ATENCIÓN: He modificado el proceso para que funcione al reves, lo que quiero es que cualquiera que esté logueado en el sistema pueda acceder
    //excepto los que tengan un rol concreto, por ejemplo: 'API'
    //
    async authorize(
        authorizationCtx: AuthorizationContext,
        metadata: AuthorizationMetadata,
    ) {
        // No se permite el acceso si faltan detalles de autorización
        let currentUser: UserProfile;
        if (authorizationCtx.principals.length > 0) {
            const userId = _.pick(authorizationCtx.principals[0], ['id']);
            const dataSource = this.usuarioRepository.dataSource;
            const registros = await dataSource.execute(`SELECT * FROM vista_empresa_rol_usuario WHERE id = ${userId.id}`);
            const user = registros[0];
            if (!user) {
                return AuthorizationDecision.DENY; //-> Denegar si no se encuentra el usuario
            }
            currentUser = { [securityId]: user.id, nombre: user.nombre, rol: user.nombreRol };
        } else {
            return AuthorizationDecision.DENY; //-> Denegar
        }
        if (!currentUser.rol) {
            return AuthorizationDecision.DENY; //-> Denegar
        }

        //Autorizar todo lo que no tenga una propiedad permitida Roles
        if (!metadata.allowedRoles) {
            return AuthorizationDecision.ALLOW; //-> Permitir
        }
        //
        //Esto es lo que he cambiado, ahora se deniega el acceso a los roles que estén en la propiedad allowedRoles
        //
        if (metadata.allowedRoles!.includes(currentUser.rol)) {
            return AuthorizationDecision.DENY; //-> Denegar
        } else {
            return AuthorizationDecision.ALLOW; //-> Permitir
        }
    }
}