import { Region } from '~types/countries';
import type { WorkerUtils } from '@generatedata/utils/worker';
import { countryList, type CountryType, type DTGenerateResult, type DTGenerationData, type DTGenerationExistingRowData } from '../../';
import { CityState } from './City.state';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { rowState } = data;
  const { source, selectedCountries } = rowState as CityState;

  let country: CountryType;
  let regionRow: any;
  if (source === 'regionRow') {
    regionRow = data.existingRowData.find(({ id }: DTGenerationExistingRowData) => id === rowState.targetRowId);
    country = regionRow!.data.countryDataType;
  } else if (source === 'any') {
    country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
  } else {
    const list = rowState.selectedCountries.length ? selectedCountries : countryList;
    country = utils.randomUtils.getRandomArrayValue(list as string[]) as CountryType;
  }

  // this can occur if the user hasn't configured the region DT properly
  if (!country) {
    return { display: '' };
  }

  const countryData = data.countryData[country];

  let selectedRegion;
  if (regionRow) {
    // check the user fully filled out the region row. If the didn't include a display format, it'll be incomplete
    if (!regionRow.data.displayFormat || !regionRow.data.display) {
      return { display: '' };
    }
    selectedRegion = countryData.regions.find((i: Region) => {
      if (regionRow.data.displayFormat === 'short') {
        return i.regionShort === regionRow.data.display;
      }
      return i.regionName === regionRow.data.display;
    });
  } else {
    selectedRegion = utils.randomUtils.getRandomArrayValue(countryData.regions);
  }

  return {
    display: utils.randomUtils.getRandomArrayValue(selectedRegion.cities)
  };
};
