import utils from '../../../utils';
import { DTGenerateResult, DTGenerationData, DTGenerationExistingRowData, DTOnMessage } from '~types/dataTypes';
import { Region, CountryType } from '~types/countries';
import { countryList } from '../../../../_plugins';
import { CityState, RegionSource } from './City';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { rowState } = data;
	const { source, selectedCountries } = rowState as CityState;

	let country: CountryType;
	let regionRow: any;
	if (source === RegionSource.regionRow) {
		regionRow = data.existingRowData.find(({ id }: DTGenerationExistingRowData) => id === rowState.targetRowId);
		country = regionRow!.data.countryDataType;
	} else if (source === RegionSource.any) {
		country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
	} else {
		const list = rowState.selectedCountries.length ? selectedCountries : countryList;
		country = utils.randomUtils.getRandomArrayValue(list) as CountryType;
	}

	// this can occur if the user hasn't configured the region DT properly
	if (!country) {
		return { display: '' };
	}

	const countryData = data.countryData[country];

	let selectedRegion;
	if (regionRow) {
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

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};
