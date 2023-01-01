export type CountrySource = 'plugins' | 'all';
export type CountryState = {
	source: CountrySource;
	selectedCountries: string[];
}
export type GenerationOptionsType = CountryState;

export const initialState: CountryState = {
	source: 'plugins',
	selectedCountries: []
};

export const defaultGenerationOptions = initialState;
