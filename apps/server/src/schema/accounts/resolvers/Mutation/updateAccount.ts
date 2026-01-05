import type { MutationResolvers, AccountStatus } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';
import * as dateFns from 'date-fns';

export const updateAccount: NonNullable<MutationResolvers['updateAccount']> = async (_parent, args, { token, user }) => {
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
