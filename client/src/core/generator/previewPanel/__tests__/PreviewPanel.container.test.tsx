import React from 'react';
import PreviewPanel from '../PreviewPanel.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('PreviewPanel', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<PreviewPanel />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
