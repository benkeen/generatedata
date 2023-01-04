/**
 * Utility methods for the command line binary.
 */
import path from 'path';
import fs from 'fs';

type BinCommandArgs = {
    config?: string;
}

export const msgs = {
    missingConfigArg: 'Missing --config argument.',
    invalidConfigFileFormat: 'Invalid configuration file. Please supply a path to a .json file',
    configFileNotFound: 'Unable to find configuration file at this location: ',
    invalidConfigFileContent: 'Unable to read configuration file. Please check it\'s a valid JSON file.'
};

export const getConfigFile = (args: BinCommandArgs, exit: any) => {
    // check for required --config parameter
    if (!args.config) {
        console.error(msgs.missingConfigArg);
        exit(1);
        return;
    }

    // check it's a JSON file
    if (!(/.json$/.test(args.config || ''))) {
        console.error(msgs.invalidConfigFileFormat);
        exit(1);
        return;
    }

    // check the file exists
    const configFile = path.resolve(__dirname, args.config || '');
    if (!fs.existsSync(configFile)) {
        console.error(msgs.configFileNotFound, configFile);
        exit(1);
        return;
    }

    let configFileContent;
    try {
        configFileContent = require(configFile);
    } catch (e) {
        console.error(msgs.invalidConfigFileContent);
        exit(1);
        return;
    }

    return configFileContent;
}

export const applyAndValidateCommandLineArgs = (args, configFileContent, exit) => {
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
            exit(1);
            return;
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

}
