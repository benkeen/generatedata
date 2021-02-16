import { countryList } from '../../../../_plugins';
import { getRandomArrayValue } from '~utils/randomUtils';
import { DTGenerateResult, DTGenerationData, DTOnMessage } from '~types/dataTypes';
import { Region, CountryType } from '~types/countries';
import { RegionFormat } from './Region';

// used for caching purposes
const countryRegions: any = {};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { rowState, countryData, existingRowData } = data;

	let country: CountryType;

	if (rowState.source === 'countryRow') {
		const countryRow = existingRowData.find(({id}: any) => id === rowState.targetRowId);
		country = countryRow!.data.countryDataType;
	} else {
		const list = rowState.source === 'anyRegion' ? countryList : rowState.selectedCountries;
		country = getRandomArrayValue(list);
	}

	if (!country) {
		return {
			display: '',
			country: ''
		};
	}

	if (countryRegions[country]) {
		return {
			display: getDisplayValue(countryRegions[country], rowState.formats),
			countryDataType: country
		};
	} else {
		const selectedCountryData = countryData[country];

		countryRegions[country] = {
			full: selectedCountryData.regions.map((i: Region) => i.regionName),
			short: selectedCountryData.regions.map((i: Region) => i.regionShort)
		};

		return {
			display: getDisplayValue(countryRegions[country], rowState.formats),
			countryDataType: country
		};
	}
};

export const getDisplayValue = (countryData: any, formats: RegionFormat[]): string => {
	const format = getRandomArrayValue(formats);
	return getRandomArrayValue(countryData[format]);
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};
