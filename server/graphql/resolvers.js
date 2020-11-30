const db = require('../database');
const authUtils = require('../utils/authUtils');
const authResolvers = require('./resolvers/auth');
const accountResolvers = require('./resolvers/account');

const resolvers = {
	Query: {
		accounts: async (root, args, { token }) => {
			authUtils.authenticate(token);
			return db.accounts.findAll();
		},

		account: async (root, args, { user, token }) => {
			authUtils.authenticate(token);
			return db.accounts.findByPk(user.accountId);
		},

		configurations: async (root, args) => {
			authUtils.authenticate(token);
			return db.configurations.findByPk(args.accountId);
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
		updatePassword: accountResolvers.updatePassword
	}
};

module.exports = resolvers;
