import React from 'react'
import { render } from '@testing-library/react';
import CreatablePillField from '../CreatablePillField';

const defaultProps = {
	onChange: () => {},
	value: ['one', 'two', 'three']
};

describe('CreatablePillField', () => {
	it('renders', () => {
		const onClose = jest.fn();
		const { baseElement } = render(
			<CreatablePillField
				{...defaultProps}
			/>
		);
		//
		// const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
		// fireEvent.click(closeButton);
		// expect(onClose).toBeCalled();
	});
});
