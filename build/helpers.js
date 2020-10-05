const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');

const getPlugins = (pluginType, blacklist, checkConfigFileExistence = true) => {
	const baseFolder = path.join(__dirname, '..', `/src/plugins/${pluginType}`);
	const folders = fs.readdirSync(baseFolder);

	return folders.filter((folder) => {
		if (blacklist.indexOf(folder) !== -1) {
			return false;
		}
		const bundle = `${baseFolder}/${folder}/bundle.ts`;
		const config = `${baseFolder}/${folder}/config.ts`;
		if (checkConfigFileExistence) {
			return fs.existsSync(bundle) && fs.existsSync(config);
		} else {
			return fs.existsSync(bundle);
		}
	});
};

const getHashFilename = (target) => `__hash-${path.basename(target, path.extname(target))}`;

const generateWorkerHashfile = (src, folder) => {
	const hashFilename = getHashFilename(src);
	const fileHash = md5File.sync(`${folder}/${src}`);
	const fileWithPath = `${folder}/${hashFilename}`;

	if (fs.existsSync(fileWithPath)) {
		fs.unlinkSync(fileWithPath);
	}
	fs.writeFileSync(fileWithPath, fileHash);
};

/**
 * Get a new scoped filename for a web worker plugin file (Export Type, Data Type, Country).
 * @param file - the full path including filename or just the filename
 * @param workerType - "country", "dataType" or "exportType
 */
const getScopedWorkerFilename = (file, workerType) => {
	let fileWithoutExt = path.basename(file, path.extname(file));

	let prefix = '';
	if (workerType === 'dataType') {
		prefix = 'DT-';
	} else if (workerType === 'exportType') {
		prefix = 'ET-';
	} else if (workerType === 'country') {
		prefix = 'C-';
		const folder = path.dirname(file).split(path.sep);
		fileWithoutExt = folder[folder.length-1];
	}

	return `${prefix}${fileWithoutExt}.js`;
};

const hasWorkerFileChanged = (filename, hashFile) => {
	let hasChanged = true;

	if (fs.existsSync(hashFile) && fs.existsSync(filename)) {
		const hash = fs.readFileSync(hashFile, 'utf8');

		if (md5File.sync(filename) === hash) {
			hasChanged = false;
		}
	}

	return hasChanged;
};

// returns all the items in arr1 that are not in arr2
const arrayDiff = (arr1, arr2) => arr1.filter((a) => arr2.indexOf(a) === -1);


module.exports = {
	getPlugins,
	getHashFilename,
	generateWorkerHashfile,
	getScopedWorkerFilename,
	hasWorkerFileChanged,
	arrayDiff
};
