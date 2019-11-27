// converter script to change the PHP locale files from v3 to JS files for v4
var fs = require('fs');

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
		const { name, fieldGroup, fieldGroupOrder } = JSON.parse(fs.readFileSync(`${configFile}`, 'utf8'));
		dataTypeInfo.push({ name, fieldGroup, fieldGroupOrder })
	});

	return dataTypeInfo;
};

const generateDataTypesConfigBundle = () => {
	const data = findDataTypeConfigFiles();

	console.log(data);

	// generate file here
};


generateDataTypesConfigBundle();
