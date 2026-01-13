const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const helpers = require('./build/helpers');
const i18n = require('./build/i18n');
const clientConfig = require('@generatedata/config/clientConfig');

const locales = clientConfig.default.appSettings.GD_LOCALES;

const distFolder = path.join(__dirname, '/dist');
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder);
}

// const workersFolder = path.join(__dirname, '/dist/workers');
// if (!fs.existsSync(workersFolder)) {
//   fs.mkdirSync(workersFolder);
// }

// returns an 8 char version of the filename hash, used for cache-busting
const getFilenameHash = (filename) => {
  const fileBuffer = fs.readFileSync(filename);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex').substring(0, 8);
};

module.exports = function (grunt) {
  const dataTypesFolder = 'dataTypes';
  const exportTypesFolder = 'exportTypes';
  const countriesFolder = 'countries';
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
          for (let i = 1; i <= count; i++) {
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
      const coreLocaleStrings = JSON.parse(fs.readFileSync(require.resolve(`@generatedata/i18n/${locale}`), 'utf8'));
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
    const filename = './_localeFileMap.ts';
    const tsContent = `import type { GDLocaleMap } from '@generatedata/config';

export const localeFileMap: GDLocaleMap = ${JSON.stringify(content, null, '\t')};`;
    fs.writeFileSync(filename, tsContent);
  };

  const getPluginLocaleFiles = (grunt, locale, pluginTypeFolder) => {
    const fullPluginFolder = path.resolve(__dirname, `./node_modules/@generatedata/plugins/dist/${pluginTypeFolder}`);
    const plugins = fs.readdirSync(fullPluginFolder);
    const imports = {};
    plugins.forEach((folder) => {
      const localeFile = `${fullPluginFolder}/${folder}/i18n/${locale}.json`;
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

  grunt.initConfig({
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/styles.css': [
            'src/resources/global.css',
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
            cwd: './node_modules/codemirror/mode',
            src: ['**/*'],
            dest: 'dist/codeMirrorModes/'
          }
        ]
      },

      pluginWorkers: {
        files: [
          {
            expand: true,
            cwd: './node_modules/@generatedata/plugins/dist/workers',
            src: ['**/*'],
            dest: 'dist/workers/'
          },
          {
            expand: true,
            cwd: './node_modules/@generatedata/utils/dist/workers',
            src: ['**/*'],
            dest: 'dist/workers/'
          }
        ]
      }
    },

    watch: {},

    clean: {
      dist: ['dist']
    }
  });

  // const validateI18n = () => {
  // 	const baseLocale = grunt.option('baseLocale') || 'en';
  // 	const targetLocale = grunt.option('locale') || null;
  // 	const targetDataType = grunt.option('dataType') || null;
  // 	const targetExportType = grunt.option('exportType') || null;

  // 	let errors = '';
  // 	if (targetDataType) {
  // 		errors += i18n.validateDataTypeI18n(baseLocale, targetDataType);
  // 	} else if (targetExportType) {
  // 		errors += i18n.validateExportTypeI18n(baseLocale, targetDataType);
  // 	} else {
  // 		errors += i18n.validateCoreI18n(baseLocale, targetLocale);
  // 		errors += i18n.validateDataTypeI18n(baseLocale);
  // 		errors += i18n.validateExportTypeI18n(baseLocale);
  // 	}

  // 	errors += validateStringsWithPlaceholders();

  // 	if (errors) {
  // 		grunt.fail.fatal(errors);
  // 	}
  // };

  // const sortI18nFiles = () => {
  // 	i18n.locales.forEach((locale) => {
  // 		const data = i18n.getCoreLocaleFileStrings(locale);
  // 		const file = `./src/i18n/${locale}.json`;
  // 		const sortedKeys = Object.keys(data).sort();

  // 		let sortedObj = {};
  // 		sortedKeys.forEach((key) => {
  // 			sortedObj[key] = data[key];
  // 		});

  // 		fs.writeFileSync(file, JSON.stringify(sortedObj, null, '\t'));
  // 	});
  // };

  // helper methods to operate on all lang files at once
  // grunt.registerTask('removeI18nKey', () => {
  // 	const key = grunt.option('key') || null;
  // 	if (!key) {
  // 		grunt.fail.fatal('Please enter a key to remove. Format: `grunt removeI18nKey --key=word_goodbye');
  // 	}
  // 	i18n.removeKeyFromI18nFiles(grunt.option('key'));
  // });

  // grunt.registerTask('addLocale', () => {
  // 	const locale = grunt.option('locale') || null;
  // 	if (!locale) {
  // 		grunt.fail.fatal('Please enter a locale to add. Locales should be the ISO-3166 2-char code: `grunt addLocale --locale=xy');
  // 	}

  // 	const dataTypes = fs.readdirSync(dataTypesFolder);
  // 	dataTypes.forEach((folder) => {
  // 		const en = `${dataTypesFolder}/${folder}/i18n/en.json`;
  // 		const newLocaleFile = `${dataTypesFolder}/${folder}/i18n/${locale}.json`;
  // 		if (fs.existsSync(en)) {
  // 			fs.copyFileSync(en, newLocaleFile);
  // 		}
  // 	});

  // 	const exportTypes = fs.readdirSync(exportTypesFolder);
  // 	exportTypes.forEach((folder) => {
  // 		const en = `${exportTypesFolder}/${folder}/i18n/en.json`;
  // 		const newLocaleFile = `${exportTypesFolder}/${folder}/i18n/${locale}.json`;
  // 		if (fs.existsSync(en)) {
  // 			fs.copyFileSync(en, newLocaleFile);
  // 		}
  // 	});

  // 	const countries = fs.readdirSync(countriesFolder);
  // 	countries.forEach((folder) => {
  // 		const en = `${countriesFolder}/${folder}/i18n/en.json`;
  // 		const newLocaleFile = `${countriesFolder}/${folder}/i18n/${locale}.json`;
  // 		if (fs.existsSync(en)) {
  // 			fs.copyFileSync(en, newLocaleFile);
  // 		}
  // 	});

  // 	// main translation file
  // 	const mainEn = `${mainTranslationsFolder}/en.json`;
  // 	if (fs.existsSync(mainEn)) {
  // 		fs.copyFileSync(mainEn, `${mainTranslationsFolder}/${locale}.json`);
  // 	}
  // });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-md5');

  // grunt.registerTask('sortI18nFiles', sortI18nFiles);
  grunt.registerTask('default', ['cssmin', 'copy', 'generateI18nBundles']);
  grunt.registerTask('dev', ['cssmin', 'copy', 'generateI18nBundles', 'watch']);
  grunt.registerTask('generateI18nBundles', generateI18nBundles);
  // grunt.registerTask('validateI18n', validateI18n);
};
