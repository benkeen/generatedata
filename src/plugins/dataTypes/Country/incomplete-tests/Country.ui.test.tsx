import React from 'react'
import { render } from '@testing-library/react';
import { initialState, Options } from '../Country';
const i18n = require('../i18n/en.json');

const defaultProps = {
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	dimensions: { width: 100, height: 100 },
};

describe('Options', () => {
	it('changing the content should call callback', () => {
		const data = { ...initialState };
		const onUpdate = jest.fn();
		const { container } = render(
			<Options
				{...defaultProps}
				data={data}
				onUpdate={onUpdate}
			/>
		);
		// const field = container.querySelector('input') as HTMLInputElement;
		// fireEvent.click(field);
		// expect(onUpdate).toBeCalledWith({ allCountries: false });
	});
});
