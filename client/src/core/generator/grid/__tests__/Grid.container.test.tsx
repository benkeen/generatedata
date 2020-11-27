import React from 'react';
import Grid from '../Grid.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('Grid', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Grid />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
