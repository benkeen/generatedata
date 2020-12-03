const db = require('../../database');
const authUtils = require('../../utils/authUtils');

const saveNewDataSet = async (root, { dataSetName, content }, { token, user }) => {
	authUtils.authenticate(token);

	const { accountId } = user;

	const dateCreated = new Date().getTime();
	const dataSet = await db.dataSets.create({
		dataSetName,
		status: 'private',
		dateCreated,
		accountId,
		numRowsGenerated: 0
	});

	const { dataSetId } = dataSet.dataValues;
	await db.dataSetHistory.create({
		dataSetId,
		dateCreated,
		content
	});

	return {
		success: true,
		dataSetId
	};
};

module.exports = {
	saveNewDataSet
};
