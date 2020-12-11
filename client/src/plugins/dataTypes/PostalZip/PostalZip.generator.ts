import { DTGenerationData, DTGenerateResult, DTOnMessage } from '~types/dataTypes';
import { CountryDataType, CountryType, Region } from '~types/countries';
import utils from '../../../utils';

let workerUtilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data));
};


export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { rowState, countryData, existingRowData } = data;
	const { source, selectedCountries } = rowState;

	const countryList = utils.countryUtils.getCountryList();

	let country: CountryType;
	let regionRow: any;

	if (source === 'any') {
		country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
	} else if (source === 'countries') {
		const list = selectedCountries.length ? selectedCountries : countryList;
		country = utils.randomUtils.getRandomArrayValue(list);
	} else if (source === 'countryRow') {
		const countryRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
		country = countryRow!.data.countryDataType;
	} else {
		regionRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
		country = regionRow!.data.countryDataType;
	}

	const selectedCountry = countryData[country];
	let selectedRegion: Region;
	if (regionRow) {
		selectedRegion = selectedCountry.regions.find((i: Region) => i.regionName === regionRow!.data.display) as Region;
	} else {
		selectedRegion = utils.randomUtils.getRandomArrayValue(selectedCountry.regions);
	}

	return {
		display: getRegionPostalCode(selectedCountry, selectedRegion)
	};
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
	const selectedFormat = utils.randomUtils.getRandomArrayValue(formats);

	return utils.randomUtils.generatePlaceholderStr(selectedFormat, placeholders);
};
