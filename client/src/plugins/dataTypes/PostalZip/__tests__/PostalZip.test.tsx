import React from 'react'
import { render } from '@testing-library/react';
import { Help, Options } from '../PostalZip';
const i18n = require('../i18n/en.json');

const defaultHelpProps = {
	coreI18n: {},
	countryI18n: {},
	i18n
};

const optionsProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 }
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultHelpProps} />);
		expect(container).toBeTruthy();
	});
});

describe('Options', () => {
	it('renders', () => {
		const { container } = render(
			<Options
				{...optionsProps}
				data={{
					selectedCountries: []
				}}
				onUpdate={() => {}}
				countryRows={[]}
				regionRows={[]}
			/>);
		expect(container).toBeTruthy();
	});
});
