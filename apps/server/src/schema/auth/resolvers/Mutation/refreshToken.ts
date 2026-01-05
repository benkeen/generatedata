import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import { getAccountNumRowsGenerated } from '../../../accounts/helpers';
import { getNewTokens } from '../../helpers';

export const refreshToken: NonNullable<MutationResolvers['refreshToken']> = async (_parent, _args, { req }) => {
  if (!req.cookies.refreshToken) {
    return { success: false };
  }

  const oldRefreshToken = req.cookies.refreshToken;
  const user = await db.accounts.findOne({
    attributes: ['accountId', 'accountType', 'firstName', 'email', 'lastName', 'country', 'region', 'dateCreated', 'expiryDate'],
    where: {
      refreshToken: oldRefreshToken
    }
  });

  if (!user) {
    return { success: false };
  }

  const { accountId, email } = user.dataValues;
  const { token: newToken, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user);

  const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

  return {
    success: true,
    token: newToken,
    tokenExpiry,
    refreshToken,
    numRowsGenerated,
    ...user.dataValues
  };
};
