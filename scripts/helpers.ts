const fs = require('fs');
const path = require('path');

export const createBuildFile = (filename: string, content: string) => {
	const buildFolder = path.join(__dirname, '..', 'build');
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder, { recursive: true });
	}
	const file = path.join(__dirname, '..', 'build', filename);
	if (fs.existsSync(file)) {
		fs.unlinkSync(file);
	}
	fs.writeFileSync(file, content);
};


// const getDataTypes = () => {
// 	const baseFolder = path.join(__dirname, '..', '/src/plugins/dataTypes');
// 	const folders = fs.readdirSync(baseFolder);
// 	const dataTypeInfo = [];

// 	folders.forEach((folder) => {
// 		// ignore all Data Types folders that begin with an _. Quick convenient way to remove them without removing them.
// 		if (/^_/.test(folder)) {
// 			return;
// 		}

// 		const bundle = `${baseFolder}/${folder}/bundle.ts`;
// 		if (!fs.existsSync(bundle)) {
// 			return;
// 		}
// 		let row;
// 		try {
// 			const blah = require(bundle).default;
// 			console.log('--->', blah);

// 			row = {
// 				name: config.name,
// 				folder,
// 				folderPath: `${baseFolder}/${folder}`,
// 				fieldGroup: config.fieldGroup,
// 				fieldGroupOrder: config.fieldGroupOrder,
// 				processOrder: config.processOrder ? config.processOrder : 1
// 			};
// 		} catch (e) {
// 			console.log('Error parsing ', blah);
// 		}

// 		dataTypeInfo.push(row);
// 	});
// 	return dataTypeInfo;
// };

// const getExportTypes = () => {
// 	const baseFolder = path.join(__dirname, '..', '/src/plugins/exportTypes');
// 	const folders = fs.readdirSync(baseFolder);
// 	const exportTypeInfo = [];

// 	folders.forEach((folder) => {
// 		// ignore all Data Types folders that begin with an _. Quick convenient way to remove them without removing them.
// 		if (/^_/.test(folder)) {
// 			return;
// 		}
// 		const configFile = `${baseFolder}/${folder}/${folder}.config.js`;
// 		if (!fs.existsSync(configFile)) {
// 			return;
// 		}
// 		let row;
// 		try {
// 			const file = require(configFile).default;
// 			row = {
// 				name: file.name,
// 				folder,
// 				folderPath: `${baseFolder}/${folder}`
// 			};
// 		} catch (e) {
// 			console.log('Error parsing ', configFile);
// 		}
// 		exportTypeInfo.push(row);
// 	});
// 	return exportTypeInfo;
// };
