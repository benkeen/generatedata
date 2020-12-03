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

const saveDataSet = async (root, { dataSetId, content }, { token, user }) => {
	authUtils.authenticate(token);

	// now check the user is able to access and change this data set
	let hasAccess = false;

	console.log(user);
};


module.exports = {
	saveNewDataSet,
	saveDataSet
};
