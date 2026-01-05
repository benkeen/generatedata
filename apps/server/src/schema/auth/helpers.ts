import { nanoid } from 'nanoid';
import * as authUtils from '../../utils/authUtils';
import { clientConfig } from '@generatedata/config';

export const getNewTokens = async (accountId: number, email: string, user: any) => {
  const token = authUtils.getJwt({ accountId, email });

  // store the refresh token in a cookie and stash in the db
  const refreshToken = nanoid();
  await user.update({ refreshToken: refreshToken });

  // ideally we'd set this cookie here on the server by passing back a Set-Cookie header. But due to the different
  // ports, that's a no go. Instead, this is passed back to the client which sets it in a cookie. That info is then
  // sent along with any subsequent requests to the server - including the all-important refreshToken request. This
  // info enables the front-end code to transparently extend the lifespan of the living token (`token`) just by making
  // requests

  const expiryMsFromNow = clientConfig.auth.GD_JWT_LIFESPAN_MINS * 60 * 1000;
  const tokenExpiry = new Date().getTime() + expiryMsFromNow;

  return { token, tokenExpiry, refreshToken };
};
