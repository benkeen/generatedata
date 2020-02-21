import React from 'react'
import { render, fireEvent } from '@testing-library/react';

// @ts-ignore
import * as i18n from '../i18n/en';
import { state, Options } from '../Alphanumeric.ui';

const defaultProps = {
	coreI18n: {},
	i18n,
	id: 'id',
	dimensions: { width: 100, height: 100 }
};

describe('Options', () => {
	it('changing the content should call callback', () => {
		const data = { ...state };
		const onUpdate = jest.fn();
		const { container } = render(
			<Options 
				{...defaultProps}
				data={data}
				onUpdate={onUpdate}
			/>
		);
		const field = container.querySelector('input');

		// @ts-ignore
		fireEvent.change(field, {
			target: {
				value: 'new value!!'
			}
		});

		expect(onUpdate).toBeCalledWith({
			...state,
			value: 'new value!!'
		});
	});
});