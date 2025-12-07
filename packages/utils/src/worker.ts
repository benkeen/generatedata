/**
 * This is a special file. It provides a subset of the utility methods for web workers - both the Core generator worker and
 * all plugin workers.
 *
 * The build process bundles the content of this file and generates a workerUtils.js file, and the
 * helpers here are passed to the plugins. The direct imports in the [plugin].worker.ts files are stripped out when they're bundled
 * into the final worker files, and the export here is also stripped. The `utils` var here remains in the final worker.js file -
 * that's how the workers access these helper functions.
 */
import * as arrayUtils from './array';
// import * as countryUtils from '@generatedata/utils/country';
import * as generalUtils from './general';
import * as numberUtils from './number';
import * as randomUtils from './random';
import * as stringUtils from './string';

export type WorkerUtils = {
  arrayUtils: typeof arrayUtils;
  // countryUtils: typeof countryUtils;
  generalUtils: typeof generalUtils;
  randomUtils: typeof randomUtils;
  stringUtils: typeof stringUtils;
  numberUtils: typeof numberUtils;
};

const utils: WorkerUtils = {
  arrayUtils: { ...arrayUtils },
  // countryUtils: { ...countryUtils },
  generalUtils: { ...generalUtils },
  randomUtils: { ...randomUtils },
  stringUtils: { ...stringUtils },
  numberUtils: { ...numberUtils }
};

export default utils;
