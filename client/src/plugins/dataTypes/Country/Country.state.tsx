import { CountryType } from '~types/countries';

export type CountrySource = 'plugins' | 'all';

export type CountryState = {
	source: CountrySource;
	selectedCountries: CountryType[];
}

export type CountryStateAll = {
	source: 'all';
}

export type CountryStatePlugins = {
	source: 'plugins';
	selectedCountries: CountryType[];
}

export type GenerationOptionsType = CountryStateAll | CountryStatePlugins;

export const initialState: CountryState = {
	source: 'plugins',
	selectedCountries: []
};

export const defaultGenerationOptions = initialState;
