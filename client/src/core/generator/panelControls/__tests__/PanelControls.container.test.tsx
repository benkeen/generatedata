import React from 'react';
import PanelControls from '../PanelControls.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('PanelControls', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<PanelControls />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
