const fs = require('fs');

const dataTypesFolder = 'src/plugins/dataTypes';
const exportTypesFolder = 'src/plugins/exportTypes';
export const locales = ['de', 'en', 'es', 'fr', 'ja', 'nl', 'ta', 'zh'];


// checks for:
// -- complete translations, so all locale files have the same keys.
// -- missing i18n files. Sigh. Yes, we need to have everything translated.
const validateDataTypeI18n = (dataType) => {
	const dtLocaleFiles = fs.readdirSync(`${dataTypesFolder}/${dataType}/i18n`);
	const imports = {};
	dtLocaleFiles.forEach((locale) => {
		console.log(locale);

		// const localeFile = `${pluginTypeFolder}/${folder}/i18n/${locale}.json`;
		// if (fs.existsSync(localeFile)) {
		// 	try {
		// 		imports[folder] = JSON.parse(fs.readFileSync(localeFile, 'utf8'));
		// 	} catch (e) {
		// 		grunt.fail.fatal('problem parsing i18n file: ' + localeFile);
		// 	}
		// }

	});
	return imports;
};

const getLocaleFileStrings = (locale) => {
	return require(`./src/i18n/${locale}.json`);
};
