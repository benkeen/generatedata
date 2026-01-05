import type { MutationResolvers } from './../../../types.generated';
import { db } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';

export const saveNewDataSet: NonNullable<MutationResolvers['saveNewDataSet']> = async (
  _parent,
  { dataSetName, content },
  { token, user }
) => {
  authUtils.authenticate(token);

  const { accountId } = user;

  const dateCreated = new Date().getTime();
  const dataSet = await db.dataSets.create({
    dataSetName,
    status: 'private',
    dateCreated,
    accountId,
    numRowsGenerated: 0
  });

  const { dataSetId } = dataSet.dataValues;
  await db.dataSetHistory.create({
    dataSetId,
    dateCreated,
    content
  });

  return {
    success: true,
    dataSetId: String(dataSetId),
    savedDate: String(dateCreated)
  };
};
