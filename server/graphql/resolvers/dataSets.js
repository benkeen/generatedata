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

	if (user.accountType === 'user') {
		const dataSet = db.dataSets.findByPk(dataSetId);
		console.log(dataSet);
		return;
	}

	const dateCreated = new Date().getTime();
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

const deleteDataSet = async (root, { dataSetId, content }, { token, user }) => {
	authUtils.authenticate(token);

	// TODO check access

	if (user.accountType === 'user') {
		console.log("TODO");
		return;
	}

	db.dataSets.destroy({ where: { dataSetId } });
	db.dataSetHistory.destroy({ where: { dataSetId } });

	return {
		success: true
	};
};

const updateDataSetGenerationCount = (root, { dataSetId, content }, { token, user }) => {
	authUtils.authenticate(token);


};

module.exports = {
	saveNewDataSet,
	saveDataSet,
	deleteDataSet,
	updateDataSetGenerationCount
};
