import React from 'react';
import ExportSettings from '../ExportSettings.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('ExportSettings', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<ExportSettings />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
