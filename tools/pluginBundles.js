// converter script to change the PHP locale files from v3 to JS files for v4
const fs = require('fs');
const path = require('path');

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

const generateDataTypesConfigBundle = () => {
	const data = findDataTypeConfigFiles();
	const folder = path.join(__dirname, '..', 'build');

	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}

	const file = path.join(__dirname, '..', 'build', 'dataTypes.js');
	if (fs.exists(file)) {
		fs.unlinkSync(file);
	}
	fs.writeFileSync(file, `export default ${JSON.stringify(data, null, '\t')}`);
};


generateDataTypesConfigBundle();
