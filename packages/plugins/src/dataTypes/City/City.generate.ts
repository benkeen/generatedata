import { CityState, RegionSource, RegionSourceEnum } from './City.state';
import { CountryType, Region } from '~types/countries';
import { DTGenerateResult, DTGenerationExistingRowData, DTGenerationData } from '~types/dataTypes';
import { WorkerUtils } from '~utils/workerUtils';
import { countryList } from '../../../../_plugins';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { rowState } = data;
	const { source, selectedCountries } = rowState as CityState;

	let country: CountryType;
	let regionRow: any;
	if (source === RegionSourceEnum.regionRow) {
		regionRow = data.existingRowData.find(({ id }: DTGenerationExistingRowData) => id === rowState.targetRowId);
		country = regionRow!.data.countryDataType;
	} else if (source === RegionSourceEnum.any) {
		country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
	} else {
		const list = rowState.selectedCountries.length ? selectedCountries : countryList;
		country = utils.randomUtils.getRandomArrayValue(list as string[]) as CountryType;
	}

	// this can occur if the user hasn't configured the region DT properly
	if (!country) {
		return { display: '' };
	}

	const countryData = data.countryData[country];

	let selectedRegion;
	if (regionRow) {
		// check the user fully filled out the region row. If the didn't include a display format, it'll be incomplete
		if (!regionRow.data.displayFormat || !regionRow.data.display) {
			return { display: '' };
		}
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
