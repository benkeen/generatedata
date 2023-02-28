import { CountryType } from "~types/countries";

export type CountrySource = 'plugins' | 'all';

export type CountryStateDefault = {
	source: CountrySource;
}

export type CountryStatePlugins = {
	source: CountrySource;
	selectedCountries?: CountryType[];
}

export type CountryState = CountryStateDefault | CountryStatePlugins;

export type GenerationOptionsType = CountryState;

export const initialState: CountryState = {
	source: 'plugins',
	selectedCountries: []
};

export const defaultGenerationOptions = initialState;
