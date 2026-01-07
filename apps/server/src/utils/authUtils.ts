import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { clientConfig, serverConfig } from '@generatedata/config';

export const isValidPassword = async (plainTextPassword: string, hash: string) => await bcrypt.compare(plainTextPassword, hash);

export const getJwt = (payload: any) =>
  jwt.sign(payload, serverConfig.auth.GD_JWT_SECRET, {
    expiresIn: `${clientConfig.auth.GD_JWT_LIFESPAN_MINS}m`
  });

export const authenticate = async (token: string) => {
  if (token) {
    try {
      jwt.verify(token, serverConfig.auth.GD_JWT_SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const decodeToken = (token: string) => {
  const decodedToken = jwt.decode(token, { complete: true });

  if (!decodedToken) {
    throw new Error();
  }

  return decodedToken;
};

export const getUser = (token: string) => {
  if (!token) {
    return {};
  }
  const decodedToken = decodeToken(token);
  return decodedToken.payload;
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
