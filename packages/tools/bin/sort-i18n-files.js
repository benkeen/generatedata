const { sortI18nFileSet, formatSortResults } = require('../dist/i18n-helpers');

// extract the folder path from command line arguments
const args = process.argv.slice(2);
const folderArgIndex = args.indexOf('--folder');
if (folderArgIndex === -1 || folderArgIndex === args.length - 1) {
  console.error('Usage: sort-i18n-files --folder ./path/to/i18n/folder');
  process.exit(1);
}

const result = sortI18nFileSet(args[folderArgIndex + 1]);
console.log(formatSortResults(result));

if (result.errors.length > 0) {
  process.exit(1);
}
