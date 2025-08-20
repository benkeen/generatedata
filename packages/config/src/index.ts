// these will be invalid until the files have been created, but the `build` command will check they exist before attempting a tsc build. See the README.
export { default as clientConfig } from './client.config';
export { default as serverConfig } from './server.config';
export { default as constants } from './constants';
