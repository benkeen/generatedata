/**
 * Utility methods for the command line binary.
 */
import path from 'path';
import fs from 'fs';
import { GDTemplate } from '~types/generator';
import { GDLocale } from '~types/general';

type BinCommandArgs = {
    config?: string;
    numResults?: string;
    locale?: string;
    stripWhitespace?: string;
}

export const msgs = {
    missingConfigArg: 'Missing --config argument.',
    invalidConfigFileFormat: 'Invalid configuration file. Please supply a path to a .json file',
    configFileNotFound: 'Unable to find configuration file at this location: ',
    invalidConfigFileContent: 'Unable to read configuration file. Please check it\'s a valid JSON file.',
    invalidNumResultsArg: 'Invalid --numResults value. Please pass a numeric value > 0',
    invalidLocale: 'Invalid locale. Please enter one of the following values: ',
    invalidStripWhitespace: 'Please only enter a true or false value for the --stripWhitespace argument.'
};

export const getConfigFile = (args: BinCommandArgs, exit: any): GDTemplate | undefined => {
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

    let configFileContent: GDTemplate;
    try {
        configFileContent = require(configFile);
    } catch (e) {
        console.error(msgs.invalidConfigFileContent);
        exit(1);
        return;
    }

    return configFileContent;
}

export const applyAndValidateCommandLineArgs = (args: BinCommandArgs, configFileContent: GDTemplate, exit: any) => {

    // users can override any of the options in the generationSettings section of the template by passing them as query params
    const generationSettings = {
        target: 'file',
        ...configFileContent.generationSettings
    };

    if (args.numResults) {
        if (!(/^\d+$/.test(args.numResults || ''))) {
            console.error(msgs.invalidNumResultsArg);
            exit(1);
            return;
        }
        generationSettings.numResults = parseInt(args.numResults, 10);
    }

    if (args.locale) {
        if (args.locale.indexOf(args.locale) === -1) {
            console.error(msgs.invalidLocale, args.locale);
            exit(1);
            return;
        }
        generationSettings.locale = args.locale as GDLocale;
    }

    if (args.stripWhitespace) {
        if (args.stripWhitespace !== 'true' && args.stripWhitespace !== 'false') {
            console.error(msgs.invalidStripWhitespace);
            exit(1);
            return;
        }
        generationSettings.stripWhitespace = args.stripWhitespace === 'true';
    }


    // // the default behaviour for the ppm package is for the generate method to return the generated data. This option
    // // lets users generate a file instead. It's far better for larger data sets
    // filename?: string; // the filename to generate including relative path

    return generationSettings;
}
