/* istanbul ignore file */

/**
 * This file contains the subset of utility methods made available to the data generation code. It defines a WorkerUtils
 * type which is used by both the node + web worker code.
 *
 * Web Workers are fussy. To share these utility methods, the core script generates a worker file which is loaded
 * via importScripts() within any plugin worker and the methods are loaded as a global within the worker scope.
 */
import * as arrayUtils from './arrayUtils';
import * as countryUtils from './countryUtils';
import * as generalUtils from './generalUtils';
import * as randomUtils from './randomUtils';
import * as stringUtils from './stringUtils';
import * as numberUtils from './numberUtils';

export type WorkerUtils = {
	arrayUtils: typeof arrayUtils;
	countryUtils: typeof countryUtils;
	generalUtils: typeof generalUtils;
	randomUtils: typeof randomUtils;
	stringUtils: typeof stringUtils;
	numberUtils: typeof numberUtils;
}

// all utility methods are exposed to web worker generation files on the global scope under `utils`
const utils = {
	arrayUtils: { ...arrayUtils },
	countryUtils: { ...countryUtils },
	generalUtils: { ...generalUtils },
	randomUtils: { ...randomUtils },
	stringUtils: { ...stringUtils },
	numberUtils: { ...numberUtils }
};
