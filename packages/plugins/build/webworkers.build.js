/**
 * This script is called as part of the main package build command. It generates the following;
 * - dist/workers/* - worker files for all data types + export types + core workers
 * 
 * REMAINING:
 * - hash the generated filenames
 * - generate a manifest file
 * - add worker 
 * - clean up this whole file, it's a total mess
 */
const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');
const concurrently = require('concurrently');

const workersFolder = path.join(__dirname, '../dist/workers');
if (!fs.existsSync(workersFolder)) {
  fs.mkdirSync(workersFolder, { recursive: true });
}

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

const getDataTypeWebWorkerMap = () => {
  const baseFolder = path.join(__dirname, '../src/dataTypes');
  const baseDistFolder = path.join(__dirname, '../dist/dataTypes');
  const folders = fs.readdirSync(baseFolder);

  const map = {};
  folders.forEach((folder) => {
    const webworkerFile = path.join(`${baseFolder}/${folder}/${folder}.worker.ts`);
    if (!fs.existsSync(webworkerFile)) {
      return;
    }
    map[`dist/workers/DT-${folder}.worker.js`] = [`${baseDistFolder}/${folder}/${folder}.worker.js`];
  });

  return map;
};

const getExportTypeWebWorkerMap = () => {
  const baseFolder = path.join(__dirname, '../src/exportTypes');
  const baseDistFolder = path.join(__dirname, '../dist/exportTypes');
  const folders = fs.readdirSync(baseFolder);

  const map = {};
  folders.forEach((folder) => {
    const webworkerFile = path.join(`${baseFolder}/${folder}/${folder}.worker.ts`);
    if (!fs.existsSync(webworkerFile)) {
      return;
    }
    map[`dist/workers/ET-${folder}.worker.js`] = [`${baseDistFolder}/${folder}/${folder}.worker.js`];
  });

  return map;
};

const getWebWorkerShellCommands = (omitFiles = {}) => {
  const webWorkerFileListWithType = [
    { file: 'dist/workerUtils.js', type: 'core' }
  ];
  const dataTypes = getDataTypeWebWorkerMap();
  const exportTypes = getExportTypeWebWorkerMap();

  Object.values(dataTypes).forEach((dt) => {
  	webWorkerFileListWithType.push({ file: dt[0], type: 'dataType' });
  });
  Object.values(exportTypes).forEach((et) => {
  	webWorkerFileListWithType.push({ file: et[0], type: 'exportType' });
  });

  const commands = {};

  webWorkerFileListWithType.forEach(({ file, type }, index) => {
    if (omitFiles[file]) {
      return;
    }

    const filename = path.basename(file, path.extname(file));
    let target = `dist/workers/${filename}.js`;

    if (['dataType', 'exportType'].indexOf(type) !== -1) {
      const filename = getScopedWorkerFilename(file, type);
      target = `dist/workers/${filename}`;
    } else if (type === 'core') {
      target = `dist/workers/${filename}.js`;
    } 

    // TODO detect when the command is run and look for the generated __hash-[filename] content, then update
    commands[`buildWebWorker${index}`] = {
      command: `npx rollup -c --config-src=${file} --config-target=${target}`
    };
  });

  return commands;
};

// const processMd5Change = (fileChanges) => {
//   const oldPath = fileChanges[0].oldPath;
//   const oldFile = path.basename(oldPath);
//   const newFilename = path.basename(fileChanges[0].newPath);

//   if (oldPath === 'dist/workers/generation.worker.js') {
//     webWorkerMap.generationWorker = newFilename;
//   } else if (oldPath === 'dist/workers/workerUtils.js') {
//     webWorkerMap.workerUtils = newFilename;
//   } else {
//     const [pluginFolder] = oldFile.split('.');
//     const cleanPluginFolder = pluginFolder.replace(/^(DT-|ET-)/, '');

//     if (/^DT-/.test(oldFile)) {
//       webWorkerMap.dataTypes[cleanPluginFolder] = newFilename;
//     } else if (/^ET-/.test(oldFile)) {
//       webWorkerMap.exportTypes[cleanPluginFolder] = newFilename;
//     }
//   }
// };

// these tasks execute individually AFTER the worker has already been generated in the dist/workers folder
// const webWorkerMd5Tasks = (() => {
//   const tasks = {};
//   webWorkerFileListWithType.forEach(({ file, type }, index) => {
//     const fileName = helpers.getScopedWorkerFilename(file, type);
//     const newFileLocation = `dist/workers/${fileName}`; // N.B. here it's now a JS file, not TS

//     tasks[`webWorkerMd5Task${index}`] = {
//       files: {
//         [newFileLocation]: newFileLocation
//       },
//       options: {
//         after: (fileChanges) => processMd5Change(fileChanges, webWorkerMap)
//       }
//     };
//   });

//   return tasks;
// })();


const commands = getWebWorkerShellCommands();
const { result } = concurrently(Object.values(commands), { maxProcesses: 4 })

result.then(() => {
  console.log('All web workers built');
}, (err) => {
  // console.log("Error: ", err);
});
