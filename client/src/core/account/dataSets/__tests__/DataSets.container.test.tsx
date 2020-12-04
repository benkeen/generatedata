import React from 'react';
import DataSets from '../DataSets.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('DataSets', () => {

	// need to finish deciding exactly what the header will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<DataSets />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
