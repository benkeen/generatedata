import utils from '../../../utils';
import { DTGenerateResult } from '~types/dataTypes';
import { Region } from '~types/countries';
import { countryList, CountryType } from '../../../_plugins';

export const generate = (data: any): DTGenerateResult => { // DTGenerationData
	const { rowState } = data;
	const { source, selectedCountries } = rowState;

	let country: CountryType;
	let regionRow: any;
	if (source === 'row') {
		regionRow = data.existingRowData.find(({ id }: any) => id === rowState.targetRowId);
		country = regionRow!.data.countryDataType;
	} else if (source === 'any') {
		country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
	} else {
		const list = rowState.selectedCountries.length ? selectedCountries : countryList;
		country = utils.randomUtils.getRandomArrayValue(list);
	}

	const countryData = data.countryData[country];

	let selectedRegion;
	if (regionRow) {
		selectedRegion = countryData.regions.find((i: Region) => i.regionName === regionRow!.data.display);
	} else {
		selectedRegion = utils.randomUtils.getRandomArrayValue(countryData.regions);
	}

	return {
		display: utils.randomUtils.getRandomArrayValue(selectedRegion!.cities)
	};
};

let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};
