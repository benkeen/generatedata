import React from 'react';
import Page from '../Page.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Page', () => {

	// need to finish deciding exactly what the header will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Page />
		);

		expect(baseElement.querySelector('header')).toBeTruthy();
	});
});
