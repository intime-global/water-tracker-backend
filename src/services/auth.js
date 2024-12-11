import { UsersCollection } from "../db/models/user.js";
// import { randomBytes } from 'crypto';
// import bcrypt from 'bcrypt';
// const createSession = () => {
//   const accessToken = randomBytes(30).toString('base64');
//   const refreshToken = randomBytes(30).toString('base64');
//   return {
//     accessToken, refreshToken,
//     accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
//     refreshTokenValidUntil: new Date(Date.now() + THERTY_DAY),
//   };
// };

export const findUser = filter => UsersCollection.findOne(filter);
/**
  |============================
  | register User
  |============================
*/

/**
  |============================
  | login User
  |============================
*/

/**
  |============================
  | logout User
  |============================
*/

/**
  |============================
  | create session (local function)
  |============================
*/

/**
  |============================
  | refresf User session
  |============================
*/

/**
  |============================
  | request reset token
  |============================
*/

/**
  |============================
  | reset password
  |============================
*/

/**
  |============================
  | logit or signup with Google
  |============================
*/
