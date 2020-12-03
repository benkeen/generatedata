const { OAuth2Client } = require('google-auth-library');
const { nanoid } = require('nanoid');
const db = require('../../database');
const authUtils = require('../../utils/authUtils');


const login = async (root, { email, password }, { res }) => {
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'password', 'firstName', 'lastName', 'country', 'region', 'dateCreated',
			'dateExpires', 'numRowsGenerated'
		],
		where: {
			email
		}
	});

	if (!user) {
		return { success: false };
	}

	const { accountId, password: encodedPassword } = user.dataValues;
	const isCorrect = await authUtils.isValidPassword(password, encodedPassword);
	if (!isCorrect) {
		return { success: false };
	}

	const { token, tokenExpiry } = await getNewTokenAndSetRefreshTokenCookie(accountId, email, user, res);

	return {
		success: true,
		token,
		tokenExpiry,
		email,
		...user.dataValues
	};
};


const loginWithGoogle = async (root, { googleToken }) => {
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
		attributes: ['accountId', 'password', 'firstName'],
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

	const { accountId } = user.dataValues;
	const token = await authUtils.getJwt({ accountId, email });

	return {
		success: true,
		token,
		firstName,
		profileImage
	};
};

const refreshToken = async (root, args, { token, req, res }) => {
	if (!req.cookies.refreshToken) {
		console.log('no refresh token! unable to refresh');
		return { success: false };
	}

	const refreshToken = req.cookies.refreshToken;
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'firstName', 'email', 'lastName', 'country', 'region', 'dateCreated',
			'dateExpires', 'numRowsGenerated'
		],
		where: {
			refreshToken
		}
	});

	if (!user) {
		console.log('not found with token: ', req.cookies.refreshToken);
		return { success: false };
	}

	const { accountId, email } = user.dataValues;
	const { token: newToken, tokenExpiry } = await getNewTokenAndSetRefreshTokenCookie(accountId, email, user, res);

	return {
		success: true,
		token: newToken,
		tokenExpiry,
		...user.dataValues
	};
};

const logout = async (root, args, { req }) => {
	if (!req.cookies.refreshToken) {
		return { success: true };
	}

	const refreshToken = req.cookies.refreshToken;
	const user = await db.accounts.findOne({
		attributes: ['accountId'],
		where: {
			refreshToken
		}
	});

	user.update({ refreshToken: null });

	return { success: true };
};

const getNewTokenAndSetRefreshTokenCookie = async (accountId, email, user, res) => {
	const token = await authUtils.getJwt({ accountId, email });

	// store the refresh token in a cookie and stash in the db
	const refreshToken = nanoid();
	await user.update({ refreshToken: refreshToken });

	// now set it in a cookie. This info cannot be accessed by any running JS in the page (thanks to httpOnly),
	// but it'll be automatically passed along with any subsequent requests to the server - including the
	// all-important refreshToken refresh. This info enables the front-end code to automatically extend the
	// lifespan of the living token (`token`)
	const tokenExpiry = process.env.GD_JWT_LIFESPAN_MINS * 60 * 1000; // milliseconds

	res.cookie("refreshToken", refreshToken, { // TODO hash this for sending to the client
		secure: false, // TODO
		httpOnly: true,
		maxAge: tokenExpiry,
		domain: 'localhost' // TODO
	});

	return { token, tokenExpiry };
};

module.exports = {
	login,
	loginWithGoogle,
	refreshToken,
	logout
};
