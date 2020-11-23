const db = require('../database');
const authHelpers = require('../utils/auth');

const resolvers = {
	Query: {
		accounts: async (root, args, { token }) => {
			authHelpers.authenticate(token);

			return db.accounts.findAll();
		},

		account: async (root, args) => {
			return db.accounts.findByPk(args.id);
		},

		// for verifying a live JWT when a user refreshes the page. Token passed in the headers
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
				attributes: ['account_id', 'password', 'first_name'],
				where: {
					email
				}
			});

			if (!user) {
				return { success: false };
			}

			const { account_id, first_name, password: encodedPassword } = user.dataValues;
			const isCorrect = await authHelpers.isValidPassword(password, encodedPassword);
			if (!isCorrect) {
				return { success: false };
			}

			const token = await authHelpers.getJwt({
				account_id,
				email
			});

			return {
				success: true,
				token,
				firstName: first_name
			};
		}
	}

	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};

module.exports = resolvers;
