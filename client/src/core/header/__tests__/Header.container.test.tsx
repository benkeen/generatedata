import React from 'react';
import Header from '../Header.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Header', () => {

	// need to finish deciding exactly what the header will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Header />
		);

		expect(baseElement.querySelector('header')).toBeTruthy();
	});
});
