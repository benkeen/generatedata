require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');

const processDataTypes = () => {
	const data = helpers.getDataTypes().map((i) => ({
		name: i.name,
		folder: i.folder,
		fieldGroup: i.fieldGroup,
		fieldGroupOrder: i.fieldGroupOrder,
		processOrder: i.processOrder
	}));

	helpers.createBuildFile('dataTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
};

const processExportTypes = () => {
	const data = helpers.getExportTypes().map((i) => ({
		name: i.name,
		folder: i.folder
	}));

	helpers.createBuildFile('exportTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
};

processDataTypes();
processExportTypes();
