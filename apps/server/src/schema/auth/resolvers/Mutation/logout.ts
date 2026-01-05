import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';

export const logout: NonNullable<MutationResolvers['logout']> = async (_parent, _arg, { req, res }) => {
  if (!req.cookies.refreshToken) {
    return { success: true };
  }

  const refreshToken = req.cookies.refreshToken;
  const user = await db.accounts.findOne({
    attributes: ['accountId'],
    where: {
      refreshToken
    }
  });

  if (user) {
    user.update({
      refreshToken: null,
      oneTimePassword: null
    });
  }

  return { success: true };
};
