import { DTGenerateResult, DTGenerationData, DTMetadata } from '~types/dataTypes';
import { countryList, CountryType } from '../../../_plugins';
import { getRandomArrayValue } from '~utils/randomUtils';


const countryRegions: any = {};

export const generate = (data: any): DTGenerateResult => {
	const { rowState, countryI18n } = data;

	let country: CountryType;

	if (rowState.source === 'row') {
		const countryRow = data.existingRowData.find(({ id }) => id === rowState.targetRowId);
		country = countryRow!.data.countryDataType;
	} else {
		const list = rowState.source === 'any' ? countryList : rowState.selectedCountries;
		country = getRandomArrayValue(list);
	}

	if (countryRegions[country]) {
		return {
			display: getRandomArrayValue(countryRegions[country].full),
			countryDataType: country
		};
	} else {

		const countryData = getCountryData(countryI18n[country]);
		countryRegions[country] = {
			full: countryData.regions.map((i) => i.regionName),
			short: countryData.regions.map((i) => i.regionShort)
		};
		return {
			display: getRandomArrayValue(countryRegions[country].full),
			countryDataType: country
		};
	}
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(50) default NULL',
		field_Oracle: 'varchar2(50) default NULL',
		field_MSSQL: 'VARCHAR(50) NULL'
	}
});
