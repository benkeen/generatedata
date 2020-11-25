const db = require('../database');
const authUtils = require('../utils/authUtils');
const { OAuth2Client } = require('google-auth-library');

const resolvers = {
	Query: {
		accounts: async (root, args, { token }) => {
			authUtils.authenticate(token);

			return db.accounts.findAll();
		},

		account: async (root, args) => {
			return db.accounts.findByPk(args.id);
		},

		// for verifying a live JWT when a user refreshes the page. Token passed in the headers
		verifyToken: async(root, args, { token }) => {
			const valid = await authUtils.authenticate(token);
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
			const isCorrect = await authUtils.isValidPassword(password, encodedPassword);
			if (!isCorrect) {
				return { success: false };
			}

			const token = await authUtils.getJwt({ account_id, email });

			return {
				success: true,
				token,
				firstName: first_name
			};
		},

		loginWithGoogle: async (root, { googleToken }) => {
			const client = new OAuth2Client(process.env.GD_GOOGLE_AUTH_CLIENT_ID);
			let firstName = '';
			let email = '';
			let profileImage = '';

			async function verify() {
				const ticket = await client.verifyIdToken({
					idToken: googleToken,
					audience: process.env.GD_GOOGLE_AUTH_CLIENT_ID
				});
				const payload = ticket.getPayload();

				firstName = payload.given_name;
				email = payload.email;
				profileImage = payload.picture;
			}

			try {
				await verify();
			} catch (e) {
				return {
					success: false
				};
			}

			// here the authentication has passed. Now verify the account exists
			const user = await db.accounts.findOne({
				attributes: ['account_id', 'password', 'first_name'],
				where: {
					email
				}
			});

			if (!user) {
				return {
					success: false,
					error: 'noUserAccount'
				};
			}

			const { account_id } = user.dataValues;
			const token = await authUtils.getJwt({ account_id, email });

			return {
				success: true,
				token,
				firstName,
				profileImage
			};
		}
	}
};


module.exports = resolvers;
