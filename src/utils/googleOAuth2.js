import { OAuth2Client } from 'google-auth-library';

import { env } from './env.js';
import createHttpError from 'http-errors';

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: `${env('FRONTEND_DOMAIN')}/googleauth`,
});

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getUsernameFromGoogleTokenPayload = (payload) => {
  if (payload.name) return payload.name;
  let username = '';
  if (payload.given_name) {
    username += payload.given_name;
  }
  if (payload.family_name) {
    username += payload.given_name;
  }
  return username;
};
