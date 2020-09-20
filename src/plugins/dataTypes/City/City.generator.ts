import utils from '../../../utils';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { GetCountryData, Region } from '~types/countries';
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
			country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
		} else {
			const list = rowState.selectedCountries.length ? selectedCountries : countryList;
			country = utils.randomUtils.getRandomArrayValue(list);
		}

		utils.countryUtils.loadCountryBundle(country)
			.then((getCountryData: GetCountryData) => {
				const countryData = getCountryData(countryI18n[country]);

				let selectedRegion;
				if (regionRow) {
					selectedRegion = countryData.regions.find((i: Region) => i.regionName === regionRow!.data.display);
				} else {
					selectedRegion = utils.randomUtils.getRandomArrayValue(countryData.regions);
				}

				resolve({
					display: utils.randomUtils.getRandomArrayValue(selectedRegion!.cities)
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

	generate(e.data)
		.then((resp) => {
			console.log("...", resp);
			postMessage(resp);
		});
};

export {};
