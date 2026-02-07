#!/usr/bin/env node

/**
 * Sorts i18n files across all plugins that have translations.
 * This script iterates through dataTypes, exportTypes, and countries folders
 * and sorts each plugin's i18n JSON files alphabetically by key.
 */

const fs = require('fs');
const path = require('path');
const { sortI18nFileSet, formatSortResults } = require('@generatedata/tools/dist/i18n-helpers');

const PLUGIN_DIRS = ['dataTypes', 'exportTypes', 'countries'];
const srcDir = path.join(__dirname, '..', 'src');

let hasErrors = false;
let totalSorted = 0;

for (const pluginDir of PLUGIN_DIRS) {
  const pluginCategoryPath = path.join(srcDir, pluginDir);

  if (!fs.existsSync(pluginCategoryPath)) {
    continue;
  }

  const plugins = fs.readdirSync(pluginCategoryPath).filter((name) => {
    const pluginPath = path.join(pluginCategoryPath, name);
    return fs.statSync(pluginPath).isDirectory();
  });

  for (const plugin of plugins) {
    const i18nPath = path.join(pluginCategoryPath, plugin, 'i18n');

    if (!fs.existsSync(i18nPath)) {
      continue;
    }

    const result = sortI18nFileSet(i18nPath);
    console.log(formatSortResults(result));

    if (result.errors.length > 0) {
      hasErrors = true;
    }
    totalSorted++;
  }
}

if (totalSorted === 0) {
  console.log('No plugins with i18n folders found.');
} else {
  console.log(`\nSorted i18n files in ${totalSorted} plugin(s).`);
}

if (hasErrors) {
  process.exit(1);
}
