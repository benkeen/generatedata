/**
 * This script:
 * - generates i18n files for the FE code containing the core, data types + export type strings. Structure:
 *    {
 *        core: {...},
 *        dataTypes {
 *            AutoIncrement: {...},
 *            Boolean: {...}
 *            ...
 *        },
 *        exportTypes: {
 *            HTML: { ... },
 *            ...
 *        }
 *    }
 *
 * The core script handles pulling out the various sections and passing them to the Data/Export Type via props.
 */
require = require('esm')(module); // allows us to read es6 files
const fs = require('fs');
const helpers = require('./helpers');

const getCoreI18n = () => {
	const en = require('../i18n/en.js');
	console.log(en);
};

const getDataTypeI18n = () => {

};

const getExportTypeI18n = () => {

};

getCoreI18n();


// // parses the data type folder and finds
// const findDataTypeConfigFiles = () => {
// 	const baseFolder = './src/plugins/dataTypes'; // note this has to be run from the root. add a -cwd option
//
// 	const folders = fs.readdirSync(baseFolder);
// 	const dataTypeInfo = [];
// 	folders.forEach((folder) => {
// 		const configFile = `${baseFolder}/${folder}/${folder}.config.json`;
// 		if (!fs.existsSync(configFile)) {
// 			return;
// 		}
// 		try {
// 			const { name, fieldGroup, fieldGroupOrder } = JSON.parse(fs.readFileSync(`${configFile}`, 'utf8'));
// 			dataTypeInfo.push({ name, fieldGroup, fieldGroupOrder })
// 		} catch (e) {
// 			console.log('Error parsing ', configFile);
// 			return;
// 		}
// 	});
// 	return dataTypeInfo;
// };
//
// const processDataTypes = () => {
// 	const data = findDataTypeConfigFiles();
// 	helpers.createBuildFile('dataTypes.js', `export default ${JSON.stringify(data, null, '\t')}`);
// };
//
//
// processDataTypes();

//
