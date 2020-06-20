import { DTMetadata, DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { countryList, CountryType } from '../../../_plugins';
import { getRandomArrayValue, generatePlaceholderStr } from '../../../utils/randomUtils';
import { loadCountryBundle } from '../../../utils/countryUtils';
import { CountryDataType, GetCountryData, Region } from '../../../../types/countries';


export const generate = (data: DTGenerationData): Promise<DTGenerateResult> => {
	const { rowState, countryI18n, existingRowData } = data;
	const { source, selectedCountries } = rowState;

	return new Promise((resolve) => {
		let country: CountryType;
		let regionRow: any;
		if (source === 'any') {
			country = getRandomArrayValue(countryList as CountryType[]);
		} else if (source === 'countries') {
			const list = selectedCountries.length ? selectedCountries : countryList;
			country = getRandomArrayValue(list);
		} else if (source === 'countryRow') {
			const countryRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
			country = countryRow!.data.countryDataType;
		} else {
			regionRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
			country = regionRow!.data.countryDataType;
		}

		loadCountryBundle(country)
			.then((getCountryData: GetCountryData) => {
				const countryData = getCountryData(countryI18n[country]);

				let selectedRegion: Region;
				if (regionRow) {
					selectedRegion = countryData.regions.find((i: Region) => i.regionName === regionRow!.data.display) as Region;
				} else {
					selectedRegion = getRandomArrayValue(countryData.regions);
				}

				resolve({
					display: getRegionPostalCode(countryData, selectedRegion)
				});
			});
	});
};


const getRegionPostalCode = (countryData: CountryDataType, region: Region): string => {
	let placeholders: any = {};
	let format: string = countryData.extendedData.zipFormat.format;

	if (countryData.extendedData.zipFormat.replacements) {
		placeholders = countryData.extendedData.zipFormat.replacements;
	}

	if (region.extendedData) {
		if (region.extendedData.zipFormat) {
			if (region.extendedData.zipFormat.format) {
				format = region.extendedData.zipFormat.format;
			}
			if (region.extendedData.zipFormat.replacements) {
				placeholders = {
					...placeholders,
					...region.extendedData.zipFormat.replacements
				};
			}
		}
	}

	const formats = format.split('|');
	const selectedFormat = getRandomArrayValue(formats);

	return generatePlaceholderStr(selectedFormat, placeholders);
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'infer'
	},
	sql: {
		field: 'varchar(10) default NULL',
		field_Oracle: 'varchar2(10) default NULL',
		field_MSSQL: 'VARCHAR(10) NULL'
	}
});
