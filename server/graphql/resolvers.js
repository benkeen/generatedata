const db = require('../database');
// const jwt = require('jsonwebtoken');
const authUtils = require('../utils/authUtils');
// const stringUtils = require('../utils/stringUtils');
const { OAuth2Client } = require('google-auth-library');


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
			const isCorrect = await authUtils.isValidPassword(password, encodedPassword);
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
		},

		loginWithGoogle: async (root, { googleToken }) => {
			const client = new OAuth2Client(process.env.GD_GOOGLE_AUTH_CLIENT_ID);
			let firstName = '';

			async function verify() {
				const ticket = await client.verifyIdToken({
					idToken: googleToken,
					audience: process.env.GD_GOOGLE_AUTH_CLIENT_ID
				});
				const payload = ticket.getPayload();

				// console.log("-->", payload);
			}

			try {
				await verify();
			} catch (e) {
				return {
					success: false
				};
			}

			// here the authentication has passed. Now verify the account exists

			console.log("auth passes. Now to verify.");

			// --------------------------------------------------------------------

			// TODO I'd rather use jsonwebtoken for this since it's already included. I just couldn't get it working. Code below.
			// const { header, payload } = authUtils.decodeToken(googleToken);
			// const cleanSecret = stringUtils.trim(process.env.GD_GOOGLE_AUTH_CLIENT_SECRET);
			//
			// console.log(header, payload);
			//
			// try {
			// 	await jwt.verify(googleToken, cleanSecret, {
			// 		algorithms: header.alg,
			// 		audience: process.env.GD_GOOGLE_AUTH_CLIENT_ID,
			// 		// exp: payload.exp,
			// 		issuer: payload.iss
			// 	});
			// } catch (e) {
			// 	console.log('not valid!!!!!', e);
			// 	return { success: false };
			// }
			//
			// // great, the google token is valid. Now let's see if they're registered
			// console.log("VALID!!!");
			//
			// return {
			// 	success: true
			// };
		}
	}
	// Ticket: {
	// 	user: async (obj, args, context, info) => db.users.findByPk(obj.user_id)
	// },
};


module.exports = resolvers;
