/**
 * This file contains the subset of utility methods made available to the data generation code. It defines a WorkerUtils
 * type which is used by both the node + web worker code.
 *
 * Web Workers are fussy. To share these utility methods, the core script generates a worker file which is loaded
 * via importScripts() within any plugin worker and the methods are loaded as a global within the worker scope.
 */
import utilities from '@generatedata/utils';

export type WorkerUtils = {
  arrayUtils: typeof utilities.arrayUtils;
  countryUtils: typeof utilities.countryUtils;
  generalUtils: typeof utilities.generalUtils;
  randomUtils: typeof utilities.randomUtils;
  stringUtils: typeof utilities.stringUtils;
  numberUtils: typeof utilities.numberUtils;
};

// all utility methods are exposed to web worker generation files on the global scope under `utils`
const utils = {
  arrayUtils: { ...utilities.arrayUtils },
  countryUtils: { ...utilities.countryUtils },
  generalUtils: { ...utilities.generalUtils },
  randomUtils: { ...utilities.randomUtils },
  stringUtils: { ...utilities.stringUtils },
  numberUtils: { ...utilities.numberUtils }
};
