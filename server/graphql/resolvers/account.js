const db = require('../../database');
const authUtils = require('../../utils/authUtils');

const updateAccount = async (root, args, { token, user }) => {
	authUtils.authenticate(token);

	const { accountId } = user;
	const userRecord = await db.accounts.findByPk(accountId);

	const { firstName, lastName, email, country, region } = args;
	userRecord.update({
		firstName,
		lastName,
		email,
		country,
		region
	});

	return {
		success: true
	};
};

const updatePassword = async (root, args, { token, user }) => {
	authUtils.authenticate(token);

	const { accountId } = user;
	const userRecord = await db.accounts.findByPk(accountId);

	const { currentPassword, newPassword } = args;
	const isCorrect = await authUtils.isValidPassword(currentPassword, userRecord.dataValues.password);

	if (!isCorrect) {
		return {
			success: false,
			error: 'PASSWORD_INCORRECT'
		};
	}

	const newPasswordHash = await authUtils.getPasswordHash(newPassword);

	userRecord.update({
		password: newPasswordHash
	});

	return {
		success: true
	};
};

const createUserAccount = async (root, args, { token, user }) => {

	// TODO verify is admin
	authUtils.authenticate(token);

	const { accountId } = user;
	const dateCreated = new Date().getTime();
	const { firstName, lastName, email, country, region, accountStatus, dateExpires } = args;

	const account = await db.accounts.create({
		createdBy: accountId,
		accountType: 'user',
		accountStatus,
		dateCreated,
		lastUpdated: dateCreated,
		dateExpires,
		password: '', // blank password
		firstName,
		lastName,
		email,
		country,
		region,
		numRowsGenerated: 0
	});

	return {
		success: true
	};
};

const deleteAccount = async (root, { accountId, content }, { token, user }) => {
	authUtils.authenticate(token);

	// TODO improve security here
	if (user.accountType === 'user') {
		return;
	}

	db.accounts.destroy({ where: { accountId } });

	return {
		success: true
	};
};


module.exports = {
	updateAccount,
	updatePassword,
	createUserAccount,
	deleteAccount
};
