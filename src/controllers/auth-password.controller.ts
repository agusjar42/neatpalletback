import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  response,
  RestBindings,
  Request,
  HttpErrors,
} from '@loopback/rest';
import {PasswordResetService} from '../services/password-reset.service';

const FORGOT_RESPONSE = {
  message: 'If an account exists for that email, we sent a reset link.',
};

export class AuthPasswordController {
  constructor(
    @inject('services.PasswordResetService')
    private passwordResetService: PasswordResetService,
    @inject(RestBindings.Http.REQUEST)
    private request: Request,
  ) {}

  @authenticate.skip()
  @post('/auth/password/forgot')
  @response(200, {
    description: 'Neutral response to avoid account enumeration',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {message: {type: 'string'}},
          required: ['message'],
        },
      },
    },
  })
  async forgot(
    @requestBody({
      description: 'Request a password reset link',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email'],
            properties: {
              email: {type: 'string', minLength: 1},
            },
          },
        },
      },
    })
    body: {email: string},
  ): Promise<{message: string}> {
    const email = body?.email;
    const requestIp = this.getRequestIp();
    const userAgent = String(this.request.headers['user-agent'] ?? '');

    await this.passwordResetService.requestPasswordReset(
      email,
      requestIp,
      userAgent,
    );

    return FORGOT_RESPONSE;
  }

  @authenticate.skip()
  @post('/auth/password/reset')
  @response(200, {
    description: 'Password updated successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {message: {type: 'string'}},
          required: ['message'],
        },
      },
    },
  })
  @response(400, {
    description: 'Invalid/expired/used token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {message: {type: 'string'}},
          required: ['message'],
        },
      },
    },
  })
  @response(422, {
    description: 'Password policy violation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {message: {type: 'string'}},
          required: ['message'],
        },
      },
    },
  })
  async reset(
    @requestBody({
      description: 'Reset password using a valid reset token',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['token', 'newPassword'],
            properties: {
              token: {type: 'string', minLength: 1},
              newPassword: {type: 'string', minLength: 1},
            },
          },
        },
      },
    })
    body: {token: string; newPassword: string},
  ): Promise<{message: string}> {
    try {
      await this.passwordResetService.resetPassword(
        body?.token,
        body?.newPassword,
      );
      return {message: 'Password updated successfully.'};
    } catch (e: any) {
      if (e?.statusCode === 400) {
        throw new HttpErrors.BadRequest('Invalid or expired reset token.');
      }
      throw e;
    }
  }

  private getRequestIp(): string | undefined {
    const xff = this.request.headers['x-forwarded-for'];
    if (typeof xff === 'string' && xff.trim()) {
      return xff.split(',')[0].trim();
    }
    // Express populates request.ip; fallback for completeness
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ip = (this.request as any).ip;
    return typeof ip === 'string' ? ip : undefined;
  }
}
