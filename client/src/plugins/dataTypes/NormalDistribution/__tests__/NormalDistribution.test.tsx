import React from 'react'
import { render } from '@testing-library/react';
import { Options } from '../NormalDistribution';
const i18n = require('../i18n/en.json');

const optionsProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 }
};

describe('Options', () => {
	it('renders', () => {
		const { container } = render(
			<Options
				{...optionsProps}
				data={{}}
				onUpdate={() => {}}
			/>
		);
		expect(container).toBeTruthy();
	});
});
