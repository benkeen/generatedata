import { countryList } from '../../../../_plugins';
import { getRandomArrayValue } from '~utils/randomUtils';
import { DTGenerateResult, DTGenerationData, DTOnMessage } from '~types/dataTypes';
import { Region, CountryType } from '~types/countries';

const countryRegions: any = {};

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { rowState, countryData, existingRowData } = data;

	let country: CountryType;

	if (rowState.source === 'row') {
		const countryRow = existingRowData.find(({ id }: any) => id === rowState.targetRowId);
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
		const selectedCountryData = countryData[country];

		countryRegions[country] = {
			full: selectedCountryData.regions.map((i: Region) => i.regionName),
			short: selectedCountryData.regions.map((i: Region) => i.regionShort)
		};

		return {
			display: getRandomArrayValue(countryRegions[country].full),
			countryDataType: country
		};
	}
};

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};
