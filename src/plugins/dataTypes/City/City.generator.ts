import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { loadCountryBundle } from '~utils/countryUtils';
import { GetCountryData, Region } from '~types/countries';
import { getRandomArrayValue } from '~utils/randomUtils';
import { countryList, CountryType } from '../../../_plugins';

export const generate = (data: DTGenerationData): Promise<DTGenerateResult> => {
	const { rowState, countryI18n } = data;
	const { source, selectedCountries } = rowState;

	return new Promise((resolve) => {
		let country: CountryType;
		let regionRow: any;
		if (source === 'row') {
			regionRow = data.existingRowData.find(({ id }) => id === rowState.targetRowId);
			country = regionRow!.data.countryDataType;
		} else if (source === 'any') {
			country = getRandomArrayValue(countryList as CountryType[]);
		} else {
			const list = rowState.selectedCountries.length ? selectedCountries : countryList;
			country = getRandomArrayValue(list);
		}

		loadCountryBundle(country)
			.then((getCountryData: GetCountryData) => {
				const countryData = getCountryData(countryI18n[country]);

				let selectedRegion;
				if (regionRow) {
					selectedRegion = countryData.regions.find((i: Region) => i.regionName === regionRow!.data.display);
				} else {
					selectedRegion = getRandomArrayValue(countryData.regions);
				}
				resolve({
					display: getRandomArrayValue(selectedRegion!.cities)
				});
			});
	});
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
