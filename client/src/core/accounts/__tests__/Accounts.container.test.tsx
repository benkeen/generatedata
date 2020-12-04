import React from 'react';
import Accounts from '../Accounts.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Accounts', () => {

	// need to finish deciding exactly what the header will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Accounts />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
