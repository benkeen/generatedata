import * as arrayUtils from './array';
import * as generalUtils from './general';
import * as langUtils from './lang';
import * as numberUtils from './number';
import * as randomUtils from './random';
import * as stringUtils from './string';

export default {
  arrayUtils: { ...arrayUtils },
  langUtils: { ...langUtils },
  generalUtils: { ...generalUtils },
  randomUtils: { ...randomUtils },
  stringUtils: { ...stringUtils },
  numberUtils: { ...numberUtils }
};

export * as arrayUtils from './array';
export * as generalUtils from './general';
export * as langUtils from './lang';
export * as numberUtils from './number';
export * as randomUtils from './random';
export * as stringUtils from './string';

export { WeightedOptions } from './random';
