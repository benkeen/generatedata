import { WeightedOptions } from '~utils/randomUtils';

export const convertListItemsToObj = (values: WeightedListItem[]): WeightedOptions => {
	const valuesObj: WeightedOptions = {};
	values.forEach(({ value, weight }: WeightedListItem) => {
		valuesObj[value] = parseInt(weight, 10);
	});

	return valuesObj;
};

export const getWeightedListItems = (values: string[]): WeightedListItem[] => (
	values.map((value) => {
		const match = value.match(/^(.*):\s(\d+)$/) as string[];
		return {
			value: match[1],
			weight: match[2]
		};
	})
);

export const getWeightedListLabels = (values: WeightedListItem[]): string[] => (
	values.map(({ value, weight }) => `${value}: ${weight}`)
);

export const presets = {
	evenOdd: {
		values: [
			{ value: '1', weight: '1' },
			{ value: '2', weight: '2' },
			{ value: '3', weight: '1' },
			{ value: '4', weight: '2' },
			{ value: '5', weight: '1' },
			{ value: '6', weight: '2' },
			{ value: '7', weight: '1' },
			{ value: '8', weight: '2' },
			{ value: '9', weight: '1' },
			{ value: '10', weight: '2' }
		]
	},
	professions: {
		values: [
			{ value: 'Astronaut', weight: '1' },
			{ value: 'Banker', weight: '5000' },
			{ value: 'Brain surgeon', weight: '1' },
			{ value: 'Cook', weight: '8000' },
			{ value: 'Fast food/counter worker', weight: '90000' },
			{ value: 'Musician', weight: '5000' },
			{ value: 'Retail salesperson', weight: '100000' },
			{ value: 'Software Developer', weight: '10000' },
			{ value: 'Surgeon', weight: '200' }
		]
	},
	householdPets: {
		values: [
			{ value: 'Dog', weight: '50000' },
			{ value: 'Cat', weight: '35000' },
			{ value: 'Fish', weight: '10000' },
			{ value: 'Reptile', weight: '3700' },
			{ value: 'Bird', weight: '3500' },
			{ value: 'Rabbit', weight: '1500' },
			{ value: 'Capybara', weight: '1' },
			{ value: 'Sugar glider', weight: '1' },
			{ value: 'Prairie dog', weight: '1' },
			{ value: 'Pot-bellied pig', weight: '1' },
		]
	}
};

export const enum WeightedListType {
	exactly = 'exactly',
	between = 'between'
}

export type WeightedListItem = {
	value: string;
	weight: string; // for convenience this is stored as a string, but when passed to
}

export type WeightedListState = {
	example: string;
	listType: WeightedListType;
	exactly: string;
	betweenLow: string;
	betweenHigh: string;
	allowDuplicates: boolean;
	delimiter: string;
	values: WeightedListItem[];
};

export type GenerationOptionsType = {
	listType: WeightedListType;
	exactly: string;
	betweenLow: string;
	betweenHigh: string;
	allowDuplicates: boolean;
	delimiter: string;
	values: WeightedOptions;
}

export const defaultGenerationOptions: GenerationOptionsType = {
	listType: WeightedListType.exactly,
	exactly: '1',
	betweenLow: '',
	betweenHigh: '',
	allowDuplicates: true,
	delimiter: ', ',
	values: convertListItemsToObj(presets.evenOdd.values)
};

export const initialState: WeightedListState = {
	example: 'even-odd',
	listType: WeightedListType.exactly,
	exactly: '1',
	betweenLow: '',
	betweenHigh: '',
	values: presets.evenOdd.values,
	delimiter: ', ',
	allowDuplicates: true
};
