import type { QueryResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const account: NonNullable<QueryResolvers['account']> = async (_parent, _arg, { token, user }) => {
  if (!authUtils.authenticate(token)) {
    return null;
  }

  const userRecord = await db.accounts.findByPk(user.accountId, { plain: true });
  if (!userRecord || userRecord.dataValues.accountType !== 'superuser') {
    return null;
  }

  return userRecord.dataValues;
};
