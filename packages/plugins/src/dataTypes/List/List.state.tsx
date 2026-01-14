export type ListType = 'exactly' | 'between';

export type ListState = {
  example: string;
  listType: ListType;
  exactly: string;
  betweenLow: string;
  betweenHigh: string;
  values: string[];
  delimiter: string;
};

export type GenerationOptionsType = {
  listType: ListType;
  exactly: number;
  betweenLow: number;
  betweenHigh: number;
  values: string[];
  delimiter: string;
};

export const defaultGenerationOptions: ListState = {
  example: '',
  listType: 'exactly',
  exactly: '1',
  betweenLow: '',
  betweenHigh: '',
  values: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
  delimiter: ', '
};

export const initialState: ListState = {
  ...defaultGenerationOptions,
  example: '1|3|5|7|9|11|13|15|17|19'
};
