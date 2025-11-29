import { CountryType } from '~types/countries';
import { DTGenerateResult, DTGenerationData, WorkerUtils } from '../../';
import { countryList } from '../../../../_plugins';
import { CountryState } from './Country.state';
import fullCountryList from './fullCountryList';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
  const { rowState, countryData } = data;
  const { source, selectedCountries } = rowState as CountryState;

  const hasFilteredCountryList = selectedCountries && selectedCountries.length > 0;

  if (source === 'all') {
    return {
      display: utils.randomUtils.getRandomArrayValue(hasFilteredCountryList ? selectedCountries : fullCountryList)
    };
  } else {
    const randomCountry = utils.randomUtils.getRandomArrayValue(hasFilteredCountryList ? selectedCountries : countryList) as CountryType;
    const randomCountryData = countryData[randomCountry];

    return {
      display: randomCountryData.countryName,
      slug: randomCountryData.countrySlug,
      countryDataType: randomCountry
    };
  }
};
