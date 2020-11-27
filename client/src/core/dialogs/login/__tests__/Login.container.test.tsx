import React from 'react'
import LoginDialog from '../Login.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('LoginDialog container', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<LoginDialog />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});

