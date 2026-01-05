import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const updateCurrentAccount: NonNullable<MutationResolvers['updateCurrentAccount']> = async (_parent, args, { token, user }) => {
  if (!authUtils.authenticate(token)) {
    return { success: false };
  }

  const { accountId } = user;
  const userRecord = await db.accounts.findByPk(accountId);

  if (!userRecord) {
    return {
      success: false
    };
  }

  const { firstName, lastName, email, country, region } = args;
  userRecord.update({
    firstName,
    lastName,
    email,
    country,
    region
  });

  return {
    success: true
  };
};
