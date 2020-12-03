const db = require('../../database');
const authUtils = require('../../utils/authUtils');

// creates a totally new data set
const saveNewDataSet = async (root, { email, password }, { token, user }) => {
	authUtils.authenticate(token);

	const { accountId } = user;

	const dataSet = await db.dataSets.create({
		status: 'private',
		dateCreated: new Date().getTime(),
		accountId,
		numRowsGenerated: 0
	});

	const { dataSetId } = dataSet.dataValues;

	return {
		success: true,
		dataSetId
	};
};

module.exports = {
	saveNewDataSet
};
