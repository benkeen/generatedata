import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const saveDataSet: NonNullable<MutationResolvers['saveDataSet']> = async (_parent, { dataSetId, content }, { token, user }) => {
  if (!authUtils.authenticate(token)) {
    return {
      success: false
    };
  }

  const dataSet = await db.dataSets.findByPk(dataSetId);
  if (!dataSet || dataSet.dataValues.accountId !== user.accountId) {
    return {
      success: false
    };
  }

  const dateCreated = new Date().getTime();
  await db.dataSetHistory.create({
    dataSetId,
    dateCreated,
    content
  });

  return {
    success: true,
    dataSetId,
    savedDate: String(dateCreated)
  };
};
