import { type CountryType } from '../../';

export type RegionSource = 'any' | 'countries' | 'regionRow';

export type CityStateAny = {
  source: 'any';
  selectedCountries?: [];
  targetRowId?: '';
};

export type CityStateRegionRow = {
  source: 'regionRow';
  selectedCountries?: [];
  targetRowId: string;
};

export type CityStateCountryRow = {
  source: 'countries';
  selectedCountries: CountryType[];
};

export type CityState = CityStateAny | CityStateRegionRow | CityStateCountryRow;

export type GenerationOptionsType = CityState;

export const initialState: CityState = {
  source: 'any',
  selectedCountries: [],
  targetRowId: ''
};

export const defaultGenerationOptions = initialState;
