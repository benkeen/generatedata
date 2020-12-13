/* istanbul ignore file */

/**
 * A separate bundle of this file is created by the build and loaded separately. This allows the main utility code
 * to be shared by the core code and any web worker code. That can just importScripts() the build file and load
 * the utility code in the scope of the web worker (and not necessitate a separate request).
 */
import * as arrayUtils from './arrayUtils';
import * as countryUtils from './countryUtils';
import * as generalUtils from './generalUtils';
import * as randomUtils from './randomUtils';
import * as stringUtils from './stringUtils';
import * as numberUtils from './numberUtils';

// all utility methods are exposed to web worker generation files on the global scope under `utils`
const utils = {
	arrayUtils: { ...arrayUtils },
	countryUtils: { ...countryUtils },
	generalUtils: { ...generalUtils },
	randomUtils: { ...randomUtils },
	stringUtils: { ...stringUtils },
	numberUtils: { ...numberUtils }
};
