import type { QueryResolvers } from '@generatedata/graphql-schema';
import * as authUtils from '../../utils/authUtils';
import { db, sequelize } from '../../database';
import { QueryTypes } from 'sequelize';

export const dataSets: QueryResolvers['dataSets'] = async (_root, args, { token, user }) => {
  const { limit, offset, sortDir, sortCol } = args;

  authUtils.authenticate(token);

  const sortColMap = {
    dataSetName: 'd.dataset_name',
    lastUpdated: 'dsh.date_created',
    numRowsGenerated: 'numRowsGenerated'
  };

  const { accountId } = user;
  const orderByCol =
    sortCol && sortColMap[sortCol as keyof typeof sortColMap] ? sortColMap[sortCol as keyof typeof sortColMap] : 'dsh.date_created';

  const [results] = (await sequelize.query(`
    SELECT d.dataset_name,
        d.dataset_id AS dataSetId,
        d.num_rows_generated as numRowsGenerated,
        dsh.*,
      unix_timestamp(d.date_created) AS dateCreatedUnix,
      unix_timestamp(dsh.date_created) AS historyDateCreatedUnix
    FROM datasets d
    LEFT JOIN dataset_history dsh ON dsh.dataset_id = d.dataset_id
      AND dsh.history_id =
        (SELECT history_id
          FROM dataset_history dsh2
          WHERE dsh2.dataset_id = d.dataset_id
          ORDER BY history_id DESC
          LIMIT 1)
    WHERE account_id = ${accountId}
    ORDER BY ${orderByCol} ${sortDir || 'ASC'}
    LIMIT ${limit}
    OFFSET ${offset}
  `)) as Array<any>;

  const [totalCountQuery] = (await sequelize.query(
    `
				SELECT count(*) as c
				FROM datasets
				WHERE account_id = ${accountId} 
			`,
    { raw: true, type: QueryTypes.SELECT }
  )) as any[];

  return {
    totalCount: (totalCountQuery[0] as any).c,
    results: results.map((row: any) => ({
      dataSetId: row.dataSetId,
      status: row.status,
      numRowsGenerated: row.numRowsGenerated,
      historyId: row.history_id,
      dataSetName: row.dataset_name,
      content: row.content,
      dataCreatedUnix: row.dateCreatedUnix,
      historyDateCreatedUnix: row.historyDateCreatedUnix
    }))
  };
};

export const dataSetHistory: QueryResolvers['dataSetHistory'] = async (_root, args, { token, user }) => {
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
