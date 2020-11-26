import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import IntroDialog from '../Intro.component';
const i18n = require('../../../../i18n/en.json');

const defaultProps = {
	visible: true,
	i18n,
	onClose: () => {}
};

describe('IntroDialog', () => {
	it('clicking close calls the onClose callback', () => {
		const onClose = jest.fn();
		const { baseElement } = render(
			<IntroDialog
				{...defaultProps}
				onClose={onClose}
			/>
		);

		const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
		fireEvent.click(closeButton);
		expect(onClose).toBeCalled();
	});
});

