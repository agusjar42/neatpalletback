import {HttpErrors} from '@loopback/rest';

export type PasswordPolicyConfig = {
  minLength: number;
  requireLetter: boolean;
  requireNumber: boolean;
};

export class PasswordPolicyService {
  constructor(private config: PasswordPolicyConfig) {}

  validateOrThrow(newPassword: string): void {
    const minLength = this.config.minLength;
    if (!newPassword || newPassword.length < minLength) {
      throw new HttpErrors.UnprocessableEntity(
        `Password must be at least ${minLength} characters long.`,
      );
    }
    if (this.config.requireLetter && !/[A-Za-z]/.test(newPassword)) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must include at least 1 letter.',
      );
    }
    if (this.config.requireNumber && !/[0-9]/.test(newPassword)) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must include at least 1 number.',
      );
    }
  }
}

