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

const findStringsInDataTypeEnFileMissingFromOtherLangFiles = (results, dataType, stringsByLocale) => {
  const langs = Object.keys(stringsByLocale);

  let count = 0;
  results.lines.push('\nEnglish strings missing from other lang files:\n-------------------------------------------');
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

const getPluginLocaleStrings = (plugin, pluginType) => {
  const result = {};
  locales.forEach((locale) => {
    result[locale] = require(getPluginLocaleFilePath(plugin, pluginType, locale));
  });
  return result;
};

module.exports = {
  locales,
  getCoreLocaleFileStrings,
  parseCoreToFindUnusedStrings,
  removeKeyFromI18nFiles,
  getPluginLocaleStrings
};
