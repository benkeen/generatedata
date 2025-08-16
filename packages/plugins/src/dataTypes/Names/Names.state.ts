import { CountryNameFiles } from '../../../../_namePlugins';

export const enum NamesSource {
	any = 'any',
	countries = 'countries'
}

export type NamesState = {
	example: string;
	options: string[];
	source: NamesSource;
	selectedCountries: CountryNameFiles[];
};

export type GenerationOptionsType = {
	options: string[];
	source?: NamesSource;
	selectedCountries?: CountryNameFiles[];
};

export const defaultGenerationOptions: Required<GenerationOptionsType> = {
	options: ['Name Surname'],
	source: NamesSource.any,
	selectedCountries: []
};

export const initialState: NamesState = {
	example: 'Name Surname',
	...defaultGenerationOptions
};
