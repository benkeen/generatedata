import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { clientConfig } from '@generatedata/config';
import serverConfig from '@generatedata/config/serverConfig';

export const isValidPassword = async (plainTextPassword: string, hash: string) => await bcrypt.compare(plainTextPassword, hash);

export const getJwt = (payload: any) =>
  jwt.sign(payload, serverConfig.auth.GD_JWT_SECRET, {
    expiresIn: `${clientConfig.auth.GD_JWT_LIFESPAN_MINS}m`
  });

export const authenticate = (token: string) => {
  if (token) {
    try {
      jwt.verify(token, serverConfig.auth.GD_JWT_SECRET, { algorithms: ['HS256'] });
      return true;
    } catch (_e) {
      return false;
    }
  }

  return false;
};

export const decodeToken = (token: string) => {
  const decodedToken = jwt.verify(token, serverConfig.auth.GD_JWT_SECRET, { algorithms: ['HS256'] });

  if (!decodedToken) {
    throw new Error();
  }

  if (typeof decodedToken === 'string') {
    throw new Error();
  }

  return { payload: decodedToken };
};

export const getUser = (token: string) => {
  if (!token) {
    return {};
  }

  try {
    const decodedToken = decodeToken(token);
    return decodedToken.payload;
  } catch (_e) {
    return {};
  }
};

export const accountExpired = (expiryDate: Date | null) => {
  if (expiryDate === null) {
    return false;
  }

  const now = new Date();
  const nowMs = now.getTime();
  const expiryDateMs = expiryDate ? expiryDate.getTime() : 0;

  return expiryDateMs < nowMs;
};

export const getPasswordHash = async (plainTextPassword: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};
