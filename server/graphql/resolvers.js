const db = require('../database');
const authUtils = require('../utils/authUtils');
const { OAuth2Client } = require('google-auth-library');
const { nanoid } = require('nanoid');

const resolvers = {
	Query: {
		accounts: async (root, args, { token }) => {
			authUtils.authenticate(token);

			return db.accounts.findAll();
		},

		account: async (root, args) => {
			return db.accounts.findByPk(args.id);
		},

		configurations: async (root, args) => {
			return db.configurations.findByPk(args.account_id);
		}
	},

	Mutation: {
		login: async (root, { email, password }, { res }) => {
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

			// store the refresh token in a cookie and stash in the db
			const refreshToken = nanoid();
			await user.update({ refresh_token: refreshToken });

			// now set it in a cookie. This info cannot be accessed by any running JS in the page (thanks to httpOnly),
			// but it'll be automatically passed along with any subsequent requests to the server - including the
			// all-important refreshToken refresh. This info enables the front-end code to automatically extend the
			// lifespan of the living token (`token`)
			// res.header('Access-Control-Allow-Credentials', 'true');
			// res.header('access-control-expose-headers', 'Set-Cookie');

			// res.header('Access-Control-Allow-Credentials', true);
			// res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
			// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
			// res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
			res.cookie("refresh-token", refreshToken, { // TODO hash this?
				secure: false, // TODO
				httpOnly: true,
				maxAge: process.env.GD_JWT_REFRESH_TOKEN_LIFESPAN_MINS * 60 * 1000,
				domain: '127.0.0.1'
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
		},

		refreshToken: async(root, args, { token, req }) => {
			// const valid = await authUtils.authenticate(token);

			console.log("in refresh token.");
			console.log(req, args);

			// const user = await db.accounts.findOne({
			// 	attributes: ['account_id', 'password', 'first_name'],
			// 	where: {
			// 		refresh_token
			// 	}
			// });

			return {
				success: false
			};
		}

	}
};


module.exports = resolvers;
