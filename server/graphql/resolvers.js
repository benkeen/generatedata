const db = require('../database');
const authUtils = require('../utils/authUtils');
const authResolvers = require('./resolvers/auth');
const accountResolvers = require('./resolvers/account');
const dataSetResolvers = require('./resolvers/dataSets');

const resolvers = {
	Query: {
		accounts: async (root, args, { token, user }) => {
			authUtils.authenticate(token);

			const userRecord = await db.accounts.findByPk(user.accountId);
			if (userRecord.dataValues.accountType !== 'superuser') {
				return {
					success: false,
					errorStatus: 'PermissionDenied'
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
				const cleanFilter = filterStr
					.replace(/[^a-zA-Z'\s]/g, '')
					.replace(/'/, '\\\'');
				const clauses = fields.map(
					(field) => `${field} LIKE '%${cleanFilter}%'`
				);
				filterClause = `AND (${clauses.join(' OR ')})`;
			}

			let statusClause = '';
			if (status !== 'all') {
				const cleanStatus = status.replace(/[^a-zA-Z'\s]/g, '');
				statusClause = `AND account_status = '${cleanStatus}'`;
			}

			const [results] = await db.sequelize.query(`
				SELECT *
				FROM accounts
				WHERE created_by = ${accountId} ${filterClause} ${statusClause}
				ORDER BY ${sortColMap[sortCol]} ${sortDir}
				LIMIT ${limit}
				OFFSET ${offset} 
			`);

			const [totalCountQuery] = await db.sequelize.query(
				`
				SELECT count(*) as c
				FROM accounts
				WHERE created_by = ${accountId} ${filterClause} ${statusClause}
			`,
				{ raw: true, type: db.sequelize.QueryTypes.SELECT }
			);

			const updatedResults = results.map(async (row) => {
				const accountId = row.account_id;

				// not great, but info is needed. May be a better idea to denormalize the DB and store this on the
				// account row
				const numRowsGenerated =
					await authResolvers.getAccountNumRowsGenerated(accountId);
				let accountStatus = row.account_status;

				// update any accounts that have an expiry date set and are now expired
				if (
					row.date_expires &&
					row.account_status !== 'expired' &&
					row.account_status !== 'disabled'
				) {
					const accountExpired = authUtils.accountExpired(
						new Date(row.date_expires)
					);
					if (accountExpired) {
						await db.sequelize.query(
							`
							UPDATE accounts
							SET account_status = 'expired'
							WHERE account_id = ${accountId}
						`,
							{ raw: true, type: db.sequelize.QueryTypes.UPDATE }
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
				totalCount: totalCountQuery.c,
				results: updatedResults
			};
		},

		// retrieves any account info
		account: async (root, args, { user, token }) => {
			authUtils.authenticate(token);

			const userRecord = await db.accounts.findByPk(user.accountId);
			if (userRecord.dataValues.accountType !== 'superuser') {
				return {
					success: false,
					errorStatus: 'PermissionDenied'
				};
			}

			return db.accounts.findByPk(user.accountId);
		},

		// returns current user's data sets
		dataSets: async (root, args, { token, user }) => {
			const { limit, offset, sortDir, sortCol } = args;

			authUtils.authenticate(token);

			const sortColMap = {
				dataSetName: 'd.dataset_name',
				lastUpdated: 'dsh.date_created',
				numRowsGenerated: 'numRowsGenerated'
			};

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
				ORDER BY ${sortColMap[sortCol]} ${sortDir}
				LIMIT ${limit}
				OFFSET ${offset}
			`);

			const [totalCountQuery] = await db.sequelize.query(
				`
				SELECT count(*) as c
				FROM datasets
				WHERE account_id = ${accountId} 
			`,
				{ raw: true, type: db.sequelize.QueryTypes.SELECT }
			);

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
		},

		dataSetHistory: async (root, args, { token, user }) => {
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
					success: false,
					errorStatus: 'PermissionDenied'
				};
			}

			const [results] = await db.sequelize.query(`
				SELECT *
				FROM dataset_history dh
				WHERE dataset_id = ${dataSetId}
				ORDER BY history_id DESC
				LIMIT ${limit}
				OFFSET ${offset}
			`);

			const [totalCountQuery] = await db.sequelize.query(
				`
				SELECT count(*) as c
				FROM dataset_history
				WHERE dataset_id = ${dataSetId} 
			`,
				{ raw: true, type: db.sequelize.QueryTypes.SELECT }
			);

			return {
				totalCount: totalCountQuery.c,
				results: results.map((row) => ({
					dataSetId: row.dataset_id,
					historyId: row.history_id,
					content: row.content,
					dateCreated: row.date_created
				}))
			};
		}
	},

	Mutation: {
		// authentication resolvers
		login: authResolvers.login,
		loginWithGoogle: authResolvers.loginWithGoogle,
		sendPasswordResetEmail: authResolvers.sendPasswordResetEmail,
		refreshToken: authResolvers.checkAndUpdateRefreshToken,
		logout: authResolvers.logout,

		// account-related resolvers
		updateAccount: accountResolvers.updateAccount,
		updateCurrentAccount: accountResolvers.updateCurrentAccount,
		updatePassword: accountResolvers.updatePassword,
		createUserAccount: accountResolvers.createUserAccount,
		deleteAccount: accountResolvers.deleteAccount,

		// data-sets
		saveNewDataSet: dataSetResolvers.saveNewDataSet,
		renameDataSet: dataSetResolvers.renameDataSet,
		saveDataSet: dataSetResolvers.saveDataSet,
		deleteDataSet: dataSetResolvers.deleteDataSet,
		updateDataSetGenerationCount: dataSetResolvers.updateDataSetGenerationCount
	}
};

module.exports = resolvers;
