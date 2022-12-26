const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const helpers = require('./build/helpers');
const i18n = require('./build/i18n');

const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
if (result.error) {
	console.error("\nMissing .env file.... Please see the documentation about setting up your environment.\n", result);
	return;
}

const locales = process.env.GD_LOCALES.split(',');

const distFolder = path.join(__dirname, '/dist');
if (!fs.existsSync(distFolder)) {
	fs.mkdirSync(distFolder);
}

const workersFolder = path.join(__dirname, '/dist/workers');
if (!fs.existsSync(workersFolder)) {
	fs.mkdirSync(workersFolder);
}

// returns an 8 char version of the filename hash, used for cache-busting purposes
const getFilenameHash = (filename) => {
	const fileBuffer = fs.readFileSync(filename);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);

	return hashSum.digest('hex').substring(0, 8);
};

// stored in memory here. For the dev environment, changes to web worker files are watched and built separately,
// then this object is updated with the change & the final map file is regenerated. For prod it's just done in
// one go
const webWorkerMap = {
	generationWorker: '',
	workerUtils: '',
	dataTypes: {},
	exportTypes: {}
};

module.exports = function (grunt) {
	const dataTypesFolder = 'src/plugins/dataTypes';
	const exportTypesFolder = 'src/plugins/exportTypes';
	const countriesFolder = 'src/plugins/countries';
	const mainTranslationsFolder = 'src/i18n/';

	const checkPlugin = (pluginType) => {
		const folderMap = {
			dataType: dataTypesFolder,
			exportType: exportTypesFolder,
			countries: countriesFolder
		};

		const en = getPluginLocaleFiles(grunt, 'en', folderMap[pluginType]);

		const propsWithI18n = {};
		Object.keys(en).forEach((plugin) => {
			Object.keys(en[plugin]).forEach((prop) => {
				const matches = en[plugin][prop].match(/%\d/g);
				if (!matches) {
					return;
				}

				if (!propsWithI18n[plugin]) {
					propsWithI18n[plugin] = [];
				}
				propsWithI18n[plugin].push({ prop, count: matches.length });
			});
		});

		const invalidPlugins = [];
		locales.forEach((locale) => {
			if (locale === 'en') {
				return;
			}
			const currLangStrings = getPluginLocaleFiles(grunt, locale, folderMap[pluginType]);

			Object.keys(propsWithI18n).forEach((plugin) => {
				propsWithI18n[plugin].forEach(({ prop, count }) => {

					// now loop through each of the placeholders and confirm that the
					let isValid = true;
					for (let i=1; i<=count; i++) {
						const re = new RegExp(`%${i}`);
						if (!re.test(currLangStrings[plugin][prop])) {
							isValid = false;
						}
					}

					if (!isValid) {
						invalidPlugins.push(`Invalid: "${prop}", lang "${locale}", DT: "${plugin}": ${currLangStrings[plugin][prop]}`);
					}
				});
			});
		});

		return invalidPlugins;
	};

	const validateStringsWithPlaceholders = () => {
		let errors = '';
		const dtErrors = checkPlugin('dataType');
		if (dtErrors.length) {
			errors += '\n\nData Type placeholder errors:\n\n' + dtErrors.join('\n');
		}

		const etErrors = checkPlugin('exportType');
		if (etErrors.length) {
			errors += 'Export Type placeholder errors:\n\n' + etErrors.join('\n');
		}

		const countriesErrors = checkPlugin('countries');
		if (countriesErrors.length) {
			errors += 'Export Type placeholder errors:\n\n' + countriesErrors.join('\n');
		}

		return errors;
	};

	const generateI18nBundles = () => {
		const fileHashMap = locales.reduce((acc, locale) => {
			const coreLocaleStrings = JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`, 'utf8'));
			const dtImports = getPluginLocaleFiles(grunt, locale, dataTypesFolder);
			const etImports = getPluginLocaleFiles(grunt, locale, exportTypesFolder);
			const countryImports = getPluginLocaleFiles(grunt, locale, countriesFolder);

			acc = {
				...acc,
				...generateLocaleFileTemplate(locale, coreLocaleStrings, dtImports, etImports, countryImports)
			};
			return acc;
		}, {});

		// generate the i18n hashmap file. This is imported by the source code to know what files to load
		generateI18nHashMap(fileHashMap);
	};

	const generateI18nHashMap = (content) => {
		const filename = `./_localeFileMap.ts`;
		const tsContent = `import { GDLocaleMap } from '~types/general';

export const localeFileMap: GDLocaleMap = ${JSON.stringify(content, null, '\t')};`;
		fs.writeFileSync(filename, tsContent);
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
		const template = `// DO NOT EDIT. This file is generated by a Grunt task.
// ----------------------------------------------------

(function() { 
const i18n = {
	core: ${JSON.stringify(coreLocaleStrings)},
	dataTypes: ${JSON.stringify(dtImports)},
	exportTypes: ${JSON.stringify(etImports)},
	countries: ${JSON.stringify(countryImports)}
};

// load the locale info via an exposed global
window.gd.localeLoaded(i18n);
})();`;

		const filename = `./dist/${locale}.js`;
		fs.writeFileSync(filename, template);

		const hash = getFilenameHash(filename);
		const hashedFilename = `${locale}-${hash}.js`;
		fs.renameSync(filename, `./dist/${hashedFilename}`);

		return {
			[locale]: hashedFilename
		};
	};

	// looks through the plugins and finds the plugins that have a generator web worker file
	const dataTypeWebWorkerMap = (() => {
		const baseFolder = path.join(__dirname, `/src/plugins/dataTypes`);
		const folders = fs.readdirSync(baseFolder);

		const map = {};
		folders.forEach((folder) => {
			const webworkerFile = path.join(__dirname, `/src/plugins/dataTypes/${folder}/${folder}.worker.ts`);
			if (!fs.existsSync(webworkerFile)) {
				return;
			}
			map[`dist/workers/DT-${folder}.worker.js`] = [`src/plugins/dataTypes/${folder}/${folder}.worker.ts`];
		});

		return map;
	})();

	const exportTypeWebWorkerMap = (() => {
		const baseFolder = path.join(__dirname, `/src/plugins/exportTypes`);
		const folders = fs.readdirSync(baseFolder);

		const map = {};
		folders.forEach((folder) => {
			const webworkerFile = path.join(__dirname, `/src/plugins/exportTypes/${folder}/${folder}.worker.ts`);
			if (!fs.existsSync(webworkerFile)) {
				return;
			}
			map[`dist/workers/ET-${folder}.worker.js`] = [`src/plugins/exportTypes/${folder}/${folder}.worker.ts`];
		});

		return map;
	})();

	const webWorkerFileListWithType = [
		{ file: 'src/core/generator/generation.worker.ts', type: 'core' },
		{ file: 'src/utils/workerUtils.ts', type: 'core' }
	];
	Object.values(dataTypeWebWorkerMap).forEach((dt) => {
		webWorkerFileListWithType.push({ file: dt[0], type: 'dataType' });
	});
	Object.values(exportTypeWebWorkerMap).forEach((et) => {
		webWorkerFileListWithType.push({ file: et[0], type: 'exportType' });
	});

	const webWorkerFileList = webWorkerFileListWithType.map((i) => i.file);

	const generateWorkerMapFile = () => {
		fs.writeFileSync(`./_pluginWebWorkers.ts`, `export default ${JSON.stringify(webWorkerMap, null, '\t')};`);
	};

	const getWebWorkerShellCommands = (omitFiles = {}) => {
		const commands = {};

		webWorkerFileListWithType.forEach(({ file, type }, index) => {
			if (omitFiles[file]) {
				return;
			}

			const filename = path.basename(file, path.extname(file));
			let target = `dist/workers/${filename}.js`;

			if (['dataType', 'exportType'].indexOf(type) !== -1) { // 'country'
				const filename = helpers.getScopedWorkerFilename(file, type);
				target = `dist/workers/${filename}`;
			}

			// TODO detect when the command is run and look for the generated __hash-[filename] content, then update
			// __
			commands[`buildWebWorker${index}`] = {
				command: `npx rollup -c --config-src=${file} --config-target=${target}`
			};
		});

		return commands;
	};

	// generating every web worker bundle takes time. To get around that, rollup generates a file in the dist/workers
	// file for each bundle, with the filename of form:
	//      Plugins (e.g.):
	//          __hash-DT-Alphanumeric.generator
	//          __hash-ET-JSON.generator
	//
	//      Core workers:
	//          __hash-core.worker
	//          __hash-generation.worker
	//          __hash-workerUtils
	// we then use that information here to check to see if we need to regenerate or not
	const getWebWorkerBuildCommandNames = () => {

		const omitFiles = {};
		webWorkerFileListWithType.forEach(({ file, type }) => {
			const filename = helpers.getScopedWorkerFilename(file, type);
			const filenameHash = helpers.getHashFilename(filename);

			if (!helpers.hasWorkerFileChanged(`${workersFolder}/${filename}`, `${workersFolder}/${filenameHash}`)) {
				omitFiles[file] = true;
			}
		});

		return Object.keys(getWebWorkerShellCommands(omitFiles)).map((cmdName) => `shell:${cmdName}`);
	};

	const webWorkerWatchers = (() => {
		const tasks = {};

		// this contains *ALL* web worker tasks. It ensures that everything is watched.
		webWorkerFileList.forEach((workerPath, index) => {
			tasks[`webWorkerWatcher${index}`] = {
				files: [workerPath],
				options: { spawn: false },
				tasks: [
					`shell:buildWebWorker${index}`,
					`md5:webWorkerMd5Task${index}`,
					'generateWorkerMapFile'
				]
			};
		});

		return tasks;
	})();

	const processMd5Change = (fileChanges) => {
		const oldPath = fileChanges[0].oldPath;
		const oldFile = path.basename(oldPath);
		const newFilename = path.basename(fileChanges[0].newPath);

		if (oldPath === 'dist/workers/generation.worker.js') {
			webWorkerMap.generationWorker = newFilename;
		} else if (oldPath === 'dist/workers/workerUtils.js') {
			webWorkerMap.workerUtils = newFilename;
		} else {
			const [pluginFolder] = oldFile.split('.');
			const cleanPluginFolder = pluginFolder.replace(/^(DT-|ET-)/, '');

			if (/^DT-/.test(oldFile)) {
				webWorkerMap.dataTypes[cleanPluginFolder] = newFilename;
			} else if (/^ET-/.test(oldFile)) {
				webWorkerMap.exportTypes[cleanPluginFolder] = newFilename;
			}
		}
	};

	// these tasks execute individually AFTER the worker has already been generated in the dist/workers folder
	const webWorkerMd5Tasks = (() => {
		const tasks = {};
		webWorkerFileListWithType.forEach(({ file, type }, index) => {
			const fileName = helpers.getScopedWorkerFilename(file, type);
			const newFileLocation = `dist/workers/${fileName}`; // N.B. here it's now a JS file, not TS

			tasks[`webWorkerMd5Task${index}`] = {
				files: {
					[newFileLocation]: newFileLocation
				},
				options: {
					after: (fileChanges) => processMd5Change(fileChanges, webWorkerMap)
				}
			};
		});

		return tasks;
	})();

	const getWebWorkerMd5TaskNames = () => {
		return Object.keys(webWorkerMd5Tasks).map((cmdName) => `md5:${cmdName}`);
	};

	grunt.initConfig({
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/styles.css': [
						'src/resources/codemirror.css',
						'src/resources/ambience.css',
						'src/resources/bespin.css',
						'src/resources/cobalt.css',
						'src/resources/darcula.css',
						'src/resources/lucario.css'
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/images',
						src: ['*'],
						dest: 'dist/images/'
					}
				]
			},

			// TODO should minify these too
			codeMirrorModes: {
				files: [
					{
						expand: true,
						cwd: '../node_modules/codemirror/mode',
						src: ['**/*'],
						dest: 'dist/codeMirrorModes/'
					}
				]
			}
		},

		clean: {
			dist: ['dist']
		},

		shell: {
			webpackProd: {
				command: 'yarn prod'
			},

			// note these aren't executed right away, so they contain ALL web workers, even those don't need regeneration
			...getWebWorkerShellCommands()
		},

		watch: {
			...webWorkerWatchers
		},

		md5: {
			...webWorkerMd5Tasks
		}
	});

	const validateI18n = () => {
		const baseLocale = grunt.option('baseLocale') || 'en';
		const targetLocale = grunt.option('locale') || null;
		const targetDataType = grunt.option('dataType') || null;
		const targetExportType = grunt.option('exportType') || null;

		let errors = '';
		if (targetDataType) {
			errors += i18n.validateDataTypeI18n(baseLocale, targetDataType);
		} else if (targetExportType) {
			errors += i18n.validateExportTypeI18n(baseLocale, targetDataType);
		} else {
			errors += i18n.validateCoreI18n(baseLocale, targetLocale);
			errors += i18n.validateDataTypeI18n(baseLocale);
			errors += i18n.validateExportTypeI18n(baseLocale);
		}

		errors += validateStringsWithPlaceholders();

		if (errors) {
			grunt.fail.fatal(errors);
		}
	};

	const sortI18nFiles = () => {
		i18n.locales.forEach((locale) => {
			const data = i18n.getCoreLocaleFileStrings(locale);
			const file = `./src/i18n/${locale}.json`;
			const sortedKeys = Object.keys(data).sort();

			let sortedObj = {};
			sortedKeys.forEach((key) => {
				sortedObj[key] = data[key];
			});

			fs.writeFileSync(file, JSON.stringify(sortedObj, null, '\t'));
		});
	};

	// helper methods to operate on all lang files at once
	grunt.registerTask('removeI18nKey', () => {
		const key = grunt.option('key') || null;
		if (!key) {
			grunt.fail.fatal("Please enter a key to remove. Format: `grunt removeI18nKey --key=word_goodbye");
		}
		i18n.removeKeyFromI18nFiles(grunt.option('key'));
	});

	grunt.registerTask('addLocale', () => {
		const locale = grunt.option('locale') || null;
		if (!locale) {
			grunt.fail.fatal("Please enter a locale to add. Locales should be the ISO-3166 2-char code: `grunt addLocale --locale=xy");
		}

		const dataTypes = fs.readdirSync(dataTypesFolder);
		dataTypes.forEach((folder) => {
			const en = `${dataTypesFolder}/${folder}/i18n/en.json`;
			const newLocaleFile = `${dataTypesFolder}/${folder}/i18n/${locale}.json`;
			if (fs.existsSync(en)) {
				fs.copyFileSync(en, newLocaleFile);
			}
		});

		const exportTypes = fs.readdirSync(exportTypesFolder);
		exportTypes.forEach((folder) => {
			const en = `${exportTypesFolder}/${folder}/i18n/en.json`;
			const newLocaleFile = `${exportTypesFolder}/${folder}/i18n/${locale}.json`;
			if (fs.existsSync(en)) {
				fs.copyFileSync(en, newLocaleFile);
			}
		});

		const countries = fs.readdirSync(countriesFolder);
		countries.forEach((folder) => {
			const en = `${countriesFolder}/${folder}/i18n/en.json`;
			const newLocaleFile = `${countriesFolder}/${folder}/i18n/${locale}.json`;
			if (fs.existsSync(en)) {
				fs.copyFileSync(en, newLocaleFile);
			}
		});

		// main translation file
		const mainEn = `${mainTranslationsFolder}/en.json`;
		if (fs.existsSync(mainEn)) {
			fs.copyFileSync(mainEn, `${mainTranslationsFolder}/${locale}.json`);
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-md5');

	grunt.registerTask('sortI18nFiles', sortI18nFiles);
	grunt.registerTask('default', ['cssmin', 'copy', 'i18n', 'webWorkers']);
	grunt.registerTask('dev', ['cssmin', 'copy', 'i18n', 'webWorkers', 'watch']);
	grunt.registerTask('generateWorkerMapFile', generateWorkerMapFile);
	grunt.registerTask('i18n', generateI18nBundles);
	grunt.registerTask('validateI18n', validateI18n);

	grunt.registerTask('webWorkers', [
		...getWebWorkerBuildCommandNames(),
		...getWebWorkerMd5TaskNames(),
		'generateWorkerMapFile'
	]);
};
