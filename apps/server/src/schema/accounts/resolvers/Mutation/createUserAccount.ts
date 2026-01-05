import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const createUserAccount: NonNullable<MutationResolvers['createUserAccount']> = async (_parent, args, { token, user }) => {
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

  const { accountId } = user;
  const dateCreated = new Date().getTime();
  const { firstName, lastName, email, country, region, accountStatus, expiryDate, oneTimePassword } = args;

  let expiryDateMs = null;
  if (expiryDate) {
    expiryDateMs = parseInt(expiryDate, 10);
  }

  const tempPasswordHash = oneTimePassword ? await authUtils.getPasswordHash(oneTimePassword) : undefined;

  await db.accounts.create({
    createdBy: accountId,
    accountType: 'user',
    accountStatus,
    dateCreated,
    lastUpdated: dateCreated,
    expiryDate: expiryDateMs,
    password: '', // blank password
    oneTimePassword: tempPasswordHash,
    firstName,
    lastName,
    email,
    country,
    region,
    numRowsGenerated: 0
  });

  return {
    success: true
  };
};
