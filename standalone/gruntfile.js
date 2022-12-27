const fs = require('fs');
const path = require('path');

const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
if (result.error) {
	console.error("\nMissing .env file.... Please see the documentation about setting up your environment.\n", result);
	return;
}

const BASE_PATH = path.join(__dirname, '../client');
const locales = process.env.GD_LOCALES.split(',');

module.exports = function (grunt) {
	const dataTypesFolder = `${BASE_PATH}/src/plugins/dataTypes`;
	const exportTypesFolder = `${BASE_PATH}/src/plugins/exportTypes`;
	const countriesFolder = `${BASE_PATH}/src/plugins/countries`;

	const createEmptyDist = () => {
		const distFolder = path.join(__dirname, '/dist');
		if (!fs.existsSync(distFolder)) {
			fs.mkdirSync(distFolder);
		}
	};

	const generateI18nBundles = () => {
		locales.forEach((locale) => {
			const coreLocaleStrings = JSON.parse(fs.readFileSync(`${BASE_PATH}/src/i18n/${locale}.json`, 'utf8'));
			const dtImports = getPluginLocaleFiles(grunt, locale, dataTypesFolder);
			const etImports = getPluginLocaleFiles(grunt, locale, exportTypesFolder);
			const countryImports = getPluginLocaleFiles(grunt, locale, countriesFolder);

			generateLocaleFileTemplate(locale, coreLocaleStrings, dtImports, etImports, countryImports)
		});
	};

	const getPluginLocaleFiles = (grunt, locale, pluginTypeFolder) => {
		const plugins = fs.readdirSync(pluginTypeFolder);
		const imports = {};
		plugins.forEach((folder) => {
			const localeFile = `${pluginTypeFolder}/${folder}/i18n/${locale}.json`;
			if (fs.existsSync(localeFile)) {
				try {
					imports[folder] = JSON.parse(fs.readFileSync(localeFile, 'utf8'));
				} catch (e) {
					grunt.fail.fatal('problem parsing i18n file: ' + localeFile);
				}
			}
		});
		return imports;
	};

	const generateLocaleFileTemplate = (locale, coreLocaleStrings, dtImports, etImports, countryImports) => {
		const template = {
			core: coreLocaleStrings,
			dataTypes: dtImports,
			exportTypes: etImports,
			countries: countryImports
		};

		const filename = `./dist/${locale}.json`;
		fs.writeFileSync(filename, JSON.stringify(template));
	};

	grunt.initConfig({
		clean: {
			dist: ['dist']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'createEmptyDist', 'i18n']);
	grunt.registerTask('i18n', generateI18nBundles);
	grunt.registerTask('createEmptyDist', createEmptyDist);
};
