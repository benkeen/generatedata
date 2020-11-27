import React from 'react';
import PreviewSettingsTab from '../PreviewSettingsTab.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('ExportTypeTab', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<PreviewSettingsTab />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
