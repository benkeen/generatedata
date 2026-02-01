/**
 * Validates a set of i18n files for a plugin, or the core. This:
 * - ensures all files are valid JSON
 * - ensures all files have the same keys
 *
 * Usage: `validate-i18n-files --folder ./path/to/i18n/folder`
 */

import fs from 'fs';
import path from 'path';

// extract the folder path from command line arguments
const args = process.argv.slice(2);
const folderArgIndex = args.indexOf('--folder');
if (folderArgIndex === -1 || folderArgIndex === args.length - 1) {
  console.error('Usage: validate-i18n-files --folder ./path/to/i18n/folder');
  process.exit(1);
}

const validateI18nFileSet = (folderPath: string) => {
  const fileNames = fs.readdirSync(folderPath).filter((fileName) => fileName.endsWith('.json'));
  const allKeysSet = new Set<string>();
  const fileKeyMaps: Record<string, Set<string>> = {};

  // Read and parse each file, collecting keys
  for (const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      throw new Error(`Failed to read or parse i18n file at ${filePath}: ${JSON.stringify(e)}`);
    }

    const keys = Object.keys(data);
    fileKeyMaps[fileName] = new Set(keys);
    keys.forEach((key) => allKeysSet.add(key));
  }

  const allKeys = Array.from(allKeysSet);

  // Validate each file has all keys
  for (const [fileName, keySet] of Object.entries(fileKeyMaps)) {
    const missingKeys = allKeys.filter((key) => !keySet.has(key));
    if (missingKeys.length > 0) {
      throw new Error(`i18n file ${fileName} is missing keys: ${missingKeys.join(', ')}`);
    }
  }

  console.log(`All i18n files in ${folderPath} are valid and have consistent keys.`);
};
