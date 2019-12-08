/**
 *
 * *** requires processDataTypes, processExportTypes to have been run first. ***
 *
 * This script generates i18n files for the FE code containing the core, data types + export type strings. Structure:
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
const defaultConfig = require('../config/config.client.defaults.js');
const dataTypes = require('../build/dataTypes.js');

const getCoreI18n = (locales) => {
	const content = {};
	locales.forEach((locale) => {
		const file = require(`../i18n/${locale}.js`);
		content[locale] = file.default;
	});
	return map;
};

const getDataTypeI18n = (locales) => {
	// get list of data types...

	console.log(dataTypes);
};

const getExportTypeI18n = (locales) => {

};

const generateLocaleFiles = () => {
	const locales = defaultConfig.default.locales;

	return {
		core: getCoreI18n(locales),
		dataTypes: getDataTypeI18n(locales),
		exportTypes: getExportTypeI18n(locales)
	};
};


generateLocaleFiles();
