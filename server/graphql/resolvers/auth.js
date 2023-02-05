const { OAuth2Client } = require('google-auth-library');
const { nanoid } = require('nanoid');
const db = require('../../database');
const authUtils = require('../../utils/authUtils');
const emailUtils = require('../../utils/emailUtils');
const langUtils = require('../../utils/langUtils');
const { passwordReset, passwordResetAccountExpired } = require('../../emails');

const getAccountNumRowsGenerated = async (accountId) => {
	const results = await db.dataSets.findAll({
		where: {
			accountId: accountId
		},
		attributes: [[db.sequelize.fn('sum', db.sequelize.col('num_rows_generated')), 'totalRowsGenerated']]
	});

	return results[0].dataValues.totalRowsGenerated || 0;
};

const login = async (root, { email, password }, { res }) => {
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'password', 'oneTimePassword', 'firstName', 'lastName', 'country', 'region',
			'dateCreated', 'expiryDate'
		],
		where: {
			email
		}
	});

	if (!user) {
		return { success: false };
	}

	const { accountId, password: encodedPassword, oneTimePassword, expiryDate } = user.dataValues;

	const accountExpired = authUtils.accountExpired(expiryDate);
	if (accountExpired) {
		await user.update({
			accountStatus: 'expired'
		});

		return {
			success: false,
			error: 'accountExpired'
		};
	}

	const isCorrect = await authUtils.isValidPassword(password, encodedPassword);

	let oneTimePasswordIsCorrect = false;
	if (oneTimePassword) {
		oneTimePasswordIsCorrect = await authUtils.isValidPassword(password, oneTimePassword);

		// note we don't reset the password here. It's needed on the request to update the password - there we DON'T
		// check the previous one (since it's not available). We only ever want to do that if there's a one-time password
		// still in the DB.
	}

	if (!isCorrect && !oneTimePasswordIsCorrect) {
		return { success: false };
	}

	const { token, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user, res);
	const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

	// we ignore async-ness here. No point slowing down the login just to track the last logged in date
	user.update({
		lastLoggedIn: new Date().getTime() / 1000
	});

	return {
		success: true,
		token,
		tokenExpiry,
		refreshToken,
		email,
		wasOneTimeLogin: oneTimePasswordIsCorrect,
		numRowsGenerated,
		...user.dataValues
	};
};

const sendPasswordResetEmail = async (root, { email }, { req }) => {
	const i18n = langUtils.getStrings(req.cookies.lang || 'en');

	const user = await db.accounts.findOne({
		attributes: ['accountId', 'firstName', 'expiryDate'],
		where: {
			email
		}
	});

	if (user) {
		// if the user's account has expired, let 'em know. Sodding ORM adds a degree of confusion but expiryDate is
		// actually a JS object
		const { firstName, expiryDate } = user.dataValues;

		const accountExpired = authUtils.accountExpired(expiryDate);
		if (accountExpired) {
			const { subject, text, html } = passwordResetAccountExpired({ firstName, i18n });
			await emailUtils.sendEmail(email, subject, text, html);
		} else {
			const tempPassword = nanoid(14);
			const tempPasswordHash = await authUtils.getPasswordHash(tempPassword);

			// set this temporary password in the DB
			await user.update({
				oneTimePassword: tempPasswordHash
			});

			const { subject, text, html } = passwordReset({ firstName, email, tempPassword, i18n });
			await emailUtils.sendEmail(email, subject, text, html);
		}
	}

	// regardless of whether it was found or not, just return true. This prevents people being sneaky and finding out
	// if people have an account or not
	return { success: true };
};

const loginWithGoogle = async (root, { googleToken }, { res }) => {
	const client = new OAuth2Client(process.env.GD_GOOGLE_AUTH_CLIENT_ID);
	let email = '';
	let profileImage = '';

	async function verify () {
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
			'expiryDate', 'country', 'region'
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

	const { accountId, accountType, firstName, lastName, country, region, expiryDate, dateCreated } = user.dataValues;
	const accountExpired = authUtils.accountExpired(expiryDate);

	if (accountExpired) {
		return {
			success: false,
			error: 'accountExpired'
		};
	}

	const { token, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user, res);
	const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

	return {
		success: true,
		token,
		tokenExpiry,
		refreshToken,
		firstName,
		lastName,
		email,
		country,
		region,
		accountType,
		expiryDate,
		dateCreated,
		numRowsGenerated,
		profileImage
	};
};

const checkAndUpdateRefreshToken = async (root, args, { token, req, res }) => {
	if (!req.cookies.refreshToken) {
		return { success: false };
	}

	const oldRefreshToken = req.cookies.refreshToken;
	const user = await db.accounts.findOne({
		attributes: [
			'accountId', 'accountType', 'firstName', 'email', 'lastName', 'country', 'region', 'dateCreated',
			'expiryDate'
		],
		where: {
			refreshToken: oldRefreshToken
		}
	});

	if (!user) {
		return { success: false };
	}

	const { accountId, email } = user.dataValues;
	const { token: newToken, tokenExpiry, refreshToken } = await getNewTokens(accountId, email, user, res);

	const numRowsGenerated = await getAccountNumRowsGenerated(accountId);

	return {
		success: true,
		token: newToken,
		tokenExpiry,
		refreshToken,
		numRowsGenerated,
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

	if (user) {
		user.update({
			refreshToken: null,
			oneTimePassword: null
		});
	}

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
	const tokenExpiry = new Date().getTime() + expiryMsFromNow;

	return { token, tokenExpiry, refreshToken };
};

module.exports = {
	login,
	loginWithGoogle,
	sendPasswordResetEmail,
	checkAndUpdateRefreshToken,
	logout,
	getAccountNumRowsGenerated
};
