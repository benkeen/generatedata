// import bcrypt from 'bcryptjs'; // TODO was bcrypt
import clientConfig from '@generatedata/config/clientConfig';
import { SignInWithGoogleButton, initGoogleAuth } from '~core/auth/google/google';

// TODO
// refresh the token 1 minute before it expires
export const setAuthTokenRefresh = (tokenExpiry: number, onRefresh: any): void => {
  const oneMinFromExpiry = clientConfig.auth.GD_JWT_LIFESPAN_MINS * 60 * 1000 - 60 * 1000;
  const timeout = setTimeout((): void => {
    clearTimeout(timeout);
    onRefresh();
  }, oneMinFromExpiry);
};

export const initAuthVendors = (): void => {
  if (clientConfig.auth.GD_GOOGLE_AUTH_CLIENT_ID) {
    initGoogleAuth();
  }
};

export const hasVendorLogin = (): boolean => {
  return !!clientConfig.auth.GD_GOOGLE_AUTH_CLIENT_ID;
};

export const getVendorLoginButtons = (): React.ReactNode[] => {
  const buttons: any[] = [];

  if (clientConfig.auth.GD_GOOGLE_AUTH_CLIENT_ID) {
    buttons.push(SignInWithGoogleButton);
  }

  return buttons;
};
