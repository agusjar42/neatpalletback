import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {bind, inject} from '@loopback/context';
//import { asSpecEnhancer, mergeSecuritySchemeToSpec, OASEnhancer, OpenAPIObject, OpenApiSpec } from '@loopback/openapi-v3';
import { HttpErrors, Request } from '@loopback/rest';
import { UserProfile} from '@loopback/security';
import { TokenServiceBindings } from '../keys';

//@bind(asSpecEnhancer)
//export class JWTAuthenticationStrategy implements AuthenticationStrategy, OASEnhancer {
export class JWTAuthenticationStrategy implements AuthenticationStrategy {
    
    name = 'jwt'; //-> Nombre de la estrategia

    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public tokenService: TokenService,
    ) {}

    // Autentica al usuario por medio del token que llega en el Header 
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        const token: string = this.extractCredentials(request); //-> Extrae el token del encabezado de la request
        const userProfile: UserProfile = await this.tokenService.verifyToken(token); //-> Verifica si el token es valido y nos devuelve el perfil del usuario
        return userProfile;
    }

    extractCredentials(request: Request): string {
        if (!request.headers.authorization) {
            throw new HttpErrors.Unauthorized(`Encabezado de la Autorización no encontrado.`);
        }

        // Por ejemplo: Bearer xxx.yyy.zzz
        const authHeaderValue = request.headers.authorization;

        if (!authHeaderValue.startsWith('Bearer')) {
            throw new HttpErrors.Unauthorized(`Encabezado de la Autorización no es de tipo Bearer`);
        }

        // Separamos el string en 2 partes: Bearer y xxx.yyy.zzz
        const parts = authHeaderValue.split(' ');
        if (parts.length !== 2)
            throw new HttpErrors.Unauthorized(
                `El valor del encabezado de autorización tiene demasiadas partes. debe seguir el patrón: 'Bearer xxx.yyy.zzz' donde xxx.yyy.zzz es un token JWT válido`
            );
        const token = parts[1];

        return token;
    }

    // modifySpec(spec: OpenAPIObject): OpenApiSpec {
    //     return mergeSecuritySchemeToSpec(spec, this.name, {
    //         type: 'http',
    //         scheme: 'bearer',
    //         bearerFormat: 'JWT',
    //     });
    // }
}