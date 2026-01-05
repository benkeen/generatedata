import type { QueryResolvers } from './../../../types.generated';
import { QueryTypes } from 'sequelize';
import { db, sequelize } from '../../../../database';
import * as authUtils from '../../../../utils/authUtils';
import { getAccountNumRowsGenerated } from '../../helpers';

export const accounts: NonNullable<QueryResolvers['accounts']> = async (_parent, args, { token, user }) => {
  authUtils.authenticate(token);

  const userRecord = await db.accounts.findByPk(user.accountId);
  if (!userRecord || userRecord.dataValues.accountType !== 'superuser') {
    return {
      results: [],
      totalCount: 0,
      errorStatus: 'permissionDenied'
    };
  }

  const { limit, offset, sortCol, sortDir, filterStr, status } = args;
  const { accountId } = user;

  const sortColMap = {
    lastName: 'last_name',
    firstName: 'first_name',
    accountStatus: 'account_status',
    expiryDate: 'date_expires',
    lastLoggedIn: 'last_logged_in'
  };

  let filterClause = '';
  if (filterStr) {
    const fields = ['first_name', 'last_name', 'email'];
    const cleanFilter = filterStr.replace(/[^a-zA-Z'\s\.@]/g, '').replace(/'/, "\\'");
    const clauses = fields.map((field) => `${field} LIKE '%${cleanFilter}%'`);
    filterClause = `AND (${clauses.join(' OR ')})`;
  }

  let statusClause = '';
  if (status && status !== 'all') {
    const cleanStatus = status.replace(/[^a-zA-Z'\s]/g, '');
    statusClause = `AND account_status = '${cleanStatus}'`;
  }

  const orderByCol =
    sortCol && sortColMap[sortCol as keyof typeof sortColMap] ? sortColMap[sortCol as keyof typeof sortColMap] : 'last_name';

  const [results] = (await sequelize.query(`
    SELECT *
    FROM accounts
    WHERE created_by = ${accountId} ${filterClause} ${statusClause}
    ORDER BY ${orderByCol} ${sortDir || 'ASC'}
    LIMIT ${limit}
    OFFSET ${offset} 
  `)) as Array<any>;

  const [totalCountQuery] = (await sequelize.query(
    `
     SELECT count(*) as c
     FROM accounts
        WHERE created_by = ${accountId} ${filterClause} ${statusClause}
        `,
    { raw: true, type: QueryTypes.SELECT }
  )) as any[];

  const updatedResults = results.map(async (row: any) => {
    const accountId = row.account_id;

    // not great, but info is needed. May be a better idea to denormalize the DB and store this on the
    // account row
    const numRowsGenerated = await getAccountNumRowsGenerated(accountId);
    let accountStatus = row.account_status;

    // update any accounts that have an expiry date set and are now expired
    if (row.date_expires && row.account_status !== 'expired' && row.account_status !== 'disabled') {
      const accountExpired = authUtils.accountExpired(new Date(row.date_expires));
      if (accountExpired) {
        await sequelize.query(
          `
            UPDATE accounts
            SET account_status = 'expired'
            WHERE account_id = ${accountId}
          `,
          { raw: true, type: QueryTypes.UPDATE }
        );

        accountStatus = 'expired';
      }
    }

    return {
      accountId,
      dateCreated: row.date_created,
      lastUpdated: row.last_updated,
      lastLoggedIn: row.last_logged_in,
      expiryDate: row.date_expires,
      accountType: row.account_type,
      accountStatus,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      country: row.country,
      region: row.region,
      numRowsGenerated
    };
  });

  return {
    totalCount: (totalCountQuery[0] as any).c,
    results: updatedResults
  };
};
