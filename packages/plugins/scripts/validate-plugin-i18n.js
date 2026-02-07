#!/usr/bin/env node

/**
 * Validates i18n files across all plugins that have translations.
 * This script iterates through dataTypes, exportTypes, and countries folders
 * and validates each plugin's i18n folder.
 */

const fs = require('fs');
const path = require('path');
const { validateI18nFileSet, formatValidationErrors } = require('@generatedata/tools/dist/i18n-helpers');

const PLUGIN_DIRS = ['dataTypes', 'exportTypes', 'countries'];
const srcDir = path.join(__dirname, '..', 'src');

let hasErrors = false;
let totalValidated = 0;

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

    const result = validateI18nFileSet(i18nPath);
    console.log(formatValidationErrors(result));

    if (!result.valid) {
      hasErrors = true;
    }
    totalValidated++;
  }
}

if (totalValidated === 0) {
  console.log('No plugins with i18n folders found.');
} else {
  console.log(`\nValidated ${totalValidated} plugin(s) with i18n folders.`);
}

if (hasErrors) {
  process.exit(1);
}
