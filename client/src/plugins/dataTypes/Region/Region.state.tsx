import { CountryType } from '~types/countries';

export type RegionSource = 'anyRegion' | 'countries' | 'countryRow';
export type RegionFormat = 'full' | 'short';

export type RegionState = {
	source: RegionSource;
	targetRowId: string;
	selectedCountries: CountryType[];
	formats: RegionFormat[];
}

export type RegionStateAny = Pick<RegionState, 'source' | 'formats'>;
export type RegionStateCountryRow = Pick<RegionState, 'source' | 'targetRowId' | 'formats'>;
export type RegionStateCountries = Pick<RegionState, 'source' | 'selectedCountries' | 'formats'>;

export const initialState: RegionState = {
	source: 'anyRegion',
	selectedCountries: [],
	targetRowId: '',
	formats: ['full']
};

export const defaultGenerationOptions = initialState;

export type GenerationOptionsType = RegionStateAny | RegionStateCountryRow | RegionStateCountries;
