import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import LoginDialog from '../Login.component';
import sharedStyles from '../../../../styles/shared.scss';
const i18n = require('../../../../i18n/en.json');

const defaultProps = {
	visible: false,
	onClose: () => {},
	onSubmit: () => {},
	i18n
};

describe('LoginDialog', () => {
	it('clicking close calls the onClose callback', () => {
		const onClose = jest.fn();
		const { baseElement } = render(
			<LoginDialog
				{...defaultProps}
				visible={true}
				onClose={onClose}
			/>
		);

		const closeButton = baseElement.querySelector('.MuiDialogTitle-root button') as HTMLButtonElement;
		fireEvent.click(closeButton);
		expect(onClose).toBeCalled();
	});

	it('clicking enter in the fields submits the form and shows errors on the fields', () => {
		const onSubmit = jest.fn();
		const { baseElement } = render(
			<LoginDialog
				{...defaultProps}
				visible={true}
				onSubmit={onSubmit}
			/>
		);

		const inputFields = baseElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

		// weird, but it seems you can't simulate the <enter> click in another way
		fireEvent.submit(inputFields[0]);

		expect(inputFields[0].classList.contains(sharedStyles.errorField)).toBeTruthy();
		expect(inputFields[1].classList.contains(sharedStyles.errorField)).toBeTruthy();
		expect(onSubmit).not.toHaveBeenCalled();
	});

});
