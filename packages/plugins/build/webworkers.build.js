/**
 * This script is called as part of the main package build command. It generates the following;
 * - dist/workers/* - worker files for all data types + export types + core workers
 */
const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');
const concurrently = require('concurrently');

// this script outputs a ton of logs, and sometimes it's hard to make sense of. Pass a --filter argument to only build a specific worker
// (note it's case sensitive)
// example:
//    npm run generate-web-workers -- --filter=Company
const filter = process.argv.indexOf('--filter') !== -1 ? process.argv[process.argv.indexOf('--filter') + 1] : null;

const workersFolder = path.join(__dirname, '../dist/workers');
if (!fs.existsSync(workersFolder)) {
  fs.mkdirSync(workersFolder, { recursive: true });
}

const getScopedWorkerFilename = (file, workerType) => {
  let fileWithoutExt = path.basename(file, path.extname(file));

  let prefix = '';
  if (workerType === 'dataType') {
    prefix = 'DT-';
  } else if (workerType === 'exportType') {
    prefix = 'ET-';
  }

  return `${prefix}${fileWithoutExt}.js`;
};

const getWorkQueue = (pluginType) => {
  const baseFolder = pluginType === 'dataType' ? '../dist/dataTypes' : '../dist/exportTypes';
  const baseFolderAbsPath = path.resolve(__dirname, baseFolder);
  const folders = fs.readdirSync(baseFolderAbsPath);
  
  const map = [];
  folders.forEach((folder) => {
    const sourceFile = `${baseFolderAbsPath}/${folder}/${folder}.worker.js`;

    if (!fs.existsSync(sourceFile)) {
      return;
    }

    if (filter && folder.indexOf(filter) === -1) {
      return;
    }
    
    const fileHash = md5File.sync(sourceFile);
    const targetFile = getScopedWorkerFilename(`${folder}.worker-${fileHash}.js`, pluginType);
    map.push({
      plugin: folder,
      pluginType,
      targetFile,
      command: `npx rollup -c ./build/rollup.workers.js --config-src=${sourceFile} --config-target=./dist/workers/${targetFile}`
    });
  });

  return map;
};

const generateWorkers = () => {
  const workQueue = [
    ...getWorkQueue('dataType'),
    ...getWorkQueue('exportType')
  ];

  const commands = workQueue.map((item) => ({ command: item.command }))
  const { result } = concurrently(commands, { maxProcesses: 4 })
  result.then(() => {
    console.log('All web workers built');
  }, (err) => {
    console.log("Error generating plugin web worker(s): ", err);
    process.exit(1);
  });
  
  // lastly, generate the worker file map and typings file
  const workerPluginsFileMap = {};
  workQueue.forEach((item) => {
    let key = item.pluginType === 'dataType' ? 'dataTypes' : 'exportTypes';
    if (!workerPluginsFileMap[key]) {
      workerPluginsFileMap[key] = {};
    }
    workerPluginsFileMap[key][item.plugin] = item.targetFile;
  });

  const mapFileContent = `// This file is auto-generated during the build process
export default ${JSON.stringify(workerPluginsFileMap, null, 2)};
`;

  fs.writeFileSync(
    path.join(__dirname, '../dist/workers/workerPluginsFileMap.js'),
    mapFileContent,
    'utf-8'
  );

  const typingsFileContent = `// This file is auto-generated during the build process
import type { DataType, ExportType } from '../';

declare const _workerPluginsFileMap: {
  dataTypes: {
    [key: DataType]: string;
  };
  exportTypes: {
    [key: ExportType]: string;
  };
};
export default _workerPluginsFileMap;
`;

  fs.writeFileSync(
    path.join(__dirname, '../dist/workers/workerPluginsFileMap.d.ts'),
    typingsFileContent,
    'utf-8'
  );
};

generateWorkers();
