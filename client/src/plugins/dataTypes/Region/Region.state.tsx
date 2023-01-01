import { DataTypeFolder } from '../../../../_plugins';

export type RegionSource = 'anyRegion' | 'countries' | 'countryRow';
export type RegionFormat = 'full' | 'short';

export type RegionState = {
	source: RegionSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
	formats: RegionFormat[];
};

export const initialState: RegionState = {
	source: 'anyRegion',
	selectedCountries: [],
	targetRowId: '',
	formats: ['full']
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = RegionState;
