import { db, sequelize } from '../../database';

export const getAccountNumRowsGenerated = async (accountId: number) => {
  const results = await db.dataSets.findAll({
    where: {
      accountId: accountId
    },
    attributes: [[sequelize.fn('sum', sequelize.col('num_rows_generated')), 'totalRowsGenerated']]
  });

  return results[0].dataValues.totalRowsGenerated || 0;
};
