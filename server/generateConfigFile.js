const fs = require('fs');
const path = require('path');
const configDefaults = require('../config/config.client.defaults');
const helpers = require('./helpers');

// ah commonJS, ain't you handy with your dynamic imports
let overrides = {};
const configFile = path.join(__dirname, '..', 'config', 'config.client.js');
if (fs.existsSync(configFile)) {
	overrides = require(configFile);
}

const completeConfigFile = {
	...configDefaults,
	...overrides
};

helpers.createBuildFile('config.client.js', `export default ${JSON.stringify(completeConfigFile, null, '\t')}`);
