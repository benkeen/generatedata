const db = require('../database');
const authHelpers = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		accounts: async (root, args, { token }) => {
			console.log('trying to authenticate', token);

			authHelpers.authenticate(token);

			return db.accounts.findAll();
		},

		account: async (root, args) => {
			return db.accounts.findByPk(args.id);
		},

		// for verifying a live JWT, found in the headers
		verifyToken: async(root, args, { token }) => {
			const valid = await authHelpers.authenticate(token);
			return {
				valid
			};
		}
	},

	Mutation: {
		login: async (root, { email, password }) => {
			const user = await db.accounts.findOne({
				attributes: ['account_id', 'password'],
				where: {
					email
				}
			});

			if (!user) {
				throw new AuthenticationError('Unable to login');
				return null;
			}

			const { account_id, password: encodedPassword } = user.dataValues;
			const isCorrect = await authHelpers.isValidPassword(password, encodedPassword);
			if (!isCorrect) {
				throw new AuthenticationError('Unable to login');
				return null;
			}

			const token = await authHelpers.getJwt({
				account_id,
				email
			});

			return {
				// account_id,
				// email,
				token
			};
		}
	}

	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};

module.exports = resolvers;
