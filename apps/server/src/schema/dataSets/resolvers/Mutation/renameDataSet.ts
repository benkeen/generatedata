import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const renameDataSet: NonNullable<MutationResolvers['renameDataSet']> = async (
  _parent,
  { dataSetId, dataSetName },
  { token, user }
) => {
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

  await dataSet.update({ dataSetName });

  return {
    success: true
  };
};
