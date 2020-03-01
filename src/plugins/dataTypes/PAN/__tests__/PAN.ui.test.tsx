import React from 'react'
import { render } from '@testing-library/react';
import { getCreditCardOptions, Help } from '../PAN.ui';
const i18n = require('../i18n/en.json');

const defaultProps = {
	coreI18n: {},
	i18n
};

describe('getCreditCardOptions', () => {
	it('returns data in the expected format', () => {
		const i18n = {
			one: 'First one',
			two: 'Second one',
			three: 'Third one'
		};
		expect(getCreditCardOptions(['one', 'two', 'three'], i18n)).toEqual([
			{ value: 'one', label: 'First one' },
			{ value: 'two', label: 'Second one' },
			{ value: 'three', label: 'Third one' }
		]);
	});
});

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps} />);
		expect(container).toBeTruthy();
	});
});
