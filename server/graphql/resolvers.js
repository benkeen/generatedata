const db = require('../database');
const authUtils = require('../utils/authUtils');
const authResolvers = require('./resolvers/auth');
const accountResolvers = require('./resolvers/account');
const dataSetResolvers = require('./resolvers/dataSets');

const resolvers = {
	Query: {
		accounts: async (root, args, { token, user }) => {
			authUtils.authenticate(token);

			const { limit, offset } = args;
			const { accountId } = user;

			const [results] = await db.sequelize.query(`
				SELECT *
				FROM accounts
				WHERE created_by = ${accountId}
				ORDER BY last_name DESC
				LIMIT ${limit}
				OFFSET ${offset} 
			`);

			const [totalCountQuery] = await db.sequelize.query(`
				SELECT count(*) as c
				FROM accounts
				WHERE created_by = ${accountId} 
			`, { raw: true, type: db.sequelize.QueryTypes.SELECT });

			return {
				totalCount: totalCountQuery.c,
				results: results.map((row) => ({
					accountId: row.account_id,
					dateCreated: row.date_created,
					lastUpdated: row.last_updated,
					lastLoggedIn: row.last_logged_in,
					dateExpires: row.date_expires,
					accountType: row.account_type,
					accountStatus: row.account_status,
					firstName: row.first_name,
					lastName: row.last_name,
					email: row.email,
					country: row.country,
					region: row.region,
					numRowsGenerated: row.numRowsGenerated,
				}))
			};
		},

		account: async (root, args, { user, token }) => {
			authUtils.authenticate(token);
			return db.accounts.findByPk(user.accountId);
		},

		dataSets: async (root, args, { token, user }) => {
			const { limit, offset } = args;

			authUtils.authenticate(token);

			const { accountId } = user;
			const [results] = await db.sequelize.query(`
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
				ORDER BY dsh.date_created DESC
				LIMIT ${limit}
				OFFSET ${offset} 
			`);

			const [totalCountQuery] = await db.sequelize.query(`
				SELECT count(*) as c
				FROM datasets
				WHERE account_id = ${accountId} 
			`, { raw: true, type: db.sequelize.QueryTypes.SELECT });

			return {
				totalCount: totalCountQuery.c,
				results: results.map((row) => ({
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
		}
	},

	Mutation: {
		// authentication resolvers
		login: authResolvers.login,
		loginWithGoogle: authResolvers.loginWithGoogle,
		refreshToken: authResolvers.refreshToken,
		logout: authResolvers.logout,

		// account-related resolvers
		updateAccount: accountResolvers.updateAccount,
		updatePassword: accountResolvers.updatePassword,
		createUserAccount: accountResolvers.createUserAccount,
		saveNewDataSet: dataSetResolvers.saveNewDataSet,
		renameDataSet: dataSetResolvers.renameDataSet,
		saveDataSet: dataSetResolvers.saveDataSet,
		deleteDataSet: dataSetResolvers.deleteDataSet,
		updateDataSetGenerationCount: dataSetResolvers.updateDataSetGenerationCount
	}
};


module.exports = resolvers;
