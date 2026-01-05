import type { QueryResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const account: NonNullable<QueryResolvers['account']> = async (_parent, _arg, { token, user }) => {
  authUtils.authenticate(token);

  const userRecord = await db.accounts.findByPk(user.accountId, { plain: true });
  if (!userRecord || userRecord.dataValues.accountType !== 'superuser') {
    return null;
  }

  return userRecord.dataValues;
};
