/**
 * This file contains the subset of utility methods made available to the data generation code. It defines a WorkerUtils
 * type which is used by both the node + web worker code.
 *
 * Web Workers are fussy. To share these utility methods, the core script generates a worker file which is loaded
 * via importScripts() within any plugin worker and the methods are loaded as a global in the worker scope.
 */
import arrayUtils from '@generatedata/utils/array';
import countryUtils from '@generatedata/utils/country';
import generalUtils from '@generatedata/utils/general';
import randomUtils from '@generatedata/utils/random';
import stringUtils from '@generatedata/utils/string';
import numberUtils from '@generatedata/utils/number';

export type WorkerUtils = {
  arrayUtils: typeof arrayUtils;
  countryUtils: typeof countryUtils;
  generalUtils: typeof generalUtils;
  randomUtils: typeof randomUtils;
  stringUtils: typeof stringUtils;
  numberUtils: typeof numberUtils;
};

// all utility methods are exposed to web worker generation files on the global scope under `utils`
const utils = {
  arrayUtils: { ...arrayUtils },
  countryUtils: { ...countryUtils },
  generalUtils: { ...generalUtils },
  randomUtils: { ...randomUtils },
  stringUtils: { ...stringUtils },
  numberUtils: { ...numberUtils }
};
