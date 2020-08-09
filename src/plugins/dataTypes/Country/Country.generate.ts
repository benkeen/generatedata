import fullCountryList from './fullCountryList';
import { countryList, CountryType } from '../../../_plugins';
import { CountryState } from './Country';
import { getRandomArrayValue } from '~utils/randomUtils';
import { loadCountryBundle } from '~utils/countryUtils';
import { GetCountryData } from '~types/countries';
import { DTGenerateResult, DTGenerationData, DTMetadata } from '~types/dataTypes';


export const generate = (data: DTGenerationData): Promise<DTGenerateResult> => {
	return new Promise((resolve) => { // TODO error clause
		const { rowState, countryI18n } = data;
		const { source, selectedCountries } = rowState as CountryState;

		const hasFilteredCountryList = selectedCountries.length > 0;

		if (source === 'all') {
			resolve({
				display: getRandomArrayValue(hasFilteredCountryList ? selectedCountries : fullCountryList)
			});
		} else {
			const randomCountry = getRandomArrayValue(hasFilteredCountryList ? selectedCountries : countryList) as CountryType;

			loadCountryBundle(randomCountry)
				.then((getData: GetCountryData) => {
					const data = getData(countryI18n[randomCountry]);
					resolve({
						display: data.countryName,
						slug: data.countrySlug,
						countryDataType: randomCountry
					});
				});
		}
	});
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});
