import fullCountryList from './fullCountryList';
import { countryList } from '../../../../_plugins';
import { CountryState } from './Country.state';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { CountryType } from '~types/countries';
import { WorkerUtils } from '~utils/workerUtils';

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
