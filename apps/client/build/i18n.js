const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const result = require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
if (result.error) {
	return;
}

const locales = process.env.GD_LOCALES.split(',');

const getCoreLocaleFileStrings = (locale) => {
	return require(getCoreLocaleFilePath(locale));
};

const findMissingStrings = (stringsByLocale, targetLocale = null, baseLocale = 'en') => {
	const locales = Object.keys(stringsByLocale);
	const results = [];

	const baseLocaleKeys = Object.keys(stringsByLocale[baseLocale]);
	locales.forEach((locale) => {
		if (targetLocale && targetLocale !== locale) {
			return;
		}

		const targetLocaleKeys = Object.keys(stringsByLocale[locale]);

		// missing from source file
		const missing = helpers.arrayDiff(baseLocaleKeys, targetLocaleKeys);
		missing.forEach((key) => {
			results.push({ key, locale });
		});

		// extra ones in locale file
		const extra = helpers.arrayDiff(targetLocaleKeys, baseLocaleKeys);
		extra.forEach((key) => {
			results.push({ key, locale, isExtra: true });
		});
	});

	return results;
};

const findStringsInDataTypeEnFileMissingFromOtherLangFiles = (results, dataType, stringsByLocale) => {
	const langs = Object.keys(stringsByLocale);

	let count = 0;
	results.lines.push(`\nEnglish strings missing from other lang files:\n-------------------------------------------`);
	Object.keys(stringsByLocale['en']).forEach((key) => {
		const missing = [];
		langs.forEach((locale) => {
			if (targetLocale && targetLocale !== locale) {
				return;
			}

			if (!stringsByLocale[locale][key]) {
				missing.push(locale);
			}
		});
		if (missing.length > 0) {
			count++;
			results.lines.push(`${key}\n   -missing from: ${missing.join(', ')}`);
		}
	});

	if (count > 0) {
		results.error = true;
		results.lines.push(`-- MISSING ${count}`);
	} else {
		results.lines.push('All good!\n');
	}

	return results;
};



const getCoreLocaleFilePath = (locale) => path.join(__dirname, '..', `src/i18n/${locale}.json`);
const getDataTypeLocaleFilePath = (dataType, locale) => path.join(__dirname, '..', `src/plugins/dataTypes/${dataType}/i18n/${locale}.json`);

const getPluginLocaleFilePath = (plugin, pluginType, locale) => {
	const pluginFolder = pluginType === 'dataType' ? 'dataTypes' : 'exportTypes';
	return path.join(__dirname, '..', `src/plugins/${pluginFolder}/${plugin}/i18n/${locale}.json`);
};

const removeKeyFromI18nFiles = (key) => {
	locales.forEach((locale) => {
		const localeFile = getCoreLocaleFileStrings(locale);
		delete localeFile[key];
		const file = getCoreLocaleFilePath(locale);
		fs.writeFileSync(file, JSON.stringify(localeFile, null, '\t'));
	});
};

const parseCoreToFindUnusedStrings = (results, en) => {
	// let missingKeys = Object.keys(en);
	//
	// const ignoreFolders = [
	// 	'src/global/lang/',
	// 	'src/global/vendor/',
	// 	'src/global/codemirror/',
	// 	'src/global/fancybox/',
	// 	'src/global/images/',
	// 	'dist/',
	// 	'node_modules/',
	// 	'src/modules/'
	// ];
	//
	// const files = walk('./src');
	// files.forEach((file) => {
	// 	for (let i=0; i<ignoreFolders.length; i++) {
	// 		const re = new RegExp(ignoreFolders[i]);
	// 		if (re.test(file)) {
	// 			return;
	// 		}
	// 	}
	//
	// 	if (!(/[php|txt|tpl|html|js]$/.test(file))) {
	// 		return;
	// 	}
	//
	// 	const lines = new lineByLine(file);
	// 	let line;
	// 	while (line = lines.next()) {
	// 		line.toString('ascii');
	//
	// 		// loop through all keys that still haven't been found yet and remove any that are found on the row
	// 		let updatedKeys = [];
	// 		missingKeys.forEach((key) => {
	// 			const regex = new RegExp(key);
	//
	// 			// very kludgy, but the only place Form Tools uses dynamic keys is for dates: ignore all those keys.
	// 			// We also ignore any i18n keys flagged for global use across FT modules
	// 			if (!(/^date_/.test(key)) && !regex.test(line) && globalI18nStrings.indexOf(key) === -1) {
	// 				updatedKeys.push(key);
	// 			}
	// 		});
	//
	// 		missingKeys = updatedKeys;
	// 	}
	// });
	//
	// if (missingKeys.length > 0) {
	// 	results.error = true;
	// 	results.lines.push(`\nUNUSED KEYS:\n${missingKeys.join('\n  --')}`);
	// }
};

const getPluginLocaleStrings = (plugin, pluginType) => {
	const result = {};
	locales.forEach((locale) => {
		result[locale] = require(getPluginLocaleFilePath(plugin, pluginType, locale));
	});
	return result;
};

const validateCoreI18n = (baseLocale, targetLocale) => {
	const stringsByLocale = {};
	locales.forEach((locale) => {
		stringsByLocale[locale] = getCoreLocaleFileStrings(locale);
	});

	const missing = findMissingStrings(stringsByLocale, targetLocale, baseLocale);
	return getMissingStrMessage(missing, baseLocale);
};

const validateDataTypeI18n = (baseLocale, targetDataType) => {
	const dataTypes = helpers.getPlugins('dataTypes', [], false);

	let str = '';
	dataTypes.forEach((dataType) => {
		if (targetDataType && targetDataType !== dataType) {
			return;
		}

		const stringsByLocale = getPluginLocaleStrings(dataType, 'dataType');
		const missing = findMissingStrings(stringsByLocale);

		str += getMissingStrMessage(missing, baseLocale, `${dataType} -- `);
	});

	return str;
};

const validateExportTypeI18n = (baseLocale, targetExportType) => {
	const exportTypes = helpers.getPlugins('exportTypes', [], false);

	let str = '';
	exportTypes.forEach((dataType) => {
		if (targetExportType && targetExportType !== dataType) {
			return;
		}

		const stringsByLocale = getPluginLocaleStrings(dataType, 'exportType');
		const missing = findMissingStrings(stringsByLocale);

		str += getMissingStrMessage(missing, baseLocale, `${dataType} -- `);
	});

	return str;
};

const getMissingStrMessage = (missing, baseLocale, prefix) => {
	let str = '';
	if (missing.length) {
		let missingStr = [];
		let extraStr = [];
		missing.forEach(({ key, locale, isExtra }) => {
			if (isExtra) {
				extraStr.push(`- ${key}: ${locale}`);
			} else {
				missingStr.push(`- ${key}: ${locale}`);
			}
		});

		if (missingStr.length) {
			str += `\n\n${prefix}"${baseLocale}" strings missing from other lang files:\n-------------------------------------------\n`;
			str += missingStr.join('\n');
		}
		if (extraStr.length) {
			str += `\n\n${prefix}Extra strings in locale files that are NOT in "${baseLocale}" file:\n-------------------------------------------\n`;
			str += extraStr.join('\n');
		}
	}
	return str;
};



module.exports = {
	locales,
	getCoreLocaleFileStrings,
	parseCoreToFindUnusedStrings,
	removeKeyFromI18nFiles,
	getPluginLocaleStrings,
	validateCoreI18n,
	validateDataTypeI18n,
	validateExportTypeI18n
};
