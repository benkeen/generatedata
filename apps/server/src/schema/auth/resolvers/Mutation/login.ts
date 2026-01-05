import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';
import { getAccountNumRowsGenerated } from '../../../accounts/helpers';
import { getNewTokens } from '../../helpers';

export const login: NonNullable<MutationResolvers['login']> = async (_parent, { email, password }, _ctx) => {
  const user = await db.accounts.findOne({
    attributes: [
      'accountId',
      'accountType',
      'password',
      'oneTimePassword',
      'firstName',
      'lastName',
      'country',
      'region',
      'dateCreated',
      'expiryDate'
    ],
    where: {
      email
    }
  });

  if (!user) {
    return { success: false };
  }

  const { accountId, password: encodedPassword, oneTimePassword, expiryDate } = user.dataValues;

  const accountExpired = authUtils.accountExpired(expiryDate);
  if (accountExpired) {
    await user.update({
      accountStatus: 'expired'
    });

    return {
      success: false,
      error: 'accountExpired'
    };
  }

  const isCorrect = await authUtils.isValidPassword(password, encodedPassword);

  let oneTimePasswordIsCorrect = false;
  if (oneTimePassword) {
    oneTimePasswordIsCorrect = await authUtils.isValidPassword(password, oneTimePassword);

    // note we don't reset the password here. It's needed on the request to update the password - there we DON'T
    // check the previous one (since it's not available). We only ever want to do that if there's a one-time password
    // still in the DB.
  }

  if (!isCorrect && !oneTimePasswordIsCorrect) {
    return { success: false };
  }

  const { token, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user);
  const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

  // we ignore async-ness here. No point slowing down the login just to track the last logged in date
  user.update({
    lastLoggedIn: new Date().getTime() / 1000
  });

  return {
    success: true,
    token,
    tokenExpiry,
    refreshToken,
    email,
    wasOneTimeLogin: oneTimePasswordIsCorrect,
    numRowsGenerated,
    ...user.dataValues
  };
};
