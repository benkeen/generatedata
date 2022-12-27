import { CityState, RegionSource } from './City';
import { CountryType, Region } from '~types/countries';
import { DTGenerateResult, DTGenerationExistingRowData, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';
import { countryList } from '../../../../_plugins';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
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
