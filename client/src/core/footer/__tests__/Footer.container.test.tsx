import React from 'react';
import Footer from '../Footer.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Footer', () => {

	// also need to finish deciding exactly what the footer will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Footer />
		);

		expect(baseElement.querySelector('footer')).toBeTruthy();
	});
});
