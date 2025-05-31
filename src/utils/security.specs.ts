// import {ReferenceObject, SecuritySchemeObject} from '@loopback/openapi-v3';

// //Customiza la interfaz de loopback openapi para que tenga seguridad JWT

// export const OPERATION_SECURITY_SPEC = [{bearerAuth: new Array()}];

// export type SecuritySchemeObjects = {
//     [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
// };

// export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
//     bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//     },
// };