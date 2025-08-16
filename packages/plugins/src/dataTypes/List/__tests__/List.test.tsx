import React from 'react'
import { render } from '@testing-library/react';
import { Help, Options } from '../List';
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
