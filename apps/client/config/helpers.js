const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');

const getHashFilename = (target) => `__hash-${path.basename(target, path.extname(target))}`;

// const hasWorkerFileChanged = (filename, hashFile) => {
// 	let hasChanged = true;

// 	if (fs.existsSync(hashFile) && fs.existsSync(filename)) {
// 		const hash = fs.readFileSync(hashFile, 'utf8');

// 		if (md5File.sync(filename) === hash) {
// 			hasChanged = false;
// 		}
// 	}

// 	return hasChanged;
// };

// returns all the items in arr1 that are not in arr2
const arrayDiff = (arr1, arr2) => arr1.filter((a) => arr2.indexOf(a) === -1);


module.exports = {
	getHashFilename,
	arrayDiff
};
