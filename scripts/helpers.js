const fs = require('fs');
const path = require('path');

const createBuildFile = (filename, content) => {
	const buildFolder = path.join(__dirname, '..', 'build');
	if (!fs.existsSync(buildFolder)) {
		fs.mkdirSync(buildFolder, { recursive: true });
	}

	const file = path.join(__dirname, '..', 'build', filename);
	if (fs.exists(file)) {
		fs.unlinkSync(file);
	}
	fs.writeFileSync(file, content);
};


const getDataTypes = () => {
	const baseFolder = path.join(__dirname, '..', '/src/plugins/dataTypes');
	const folders = fs.readdirSync(baseFolder);
	const dataTypeInfo = [];

	folders.forEach((folder) => {
		const configFile = `${baseFolder}/${folder}/${folder}.config.js`;
		if (!fs.existsSync(configFile)) {
			return;
		}
		let row;
		try {
			const file = require(configFile).default;
			row = {
				name: file.name,
				folder,
				folderPath: `${baseFolder}/${folder}`,
				fieldGroup: file.fieldGroup,
				fieldGroupOrder: file.fieldGroupOrder
			};
		} catch (e) {
			console.log('Error parsing ', configFile);
		}

		dataTypeInfo.push(row);
	});
	return dataTypeInfo;
};

module.exports = {
	createBuildFile,
	getDataTypes
};
