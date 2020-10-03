const fs = require('fs');
const path = require('path');

// const dataTypesFolder = 'src/plugins/dataTypes';
// const exportTypesFolder = 'src/plugins/exportTypes';
const locales = ['de', 'en', 'es', 'fr', 'ja', 'nl', 'ta', 'zh'];

const getLocaleFileStrings = (locale) => {
	return require(getFilePath(locale));
};

const findStringsInEnFileMissingFromOtherLangFiles = (results, stringsByLocale, targetLocale = null) => {
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

const getFilePath = (locale) => path.join(__dirname, '..', `src/i18n/${locale}.json`);

const removeKeyFromI18nFiles = (key) => {
	locales.forEach((locale) => {
		const localeFile = getLocaleFileStrings(locale);
		delete localeFile[key];
		const file = getFilePath(locale);
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


module.exports = {
	locales,
	getLocaleFileStrings,
	findStringsInEnFileMissingFromOtherLangFiles,
	parseCoreToFindUnusedStrings,
	removeKeyFromI18nFiles
};
