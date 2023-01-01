import { CountryType } from '~types/countries';

export const enum RegionSource {
	any = 'any',
	countries = 'countries',
	regionRow = 'regionRow'
}

export type CityState = {
	source: RegionSource;
	selectedCountries: CountryType[];
	targetRowId: string;
};

export type GenerationOptionsType = CityState;

export const initialState: CityState = {
	source: RegionSource.any,
	selectedCountries: [],
	targetRowId: ''
};
