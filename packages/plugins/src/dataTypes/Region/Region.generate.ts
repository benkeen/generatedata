import { Region } from '@generatedata/types';
import randomUtils from '@generatedata/utils/random';
import { countryList, CountryType, DTGenerateResult, DTGenerationData } from '../../';
import { RegionFormat } from './Region.state';

// used for caching purposes
const countryRegions: any = {};

export const generate = (data: DTGenerationData): DTGenerateResult => {
  const { rowState, countryData, existingRowData } = data;

  let country: CountryType;

  if (rowState.source === 'countryRow') {
    const countryRow = existingRowData.find(({ id }: any) => id === rowState.targetRowId);
    country = countryRow!.data.countryDataType;
  } else {
    const list = rowState.source === 'anyRegion' ? countryList : rowState.selectedCountries;
    country = randomUtils.getRandomArrayValue(list);
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

  const displayFormat = randomUtils.getRandomArrayValue(rowState.formats) as RegionFormat;
  if (countryRegions[country]) {
    return {
      display: randomUtils.getRandomArrayValue(countryRegions[country][displayFormat]),
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
      display: randomUtils.getRandomArrayValue(countryRegions[country][displayFormat]),
      displayFormat,
      countryDataType: country
    };
  }
};
