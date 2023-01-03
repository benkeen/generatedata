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
