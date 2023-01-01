import React from 'react'
import { render } from '@testing-library/react';
import { getWeightedListItems, WeightedListItem } from '../WeightedList.state';
import { Help, Options } from '../WeightedList';
const i18n = require('../i18n/en.json');

const defaultProps = {
	data: {
		values: []
	},
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 },
	onUpdate: () => {},
	isCountryNamesLoading: false,
	isCountryNamesLoaded: false,
	countryNamesMap: null
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});

describe('Options', () => {
	it('renders', () => {
		const { container } = render(
			<Options
				{...defaultProps}
			/>
		);
		expect(container).toBeTruthy();
	});
});

describe('getWeightedListItems', () => {
	it('converts strings as expected', () => {
		const items = [
			'one: 1',
			'two: 2',
			'three: 22491',
			'four: 0'
		];
		const expected: WeightedListItem[] = [
			{ value: 'one', weight: '1' },
			{ value: 'two', weight: '2' },
			{ value: 'three', weight: '22491' },
			{ value: 'four', weight: '0' }
		]
		expect(getWeightedListItems(items)).toEqual(expected);
	});

	it('converts strings that contain the delim chars', () => {
		const items = [
			'one: two: three: 1',
		];
		const expected: WeightedListItem[] = [
			{ value: 'one: two: three', weight: '1' }
		]
		expect(getWeightedListItems(items)).toEqual(expected);
	});
});

