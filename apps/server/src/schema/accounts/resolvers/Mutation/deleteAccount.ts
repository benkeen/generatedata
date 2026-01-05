import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const deleteAccount: NonNullable<MutationResolvers['deleteAccount']> = async (_parent, { accountId }, { token, user }) => {
  if (!authUtils.authenticate(token)) {
    return { success: false };
  }

  const userRecord = await db.accounts.findByPk(user.accountId);
  if (!userRecord || userRecord.dataValues.accountType !== 'superuser') {
    return {
      success: false,
      errorStatus: 'PermissionDenied'
    };
  }

  db.accounts.destroy({ where: { accountId } });

  return {
    success: true
  };
};
