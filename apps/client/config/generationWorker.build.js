const fs = require('fs');
const md5File = require('md5-file');
const path = require('path');
const execSync = require('child_process').execSync;

const workersFolder = path.join(__dirname, '../dist/workers');
if (!fs.existsSync(workersFolder)) {
  fs.mkdirSync(workersFolder, { recursive: true });
}

const generateGenerationWorker = () => {
  const sourceFile = path.resolve(__dirname, '../dist-workers/src/core/generator/generation.worker.js');
  const fileHash = md5File.sync(sourceFile);
  const targetFile = `generation.worker-${fileHash}.js`;
  const command = `npx rollup -c ./config/rollup.generationWorker.js --config-src=${sourceFile} --config-target=./dist/workers/${targetFile}`;

  execSync(command, { stdio: 'inherit' });

  // lastly, generate the worker file map. This is generated within client/src so it's a standard file for the webpack build
  const mapFileContent = `/* eslint-disable */
// This file is auto-generated during the build process
export const generationWorker = ${JSON.stringify(targetFile, null, 2)}
`;

  fs.writeFileSync(path.join(__dirname, '../src/_generationWorker.ts'), mapFileContent, 'utf-8');
};

generateGenerationWorker();
