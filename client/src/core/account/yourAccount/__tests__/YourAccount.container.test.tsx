import React from 'react'
import YourAccount from '../YourAccount.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('YourAccount container', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<YourAccount />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});

