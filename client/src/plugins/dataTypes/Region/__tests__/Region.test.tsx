import React from 'react'
import { render } from '@testing-library/react';
import { Help, Options } from '../Region';
const i18n = require('../i18n/en.json');

const defaultProps = {
	data: {
		selectedCountries: []
	},
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 },
	onUpdate: () => {}
};

const optionsProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 },
	isCountryNamesLoading: false,
	isCountryNamesLoaded: false
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
				{...optionsProps}
				data={{
					selectedCountries: [],
					formats: ['full']
				}}
				onUpdate={() => {}}
				countryRows={[]}
			/>
		);
		expect(container).toBeTruthy();
	});
});
