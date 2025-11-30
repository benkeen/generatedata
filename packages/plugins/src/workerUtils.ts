import * as arrayUtils from '@generatedata/utils/array';
// import * as countryUtils from '@generatedata/utils/country';
import * as generalUtils from '@generatedata/utils/general';
import * as numberUtils from '@generatedata/utils/number';
import * as randomUtils from '@generatedata/utils/random';
import * as stringUtils from '@generatedata/utils/string';

export type WorkerUtils = {
  arrayUtils: typeof arrayUtils;
  // countryUtils: typeof countryUtils;
  generalUtils: typeof generalUtils;
  randomUtils: typeof randomUtils;
  stringUtils: typeof stringUtils;
  numberUtils: typeof numberUtils;
};

const workerUtils: WorkerUtils = {
  arrayUtils: { ...arrayUtils },
  // countryUtils: { ...countryUtils },
  generalUtils: { ...generalUtils },
  randomUtils: { ...randomUtils },
  stringUtils: { ...stringUtils },
  numberUtils: { ...numberUtils }
};

export default workerUtils;
