#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs/yargs');
const colors = require('ansi-colors');
const cliProgress = require('cli-progress');
const { hideBin } = require('yargs/helpers');
const { generate } = require('../dist');
const { getConfigFile, applyAndValidateCommandLineArgs } = require(path.resolve(__dirname, '../src/utils/bin'));
const args = yargs(hideBin(process.argv)).argv;

let configFileContent = getConfigFile(args, process.exit);
configFileContent = applyAndValidateCommandLineArgs(args, configFileContent, process.exit);


const progressBar = new cliProgress.SingleBar({
	format: 'Generating |' + colors.grey('{bar}') + '| {percentage}% || {value}/{total} rows',
	barCompleteChar: '\u2588',
	barIncompleteChar: '\u2591',
	hideCursor: true
});

const numResults = configFileContent.generationSettings.numResults;
progressBar.start(numResults, 0);

generate(configFileContent, {
	onBatchComplete: ({ numGeneratedRows, isLastBatch }) => {
		progressBar.update(numGeneratedRows);

		if (isLastBatch) {
			progressBar.stop();
		}
	}
});

/*
const file = fs.createWriteStream('path/to/file');
  file.write("...");
}
file.end();
*/
