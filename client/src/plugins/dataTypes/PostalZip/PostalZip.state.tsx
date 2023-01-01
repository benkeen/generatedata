import { DataTypeFolder } from '../../../../_plugins';

export const enum PostalZipSource {
	any = 'any',
	countries = 'countries',
	countryRow = 'countryRow',
	regionRow = 'regionRow'
}

export type PostalZipState = {
	source: PostalZipSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: PostalZipState = {
	source: PostalZipSource.any,
	selectedCountries: [],
	targetRowId: ''
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = PostalZipState;
