import utils from '../../../utils';
import { DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { CountryDataType, CountryType, Region } from '~types/countries';
import { WorkerUtils } from '~utils/workerUtils';
import { PostalZipSource } from './PostalZip.state';

export const generate = (data: DTGenerationData, utils: WorkerUtils): DTGenerateResult => {
	const { rowState, countryData, existingRowData } = data;
	const { source, selectedCountries } = rowState;

	const countryList = utils.countryUtils.getCountryList();
	let country: CountryType;
	let regionRow: any;

	if (source === PostalZipSource.any) {
		country = utils.randomUtils.getRandomArrayValue(countryList as CountryType[]);
	} else if (source === PostalZipSource.countries) {
		const list = selectedCountries.length ? selectedCountries : countryList;
		country = utils.randomUtils.getRandomArrayValue(list);
	} else if (source === PostalZipSource.countryRow) {
		const countryRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
		country = countryRow!.data.countryDataType;

	// region row
	} else {
		regionRow = existingRowData.find(({ id }) => id === rowState.targetRowId);
		country = regionRow!.data.countryDataType;
	}

	if (!country) {
		return { display: '' };
	}

	// if the user selected a row containing region data as the source for generating a zip, check the user has
	// actually entered all necessary UI options for formatting options (short / full), otherwise we won't know what to generate
	if (regionRow) {
		if (!regionRow!.data.display || !regionRow!.data.displayFormat) {
			return { display: '' };
		}
	}

	const selectedCountry = countryData[country];
	let selectedRegion: Region;
	if (regionRow) {
		const property = regionRow!.data.displayFormat === 'short' ? 'regionShort' : 'regionName';
		selectedRegion = selectedCountry.regions.find((i: Region) => i[property] === regionRow!.data.display) as Region;
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
