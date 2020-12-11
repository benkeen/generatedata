import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import ChangePassword from '../ChangePassword.component';

const i18n = require('../../../../i18n/en.json');

describe('ChangePassword container', () => {
	it('submitting form does not work when fields empty', () => {
		const onSave = jest.fn();
		const { container } = render(
			<ChangePassword
				className="the-class"
				onSave={onSave}
				i18n={i18n}
			/>
		);

		const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(onSave).not.toHaveBeenCalled();
	});

	it('submitting form still does not works when fields non-empty but new passwords are not identical', () => {
		const onSave = jest.fn();
		const { container } = render(
			<ChangePassword
				className="the-class"
				onSave={onSave}
				i18n={i18n}
			/>
		);

		const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
		fireEvent.change(currentPasswordField, {
			target: {
				value: 'current-password'
			}
		});

		const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
		fireEvent.change(newPasswordField1, {
			target: {
				value: 'password'
			}
		});

		const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
		fireEvent.change(newPasswordField2, {
			target: {
				value: 'passwordX'
			}
		});

		const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(onSave).not.toHaveBeenCalled();
	});

	it('submitting form works when fields non-empty and new passwords are identical', () => {
		const onSave = jest.fn();
		const { container } = render(
			<ChangePassword
				className="the-class"
				onSave={onSave}
				i18n={i18n}
			/>
		);

		const currentPasswordField = container.querySelector('input[name=currentPassword]') as HTMLInputElement;
		fireEvent.change(currentPasswordField, {
			target: {
				value: 'current-password'
			}
		});

		const newPasswordField1 = container.querySelector('input[name=password]') as HTMLInputElement;
		fireEvent.change(newPasswordField1, {
			target: {
				value: 'password'
			}
		});

		const newPasswordField2 = container.querySelector('input[name=password2]') as HTMLInputElement;
		fireEvent.change(newPasswordField2, {
			target: {
				value: 'password'
			}
		});

		const submitButton = container.querySelector('button[type=submit]') as HTMLButtonElement;
		fireEvent.click(submitButton);

		expect(onSave).toHaveBeenCalled();
	});
});
