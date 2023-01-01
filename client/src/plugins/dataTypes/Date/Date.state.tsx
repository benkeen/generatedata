import { addYears, format, subYears } from 'date-fns';

export type DateState = {
	fromDate: number;
	toDate: number;
	example: string;
	format: string;
};

export type GenerationOptionsType = Omit<DateState, 'example'>;

export const initialState: DateState = {
	fromDate: parseInt(format(subYears(new Date(), 1), 't'), 10),
	toDate: parseInt(format(addYears(new Date(), 1), 't'), 10),
	example: 'MMM d, y',
	format: 'MMM d, y'
};

export const defaultGenerationOptions = initialState;
