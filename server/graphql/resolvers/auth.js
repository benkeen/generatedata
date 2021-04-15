const { OAuth2Client } = require('google-auth-library');
const { nanoid } = require('nanoid');
const db = require('../../database');
const authUtils = require('../../utils/authUtils');
const emailUtils = require('../../utils/emailUtils');


const login = async (root, { email, password }, { res }) => {
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'password', 'firstName', 'lastName', 'country', 'region', 'dateCreated',
			'expiryDate', 'numRowsGenerated'
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

	const { token, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user, res);

	return {
		success: true,
		token,
		tokenExpiry,
		refreshToken,
		email,
		...user.dataValues
	};
};

const sendPasswordResetEmail = async (root, { email }, { res }) => {
	// see if the email exists
	const user = await db.accounts.findOne({
		attributes: ['accountId'],
		where: {
			email
		}
	});

	if (user) {
		// TODO check if valid or not. If it's expired, send a different email
		await emailUtils.sendEmail(email, 'Password reset', 'test here!');
	}

	// regardless of whether it was found or not, just return true. This prevents people being sneaky and finding out
	// if people have an account or not
	return { success: true };
};

const loginWithGoogle = async (root, { googleToken }) => {
	const client = new OAuth2Client(process.env.GD_GOOGLE_AUTH_CLIENT_ID);
	let email = '';
	let profileImage = '';

	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: googleToken,
			audience: process.env.GD_GOOGLE_AUTH_CLIENT_ID
		});
		const payload = ticket.getPayload();

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
		attributes: [
			'accountId', 'accountType', 'password', 'firstName', 'lastName', 'country', 'region', 'dateCreated',
			'expiryDate', 'numRowsGenerated'
		],
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

	const { accountId, accountType, firstName, lastName, expiryDate, dateCreated, numRowsGenerated } = user.dataValues;
	const token = await authUtils.getJwt({ accountId, email });

	return {
		success: true,
		token,
		firstName,
		lastName,
		email,
		accountType,
		expiryDate,
		dateCreated,
		numRowsGenerated,
		profileImage
	};
};

const checkAndUpdateRefreshToken = async (root, args, { token, req, res }) => {

	console.log("COOKIES: ", req.cookies);

	if (!req.cookies.refreshToken) {
		return { success: false };
	}

	const oldRefreshToken = req.cookies.refreshToken;
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'firstName', 'email', 'lastName', 'country', 'region', 'dateCreated',
			'expiryDate', 'numRowsGenerated'
		],
		where: {
			refreshToken: oldRefreshToken
		}
	});

	if (!user) {
		console.log('not found with token: ', req.cookies.refreshToken);
		return { success: false };
	} else {
		console.log("FOUND USER WITH refresh token. Still active?????");
	}

	const { accountId, email } = user.dataValues;
	const { token: newToken, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user, res);

	return {
		success: true,
		token: newToken,
		tokenExpiry,
		refreshToken,
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

const getNewTokens = async (accountId, email, user) => {
	const token = await authUtils.getJwt({ accountId, email });

	// store the refresh token in a cookie and stash in the db
	const refreshToken = nanoid();
	await user.update({ refreshToken: refreshToken });

	// ideally we'd set this cookie here on the server by passing back a Set-Cookie header. But due to the different
	// ports, that's a no go. Instead, this is passed back to the client which sets it in a cookie. That info is then
	// sent along with any subsequent requests to the server - including the all-important refreshToken request. This
	// info enables the front-end code to transparently extend the lifespan of the living token (`token`) just by making
	// requests
	const expiryMsFromNow = process.env.GD_JWT_LIFESPAN_MINS * 60 * 1000;
	const tokenExpiry = new Date().getTime() + expiryMsFromNow; // TODO hash this for sending to the client?

	return { token, tokenExpiry, refreshToken };
};

module.exports = {
	login,
	loginWithGoogle,
	sendPasswordResetEmail,
	checkAndUpdateRefreshToken,
	logout
};
