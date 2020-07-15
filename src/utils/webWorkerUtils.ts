/**
 * A separate bundle of this file is created by the build and loaded separately. This allows the main utility code
 * to be shared by the core code and any web worker code. That can just importScripts() the build file and load
 * the utility code in the scope of the web worker (and not necessitate a separate request).
 */
import * as arrayUtils from './arrayUtils';
import * as countryUtils from './countryUtils';
import * as generalUtils from './generalUtils';
import * as generationUtils from './generationUtils';
import * as randomUtils from './randomUtils';
import * as stringUtils from './stringUtils';

// all utility methods are exposed to web worker generation files on the global scope under `utils`
const utils = {
	arrayUtils: { ...arrayUtils },
	countryUtils: { ...countryUtils },
	generalUtils: { ...generalUtils },
	generationUtils: { ...generationUtils },
	randomUtils: { ...randomUtils },
	stringUtils: { ...stringUtils }
};

// TODO also need to expose CUSTOM stuff that each plugin wants to expose

// TODO can we generate a typings file from this?
