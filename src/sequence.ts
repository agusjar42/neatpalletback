// import {MiddlewareSequence} from '@loopback/rest';
// export class MySequence extends MiddlewareSequence {}

import { AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND } from '@loopback/authentication';
import { inject } from '@loopback/context';
import { FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler } from '@loopback/rest';

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
    ) { }

    // Dentro de esta función pasan TODAS las peticiones de la API
    async handle(context: RequestContext) {
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
        } catch (err) {
            if (err.code === AUTHENTICATION_STRATEGY_NOT_FOUND || err.code === USER_PROFILE_NOT_FOUND) {
                Object.assign(err, { statusCode: 401 /* No autorizado */ })
            }
            this.reject(context, err);
            return;
        }
    }
}
