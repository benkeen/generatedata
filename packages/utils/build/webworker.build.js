const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');

const workersFolder = path.join(__dirname, '../dist/workers');
if (!fs.existsSync(workersFolder)) {
  fs.mkdirSync(workersFolder, { recursive: true });
}

const generateWorkers = () => {
//   const workQueue = [
//     ...getWorkQueue('dataType'),
//     ...getWorkQueue('exportType')
//   ];

//   // declare module '@generatedata/plugins/workerFileMap';
  
//   // lastly, generate the worker file map
//   const workerFileMap = {};
//   workQueue.forEach((item) => {
//     let key = item.pluginType === 'dataType' ? 'dataTypes' : 'exportTypes';
//     if (!workerFileMap[key]) {
//       workerFileMap[key] = {};
//     }
//     workerFileMap[key][item.plugin] = item.targetFile;
//   });

//   const mapFileContent = `// This file is auto-generated during the build process
// export default ${JSON.stringify(workerFileMap, null, 2)};
// `;

//   fs.writeFileSync(
//     path.join(__dirname, '../dist/workers/workerFileMap.js'),
//     mapFileContent,
//     'utf-8'
//   );  
};

generateWorker();
