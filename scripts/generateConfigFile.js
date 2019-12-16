require = require('esm')(module); // allows us to read es6 files
const fs = require('fs');
const path = require('path');
const configDefaults = require('../config/config.client.defaults');
const helpers = require('./helpers');

let overrides = {};
const configFile = path.join(__dirname, '..', 'config', 'config.client.js');
if (fs.existsSync(configFile)) {
	overrides = require(configFile);
}

const completeConfigFile = {
	...configDefaults,
	...overrides
};

helpers.createBuildFile('config.client.js', `export default ${JSON.stringify(completeConfigFile, null, '\t')};`);
