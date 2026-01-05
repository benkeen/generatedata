import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const updateDataSetGenerationCount: NonNullable<MutationResolvers['updateDataSetGenerationCount']> = async (
  _parent,
  { dataSetId, generatedRows },
  { token, user }
) => {
  if (!authUtils.authenticate(token)) {
    return { success: false };
  }

  let addRows = generatedRows;
  if (/\D/.test(generatedRows.toString())) {
    addRows = 0;
  }

  const dataSet = await db.dataSets.findByPk(dataSetId);
  const { accountId, numRowsGenerated } = dataSet!.dataValues;

  if (user.accountId !== accountId) {
    return { success: false };
  }

  await dataSet!.update({
    numRowsGenerated: numRowsGenerated + addRows
  });

  return {
    success: true
  };
};
