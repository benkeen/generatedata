/**
 * This script generates a ./build/dataTypes.js file containing all the FE UI code for the Data Types. Localization
 * bundles are created separately.
 */
require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');

const processDataTypes = () => {
	const data = helpers.getDataTypes().map((i) => ({
		name: i.name,
		fieldGroup: i.fieldGroup,
		fieldGroupOrder: i.fieldGroupOrder
	}));
	helpers.createBuildFile('dataTypes.js', `export default ${JSON.stringify(data, null, '\t')}`);
};


processDataTypes();
