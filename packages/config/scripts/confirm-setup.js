/**
 * This is the base configuration package used by the rest of the application and must be configured first in order
 * to build the application. See the instructions in this package's README on how to get set up.
 *
 * This script runs during the build command to verify that they've set up the config files. If not, it'll halt the build
 * process and output a message telling them what do do.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (
  !fs.existsSync(path.resolve(__dirname, '../src/client.config.ts')) ||
  !fs.existsSync(path.resolve(__dirname, '../src/server.config.ts'))
) {
  console.error(
    'Build cancelled! Please create the two configuration files in order to proceed. See here for the documentation:\nhttps://github.com/benkeen/generatedata/tree/master/packages/config\n'
  );
  process.exit(1);
}
