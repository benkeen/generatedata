/**
 * This contains an example configuration for your generatedata installation. It's the first thing you have to do when
 * cloning the repo and setting it up:
 * 1. Make a copy of this file and call it `config.ts` (put it in the same folder)
 * 2. Customize the settings to whatever you want.
 *
 * Until the config.ts file is created, you won't be able to build the application for local use.
 */
import defaultConfiguration from './defaults';
import type { GenerateDataConfig } from './types';

const config: GenerateDataConfig = {
  ...defaultConfiguration
};
