require = require('esm')(module); // allows us to read es6 files
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const configDefaults = require('../config/config.client.defaults');

let overrides = {};
const configFile = path.join(__dirname, '..', 'config', 'config.client.js');
if (fs.existsSync(configFile)) {
	overrides = require(configFile);
}

const completeConfigFile = {
	version: package.version,
	...configDefaults.default,
	...overrides
};

const createBuildFile = (filename, content) => {
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

createBuildFile('config.client.js', `export default ${JSON.stringify(completeConfigFile, null, '\t')};`);
