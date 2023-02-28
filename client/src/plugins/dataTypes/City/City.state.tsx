import { CountryType } from '~types/countries';

export const enum RegionSource {
	any = 'any',
	countries = 'countries',
	regionRow = 'regionRow'
}

export type CityStateAny = {
	source: RegionSource.any | 'any';
	selectedCountries?: [];
	targetRowId?: '';
}

export type CityStateRegionRow = {
	source: RegionSource.regionRow | 'regionRow';
	selectedCountries?: [];
	targetRowId: string;
}

export type CityStateCountryRow = {
	source: RegionSource.countries | 'countries';
	selectedCountries: CountryType[];
	targetRowId: string;
}

export type CityState = CityStateAny | CityStateRegionRow | CityStateCountryRow;

export type GenerationOptionsType = CityState;

export const initialState: CityState = {
	source: RegionSource.any,
	selectedCountries: [],
	targetRowId: ''
};

export const defaultGenerationOptions = initialState;
