import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const isValidPassword = async (plainTextPassword: string, hash: string) => await bcrypt.compare(plainTextPassword, hash);

export const getJwt = (payload: any) =>
  jwt.sign(payload, process.env.GD_JWT_SECRET, {
    expiresIn: `${process.env.GD_JWT_LIFESPAN_MINS}m`
  });

export const authenticate = async (token: any) => {
  if (token) {
    try {
      await jwt.verify(token, process.env.GD_JWT_SECRET);
      return true;
    } catch (e) {
      return false;
    }
  }

  return false;
};

export const decodeToken = (token: any) => {
  const decodedToken = jwt.decode(token, { complete: true });

  if (!decodedToken) {
    throw new Error();
  }

  return decodedToken;
};

export const getUser = (token: any) => {
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
