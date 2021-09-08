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
		dataSetId,
		savedDate: dateCreated
	};
};

const renameDataSet = async (root, { dataSetId, dataSetName }, { token }) => {
	authUtils.authenticate(token);

	// TODO security. Check user can update this data set

	const dataSet = await db.dataSets.findByPk(dataSetId);

	await dataSet.update({ dataSetName });

	return {
		success: true
	};
};

const saveDataSet = async (root, { dataSetId, content }, { token, user }) => {
	authUtils.authenticate(token);

	// now check the user is able to access and change this data set
	let hasAccess = false;

	if (user.accountType === 'user') {
		const dataSet = db.dataSets.findByPk(dataSetId);
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
		dataSetId,
		savedDate: dateCreated
	};
};

const deleteDataSet = async (root, { dataSetId, content }, { token, user }) => {
	if (!authUtils.authenticate(token)) {
		return { success: false };
	}

	// TODO check access

	if (user.accountType === 'user') {
		return;
	}

	db.dataSets.destroy({ where: { dataSetId } });
	db.dataSetHistory.destroy({ where: { dataSetId } });

	return {
		success: true
	};
};

const updateDataSetGenerationCount = async (root, { dataSetId, generatedRows }, { token, user }) => {
	if (!authUtils.authenticate(token)) {
		return { success: false };
	}

	let addRows = generatedRows;
	if (/\D/.test(generatedRows)) {
		addRows = 0;
	}

	const dataSet = await db.dataSets.findByPk(dataSetId);
	const { accountId, numRowsGenerated } = dataSet.dataValues;

	if (user.accountId !== accountId) {
		return { success: false };
	}

	await dataSet.update({
		numRowsGenerated: numRowsGenerated + addRows
	});

	return {
		success: true
	};
};


module.exports = {
	saveNewDataSet,
	saveDataSet,
	renameDataSet,
	deleteDataSet,
	updateDataSetGenerationCount
};
