import { Region } from '~typings/countries';
import type { WorkerUtils } from '@generatedata/utils/worker';
import { countryList, CountryType, DTGenerateResult, DTGenerationData } from '../../';
import { RegionFormat } from './Region.state';

// used for caching purposes
const countryRegions: any = {};

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { rowState, countryData, existingRowData } = data;

  let country: CountryType;

  if (rowState.source === 'countryRow') {
    const countryRow = existingRowData.find(({ id }: any) => id === rowState.targetRowId);
    country = countryRow!.data.countryDataType;
  } else {
    const list = rowState.source === 'anyRegion' ? countryList : rowState.selectedCountries;
    country = utils.randomUtils.getRandomArrayValue(list);
  }

  if (!country) {
    return {
      display: '',
      countryDataType: ''
    };
  }

  if (!rowState.formats.length) {
    return {
      display: '',
      displayFormat: '',
      countryDataType: country
    };
  }

  const displayFormat = utils.randomUtils.getRandomArrayValue(rowState.formats) as RegionFormat;
  if (countryRegions[country]) {
    return {
      display: utils.randomUtils.getRandomArrayValue(countryRegions[country][displayFormat]),
      displayFormat,
      countryDataType: country
    };
  } else {
    const selectedCountryData = countryData[country];

    countryRegions[country] = {
      full: selectedCountryData.regions.map((i: Region) => i.regionName),
      short: selectedCountryData.regions.map((i: Region) => i.regionShort)
    };

    return {
      display: utils.randomUtils.getRandomArrayValue(countryRegions[country][displayFormat]),
      displayFormat,
      countryDataType: country
    };
  }
};
