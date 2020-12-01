import React from 'react'
import ChangePassword from '../ChangePassword.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('ChangePassword container', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<ChangePassword />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
