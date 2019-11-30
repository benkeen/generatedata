const fs = require('fs');
const path = require('path');
const configDefaults = require('../config.defaults');

// ah, commonJS! Ain't you handy
let overrides = {};
const configFile = path.join(__dirname, '..', 'config.js');
if (fs.existsSync(configFile)) {
	overrides = require(configFile);
}

const completeConfigFile = {
	...configDefaults,
	...overrides
};

console.log(completeConfigFile);

