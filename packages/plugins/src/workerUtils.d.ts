import arrayUtils from '@generatedata/utils/array';
import countryUtils from '@generatedata/utils/country';
import generalUtils from '@generatedata/utils/general';
import numberUtils from '@generatedata/utils/number';
import randomUtils from '@generatedata/utils/random';
import stringUtils from '@generatedata/utils/string';

export type WorkerUtils = {
  arrayUtils: typeof arrayUtils;
  countryUtils: typeof countryUtils;
  generalUtils: typeof generalUtils;
  randomUtils: typeof randomUtils;
  stringUtils: typeof stringUtils;
  numberUtils: typeof numberUtils;
};
