/**
 * This script generates a ./build/dataTypes.js file containing all the FE UI code for the Data Types. Localization
 * bundles are created separately.
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
		const configFile = `${baseFolder}/${folder}/${folder}.config.js`;
		if (!fs.existsSync(configFile)) {
			return;
		}

		// TODO we definitely ultimately need babel. the UI code contains JSX.
		// single (generated) file that imports all data types config & ui files.
		// Q: how to access that info in the rest of the script?
		// I guess the generated files

		// what if this just generates an es6 file linking to all Data Type files. Webpack then takes over and
		// generates a single bundle of all data type code.
		//

		try {
			const file = require(configFile);
			dataTypeInfo.push({
				name: file.name,
				fieldGroup: file.fieldGroup,
				fieldGroupOrder: file.fieldGroupOrder
			});
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
