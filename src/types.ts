// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserProfile} from '@loopback/security';
import {RequestHandler} from 'express-serve-static-core';
import {Usuario} from './models';

/**
 * Describes the token object that returned by the refresh token service functions.
 */
export type TokenObject = {
  accessToken: string;
  expiresIn?: string | undefined;
  refreshToken?: string | undefined;
};

export type AuthLoginObject = {
  accessToken: string;
  expiresIn?: string | undefined;
  refreshToken?: string | undefined;
  userData?: Omit<Usuario, 'password'> | undefined;
}
/**
 * The token refresh service. An access token expires in limited time. Therefore
 * token refresh service is needed to keep replacing the old access token with
 * a new one periodically.
 */
export interface RefreshTokenService {
  /**
   * Generate a refresh token, bind it with the given user profile + access
   * token, then store them in backend.
   */
  generateToken(userProfile: UserProfile, token: string): Promise<TokenObject>;

  /**
   * Refresh the access token bound with the given refresh token.
   */
  refreshToken(refreshToken: string): Promise<TokenObject>;
}

export interface MyUserProfile extends UserProfile {
  //role?: number | undefined;
}

export type FileUploadHandler = RequestHandler;
