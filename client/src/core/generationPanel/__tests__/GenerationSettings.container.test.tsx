import React from 'react';
import GenerationSettings from '../GenerationSettings.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('GenerationSettings', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<GenerationSettings />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
