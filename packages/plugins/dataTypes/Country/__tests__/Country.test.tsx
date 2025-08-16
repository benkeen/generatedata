import React from 'react';
import { render } from '@testing-library/react';
import { Help, Options } from '../Country';
import { initialState } from '../Country.state';

const i18n = require('../i18n/en.json');

const helpProps = {
	coreI18n: {},
	countryI18n: {},
	i18n
};

const optionsProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 },
	isCountryNamesLoading: false,
	isCountryNamesLoaded: false,
	countryNamesMap: null
};


describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...helpProps} />);
		expect(container).toBeTruthy();
	});
});

describe('Options', () => {
	it('renders', () => {
		const data = { ...initialState };
		const onUpdate = jest.fn();

		const { container } = render(
			<Options
				{...optionsProps}
				data={data}
				onUpdate={onUpdate}
				regionRows={[]}
			/>
		);
		expect(container).toBeTruthy();
	});
});
