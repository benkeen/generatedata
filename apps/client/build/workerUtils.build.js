const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');
const execSync = require('child_process').execSync;

const workersFolder = path.join(__dirname, '../dist/workers');
if (!fs.existsSync(workersFolder)) {
  fs.mkdirSync(workersFolder, { recursive: true });
}

const generateWorkerUtils = () => {
  const sourceFile = path.resolve(__dirname, '../dist/worker.js');
  const fileHash = md5File.sync(sourceFile);
  const targetFile = `workerUtils-${fileHash}.js`;
  const command = `npx rollup -c ./build/rollup.workers.js --config-src=${sourceFile} --config-target=./dist/workers/${targetFile}`;

  execSync(command, { stdio: 'inherit' });

  // lastly, generate the worker file map
  const workerFileMap = {
    workerUtils: targetFile
  };

  const mapFileContent = `// This file is auto-generated during the build process
export default ${JSON.stringify(workerFileMap, null, 2)};
`;

  fs.writeFileSync(
    path.join(__dirname, '../dist/workers/workerFileMap.js'),
    mapFileContent,
    'utf-8'
  );  
};

generateWorkerUtils();
