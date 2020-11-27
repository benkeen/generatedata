import React from 'react';
import ExportTypeTab from '../ExportTypeTab.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('ExportTypeTab', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<ExportTypeTab />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
