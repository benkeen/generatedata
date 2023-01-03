import path from 'path';
import fs from 'fs';

export const getConfigFile = (args) => {
    // check for required --config parameter
    if (!args.config) {
        console.error('Missing --config argument.');
        process.exit(1);
    }

    // check it's a JSON file
    if (!(/.json$/.test(args.config))) {
        console.error('Invalid configuration file. Please supply a path to a .json file.');
        process.exit(1);
    }

    // check the file exists
    const configFile = path.resolve(__dirname, args.config);
    if (!fs.existsSync(configFile)) {
        console.error('Unable to find configuration file at this location: ', configFile);
        process.exit(1);
    }

    let configFileContent;
    try {
        configFileContent = require(configFile);
    } catch (e) {
        console.error('Unable to read configuration file. Please check it\'s a valid JSON file');
        process.exit(1);
    }

    return configFileContent;
}
