import React from 'react';
import GridRow from '../Grid.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('GridRow', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<GridRow />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
