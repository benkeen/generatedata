import path from 'path';
import fs from 'fs';

type BinCommandArgs = {
    config: string;
}

export const getConfigFile = (args: BinCommandArgs, exit: any) => {
    // check for required --config parameter
    if (!args.config) {
        console.error('Missing --config argument.');
        exit(1);
    }

    // check it's a JSON file
    if (!(/.json$/.test(args.config))) {
        console.error('Invalid configuration file. Please supply a path to a .json file.');
        exit(1);
    }

    // check the file exists
    const configFile = path.resolve(__dirname, args.config);
    if (!fs.existsSync(configFile)) {
        console.error('Unable to find configuration file at this location: ', configFile);
        exit(1);
    }

    let configFileContent;
    try {
        configFileContent = require(configFile);
    } catch (e) {
        console.error('Unable to read configuration file. Please check it\'s a valid JSON file');
        exit(1);
    }

    return configFileContent;
}
