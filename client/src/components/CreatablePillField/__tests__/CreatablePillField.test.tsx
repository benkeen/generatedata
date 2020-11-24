import React from 'react'
import { render } from '@testing-library/react';
import CreatablePillField from '../CreatablePillField';

const defaultProps = {
	onChange: () => {},
	value: ['one', 'two', 'three']
};

describe('CreatablePillField', () => {
	it('renders', () => {
		const { baseElement } = render(
			<CreatablePillField
				{...defaultProps}
			/>
		);
	});
});
