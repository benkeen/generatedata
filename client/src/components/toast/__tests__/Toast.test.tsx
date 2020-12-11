import React from 'react';
import Toast from '../Toast.component';
import { render, act } from '@testing-library/react';
import { addToast } from '~utils/generalUtils';


describe('Toast', () => {
	it('renders', () => {
		const { baseElement } = render(
			<Toast />
		);
		expect(baseElement.querySelector('#gd-toast')).toBeTruthy();
	});


	it('shows a toast', () => {
		const { baseElement } = render(
			<Toast />
		);

		act(() => {
			addToast({
				message: 'Hello world!',
				type: 'success'
			});
		});

		expect(baseElement.innerHTML).toContain('Hello world!');
	});
});
