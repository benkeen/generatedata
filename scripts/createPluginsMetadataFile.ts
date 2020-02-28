// Step 2 of the build process. This generates a metadata file that's included as part of the 
import { dataTypes } from '../build/_tmpPluginList';
import { createBuildFile } from './helpers';

const generatePluginsMetadataFile = (): void => {
	const dataTypeNames = Object.keys(dataTypes);

	// 1. Data Types
	// --- List of Data Types, plus TS Type
	let content = `export type DataType = '${dataTypeNames.join('\' | \'')}';\n`;

	// --- Meta info for each valid Data Type
	const dtLines = dataTypeNames.map((dataTypeName: string) => {
		// @ts-ignore-line
		const currDataType = dataTypes[dataTypeName];
		return `\t{ name: '${currDataType.name}', folder: '${currDataType.folder}', fieldGroup: '${currDataType.fieldGroup}', fieldGroupOrder: ${currDataType.fieldGroupOrder}, processOrder: ${currDataType.processOrder} }`
	});
	content += `export const dataTypes = [\n${dtLines.join(',\n')}\n];\n\n`

	// 2. Export Types
	
	console.log(content);
 
	createBuildFile('plugins.ts', content);
};


generatePluginsMetadataFile();



// // const processDataTypes = () => {
// // 	const data = helpers.getDataTypes().map((i) => ({
// // 		name: i.name,
// // 		folder: i.folder,
// // 		fieldGroup: i.fieldGroup,
// // 		fieldGroupOrder: i.fieldGroupOrder,
// // 		processOrder: i.processOrder
// // 	}));

// // 	helpers.createBuildFile('dataTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
// // };

// const processExportTypes = () => {
// 	const data = helpers.getExportTypes().map((i) => ({
// 		name: i.name,
// 		folder: i.folder
// 	}));

// 	helpers.createBuildFile('exportTypeConfig.ts', `export default ${JSON.stringify(data, null, '\t')};`);
// };

// processDataTypes();
// processExportTypes();
