import type { QueryResolvers } from './../../../types.generated';
import { sequelize } from '../../../../database';
import { QueryTypes } from 'sequelize';
import * as authUtils from '../../../../utils/authUtils';
import { db } from '../../../../database';

export const dataSetHistory: NonNullable<QueryResolvers['dataSetHistory']> = async (_parent, args, { token, user }) => {
  const { dataSetId, limit, offset } = args;

  authUtils.authenticate(token);

  // confirm dataSetId belongs to current user
  const exists = await db.dataSets.findOne({
    where: {
      accountId: user.accountId,
      dataSetId
    }
  });

  if (exists === null) {
    return {
      results: [],
      totalCount: 0
    };
  }

  const [results] = (await sequelize.query(`
    SELECT *
    FROM dataset_history dh
    WHERE dataset_id = ${dataSetId}
    ORDER BY history_id DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `)) as Array<any>;

  const [totalCountQuery] = (await sequelize.query(
    `
      SELECT count(*) as c
      FROM dataset_history
      WHERE dataset_id = ${dataSetId} 
    `,
    { raw: true, type: QueryTypes.SELECT }
  )) as any[];

  return {
    totalCount: (totalCountQuery[0] as any).c,
    results: results.map((row: any) => ({
      dataSetId: row.dataset_id,
      historyId: row.history_id,
      content: row.content,
      dateCreated: row.date_created
    }))
  };
};
