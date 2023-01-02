#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const colors = require('ansi-colors');
const cliProgress = require('cli-progress');
const { hideBin } = require('yargs/helpers');
const { generate } = require('../dist');

const args = yargs(hideBin(process.argv)).argv;

// check for required --config parameter
if (!args.config) {
    console.error('Missing --config argument.');
    return;
}

// check the file exists
const configFile = path.resolve(__dirname, args.config);
if (!fs.existsSync(configFile)) {
    console.error('Unable to find configuration file at this location: ', configFile);
    return;
}

// TODO validate data structure

const configFileContent = require(configFile);

// users can override any of the options in the generationSettings section of the template by passing them as query params
const generationSettings = {
    target: 'file',
    ...configFileContent.generationSettings
};

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
            console.log("output.");
        }
    }
});
/*
const file = fs.createWriteStream('path/to/file');
  file.write("...");
}
file.end();
*/
