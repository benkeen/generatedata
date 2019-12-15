/**
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

const getCoreI18n = (locales) => {
	const content = {};
	locales.forEach((locale) => {
		const file = require(`../src/i18n/${locale}.js`);
		content[locale] = file.default;
	});
	return content;
};

const getDataTypeI18n = (locales) => {
	const dataTypes = helpers.getDataTypes();
	const dataTypeI18n = {};
	dataTypes.forEach(({ folder, folderPath }) => {
		const localeInfo = {};
		locales.forEach((locale) => {
			const localeFile = `${folderPath}/i18n/${locale}.js`;
			if (fs.existsSync(localeFile)) {
				localeInfo[locale] = require(localeFile).default;
			}
		});
		dataTypeI18n[folder] = localeInfo;
	});
	return dataTypeI18n;
};

const getExportTypeI18n = (locales) => {
	return {};
};

const generateLocaleFiles = () => {
	const locales = defaultConfig.default.locales;
	const core = getCoreI18n(locales);
	const dataTypes = getDataTypeI18n(locales);
	const dataTypeFolders = Object.keys(dataTypes);

	locales.forEach((locale) => {
		const content = {
			core: core[locale],
			dataTypes: {}
		};

		dataTypeFolders.forEach((dataType) => {
			if (!dataTypes[dataType][locale]) {
				return;
			}
			content.dataTypes[dataType] = dataTypes[dataType][locale];
		});

		helpers.createBuildFile(`${locale}.js`, `window.gd = { locale: '${locale}', strings: ${JSON.stringify(content, null, '\t')} };`);
	});
};

generateLocaleFiles();
