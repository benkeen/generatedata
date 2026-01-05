import dateFns from 'date-fns';
import { db } from '../../database';
import * as authUtils from '../../utils/authUtils';
import type { AccountStatus, MutationResolvers } from '@generatedata/graphql-schema';

export const updateCurrentAccount: MutationResolvers['updateCurrentAccount'] = async (_root, args, { token, user }) => {
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

export const updateAccount: MutationResolvers['updateAccount'] = async (_root, args, { token, user }) => {
  if (!authUtils.authenticate(token)) {
    return { success: false };
  }

  const { accountId, accountStatus, firstName, lastName, email, country, region, expiryDate } = args;
  const userRecord = await db.accounts.findByPk(accountId);

  const { accountId: currentAccountId } = user;
  const currentUser = await db.accounts.findByPk(currentAccountId);

  if (!currentUser || currentUser.dataValues.accountType !== 'superuser') {
    return {
      success: false,
      errorType: 'PermissionDenied'
    };
  }

  if (!userRecord) {
    return {
      success: false,
      errorType: 'NotFound'
    };
  }

  let validatedAccountStatus = accountStatus as AccountStatus;

  // "disabled" trumps "expired", otherwise the UI looks weird (you disable something but it never appears that way)
  if (expiryDate && validatedAccountStatus !== 'disabled') {
    const now = Number(dateFns.format(new Date(), 't'));

    if (parseInt(expiryDate, 10) < now) {
      validatedAccountStatus = 'expired';
    }
  }

  let expiryDateMs = null;
  if (expiryDate) {
    expiryDateMs = parseInt(expiryDate, 10);
  }

  userRecord.update({
    accountStatus: validatedAccountStatus,
    firstName,
    lastName,
    email,
    country,
    region,
    expiryDate: expiryDateMs
  });

  return {
    success: true
  };
};

export const updatePassword: MutationResolvers['updatePassword'] = async (_root, args, { token, user }) => {
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

export const createUserAccount: MutationResolvers['createUserAccount'] = async (_root, args, { token, user }) => {
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

export const deleteAccount: MutationResolvers['deleteAccount'] = async (_root, { accountId }, { token, user }) => {
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
