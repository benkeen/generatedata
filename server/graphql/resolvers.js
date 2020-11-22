const db = require('../database');
const authHelpers = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		accounts: async (root, args, { req }) => {
			console.log('trying to authenticate', req);

			authHelpers.authenticate(req);

			return db.accounts.findAll();
		},
		account: async (obj, args) => {
			return db.accounts.findByPk(args.id);
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
