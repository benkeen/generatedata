/**
 * This script generates a ./build/plugins.js file containing all the FE UI code for all plugins.
 *
 * export const dataTypeFolders = ['Alphanumeric', 'Boolean', ...];
 * export const dataTypeI18nFiles = [
 *
 * ];
 *
 {
		"name": "Boolean",
		"fieldGroup": "numeric",
		"fieldGroupOrder": 11
	},

 */
require = require('esm')(module); // allows us to read es6 files
const helpers = require('./helpers');

const processDataTypes = () => {
	const data = helpers.getDataTypes().map((i) => ({
		name: i.name,
		folder: i.folder,
		fieldGroup: i.fieldGroup,
		fieldGroupOrder: i.fieldGroupOrder
	}));
	helpers.createBuildFile('dataTypes.js', `export default ${JSON.stringify(data, null, '\t')};`);
};

processDataTypes();
