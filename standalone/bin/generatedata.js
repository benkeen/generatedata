#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const colors = require('ansi-colors');
const cliProgress = require('cli-progress');
const { hideBin } = require('yargs/helpers');
const { generate } = require('../dist');

const args = yargs(hideBin(process.argv)).argv;

const configFileContent = {}; // getConfigFile();


// users can override any of the options in the generationSettings section of the template by passing them as query params
const generationSettings = {
    target: 'file',
    ...configFileContent.generationSettings
};

// awkward. Wanted to just valid the schema in one go after overriding whatever the user wants, but we also need to do
// it here because we need to cast the strings... which means checking it first.
if (args.numResults && /^\d+$/.test(args.numResults)) {
    generationSettings.numResults = parseInt(args.numResults, 10);
}

if (args.locale) {
    if (args.locale.indexOf(args.locale) === -1) {
        console.error('Invalid locale. Please enter one of the following values: ', args.locale);
        process.exit(1);
    }
}

// TODO validate data structure - requires converting the type to JSON schema

return;

// locale?: GDLocale;
// stripWhitespace?: boolean;
// target?: 'file' | 'output';
//
// // the default behaviour for the ppm package is for the generate method to return the generated data. This option
// // lets users generate a file instead. It's far better for larger data sets
// filename?: string; // the filename to generate including relative path
// packetSize?: number; // TODO needed?



const progressBar = new cliProgress.SingleBar({
    format: 'Generating |' + colors.grey('{bar}') + '| {percentage}% || {value}/{total} rows',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const updatedConfigFile = {
    ...configFileContent,
    generationSettings
};

const numResults = configFileContent.generationSettings.numResults;
progressBar.start(numResults, 0);

generate(updatedConfigFile, {
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
