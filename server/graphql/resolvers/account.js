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

	const { password } = args;
	userRecord.update({ password });

	return {
		success: true
	};
};

module.exports = {
	updateAccount,
	updatePassword
};
