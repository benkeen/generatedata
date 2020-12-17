const db = require('../database');
const authUtils = require('../utils/authUtils');
const authResolvers = require('./resolvers/auth');
const accountResolvers = require('./resolvers/account');
const dataSetResolvers = require('./resolvers/dataSets');

const resolvers = {
	Query: {
		accounts: async (root, args, { token, user }) => {
			authUtils.authenticate(token);
			return db.accounts.findAll({
				where: {
					createdBy: user.accountId
				},
				order: [
					['dateCreated', 'DESC']
				]
			});
		},

		account: async (root, args, { user, token }) => {
			authUtils.authenticate(token);
			return db.accounts.findByPk(user.accountId);
		},

		dataSets: async (root, args, { token, user }) => {
			authUtils.authenticate(token);

			const { accountId } = user;

			const [results] = await db.sequelize.query(`
				SELECT d.dataset_name,
				    d.dataset_id AS dataSetId,
				    d.num_rows_generated as numRowsGenerated,
				    dsh.*,
					unix_timestamp(d.date_created) AS dateCreatedUnix,
					unix_timestamp(dsh.date_created) AS historyDateCreated
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
			`);

			return results.map((row) => ({
				dataSetId: row.dataSetId,
				status: row.status,
				dateCreated: row.date_created,
				numRowsGenerated: row.numRowsGenerated,
				historyId: row.history_id,
				dataSetName: row.dataset_name,
				content: row.content,
				dataCreatedUnix: row.dateCreatedUnix,
				historyDateCreated: row.historyDateCreated
			}));
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
		saveNewDataSet: dataSetResolvers.saveNewDataSet,
		saveDataSet: dataSetResolvers.saveDataSet,
		deleteDataSet: dataSetResolvers.deleteDataSet,
		updateDataSetGenerationCount: dataSetResolvers.updateDataSetGenerationCount
	}
};


module.exports = resolvers;
