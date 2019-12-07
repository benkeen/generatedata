/**
 * This script:
 * - generates a ./build/dataTypes.js file containing all the FE UI code for the Data Types
 */
require = require('esm')(module); // allows us to read es6 files
const fs = require('fs');
const helpers = require('./helpers');

// parses the data type folder and finds
const findDataTypeConfigFiles = () => {
	const baseFolder = './src/plugins/dataTypes'; // note this has to be run from the root. add a -cwd option

	const folders = fs.readdirSync(baseFolder);
	const dataTypeInfo = [];
	folders.forEach((folder) => {
		const configFile = `${baseFolder}/${folder}/${folder}.config.json`;
		if (!fs.existsSync(configFile)) {
			return;
		}

		// TODO error handling here. Validate data too
		try {
			const { name, fieldGroup, fieldGroupOrder } = JSON.parse(fs.readFileSync(`${configFile}`, 'utf8'));
			dataTypeInfo.push({ name, fieldGroup, fieldGroupOrder })
		} catch (e) {
			console.log('Error parsing ', configFile);
			return;
		}
	});
	return dataTypeInfo;
};

const processDataTypes = () => {
	const data = findDataTypeConfigFiles();
	helpers.createBuildFile('dataTypes.js', `export default ${JSON.stringify(data, null, '\t')}`);
};


processDataTypes();
