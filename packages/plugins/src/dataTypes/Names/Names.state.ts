import { CountryNameFiles } from '../../names';

export type NamesSource = 'any' | 'countries';

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
  source: 'any',
  selectedCountries: []
};

export const initialState: NamesState = {
  example: 'Name Surname',
  ...defaultGenerationOptions
};
