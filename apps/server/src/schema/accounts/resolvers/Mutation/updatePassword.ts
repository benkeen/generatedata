import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const updatePassword: NonNullable<MutationResolvers['updatePassword']> = async (_parent, args, { token, user }) => {
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

  const { currentPassword, newPassword } = args;

  const isCorrect = await authUtils.isValidPassword(currentPassword, userRecord.dataValues.password);

  if (!isCorrect) {
    const oneTimePasswordCorrect = await authUtils.isValidPassword(currentPassword, userRecord.dataValues.oneTimePassword);

    if (!oneTimePasswordCorrect) {
      return {
        success: false,
        error: 'PASSWORD_INCORRECT'
      };
    }
  }

  const newPasswordHash = await authUtils.getPasswordHash(newPassword);

  userRecord.update({
    password: newPasswordHash,
    oneTimePassword: ''
  });

  return {
    success: true
  };
};
