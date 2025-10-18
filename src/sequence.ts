// import {MiddlewareSequence} from '@loopback/rest';
// export class MySequence extends MiddlewareSequence {}

import { AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND } from '@loopback/authentication';
import { inject } from '@loopback/context';
import { FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler } from '@loopback/rest';
import { repository } from '@loopback/repository';
import { UsuarioRepository } from './repositories';
import * as fs from 'fs';
import * as path from 'path';

export class MySequence implements SequenceHandler {
    @inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true })
    protected invokeMiddleware: InvokeMiddleware = () => false;

    constructor(
        @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
        @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
        @inject(SequenceActions.SEND) public send: Send,
        @inject(SequenceActions.REJECT) public reject: Reject,
        @inject(AuthenticationBindings.AUTH_ACTION)
        protected authenticateRequest: AuthenticateFn,
        @repository(UsuarioRepository)
        public usuarioRepository: UsuarioRepository,
    ) { }

    // Dentro de esta función pasan TODAS las peticiones de la API
    async handle(context: RequestContext) {
        const startTime = Date.now();
        try {
            const { request, response } = context;
            const finished = await this.invokeMiddleware(context);
            if (finished) return;
            const route = this.findRoute(request);

            //llamamos a la acción de autenticacion
            await this.authenticateRequest(request);

            //Si la autenticacion fue correcta, procede a invocar el controlador
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);

            // Registrar la petición exitosa
            const duration = Date.now() - startTime;
            this.logRequest(request, response, duration, null);
        } catch (err) {
            if (err.code === AUTHENTICATION_STRATEGY_NOT_FOUND || err.code === USER_PROFILE_NOT_FOUND) {
                Object.assign(err, { statusCode: 401 /* No autorizado */ })
            }

            // Registrar la petición con error
            const duration = Date.now() - startTime;
            this.logRequest(context.request, context.response, duration, err);

            this.reject(context, err);
            return;
        }
    }

    private async logRequest(request: any, response: any, duration: number, error: any): Promise<void> {
        try {
            const ahora = new Date();
            const año = ahora.getFullYear();
            const mes = String(ahora.getMonth() + 1).padStart(2, '0');
            const dia = String(ahora.getDate()).padStart(2, '0');
            const hora = String(ahora.getHours()).padStart(2, '0');
            const minuto = String(ahora.getMinutes()).padStart(2, '0');
            const segundo = String(ahora.getSeconds()).padStart(2, '0');
            const milisegundo = String(ahora.getMilliseconds()).padStart(3, '0');

            const timestamp = `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}.${milisegundo}`;
            const nombreArchivo = `api_requests_${año}_${mes}.txt`;

            // Crear directorio de logs si no existe
            const logsDir = path.join(process.cwd(), 'logs');
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
            }

            const rutaArchivo = path.join(logsDir, nombreArchivo);

            // Obtener información del usuario autenticado (si existe)
            let usuario = 'Anónimo';
            try {
                if (request.headers?.authorization) {
                    const authHeader = request.headers.authorization;
                    if (authHeader.startsWith('Bearer ')) {
                        const token = authHeader.split(' ')[1];
                        const jwt = require('jsonwebtoken');
                        const decoded = jwt.decode(token);
                        if (decoded && typeof decoded === 'object' && decoded.id) {
                            // Consultar el email del usuario en la base de datos
                            const usuarioDB = await this.usuarioRepository.findById(decoded.id);
                            usuario = usuarioDB.mail || `Usuario ID: ${decoded.id}`;
                        }
                    }
                }
            } catch (e) {
                // Si no se puede obtener el usuario, mantener "Anónimo"
            }

            // Obtener IP del cliente (si llamo desde local veré [::])
            const ip =
                (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                request.headers['x-real-ip'] ||
                request.socket?.remoteAddress ||
                'IP desconocida';

            // Determinar el status code
            const statusCode = error ? error.statusCode || 500 : response.statusCode || 200;

            // Construir el mensaje del log
            const metodo = request.method || 'UNKNOWN';
            const url = request.url || '/';
            const mensajeError = error ? ` | Error: ${error.message}` : '';

            const lineaLog = `[${timestamp}] [${ip}] [${usuario}] ${metodo} ${url} - Status: ${statusCode} - ${duration}ms${mensajeError}\n`;

            // Añadir el log al archivo (append) de forma asíncrona
            fs.appendFile(rutaArchivo, lineaLog, 'utf8', (err) => {
                if (err) {
                    console.error('Error al guardar log de request:', err);
                }
            });
        } catch (error) {
            // Si falla el logging, no interrumpir la aplicación
            console.error('Error en logging de request:', error);
        }
    }
}
