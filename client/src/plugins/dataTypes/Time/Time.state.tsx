import { endOfDay, format, startOfDay } from 'date-fns';

export type DateState = {
	fromTime: number;
	toTime: number;
	example: string;
	format: string;
};

export type GenerationOptionsType = Omit<DateState, 'example'>;

export const initialState: DateState = {
	fromTime: parseInt(format(startOfDay(new Date()), 't'), 10),
	toTime: parseInt(format(endOfDay(new Date()), 't'), 10),
	example: 'h:mm a',
	format: 'h:mm a'
};

export const defaultGenerationOptions = initialState;
