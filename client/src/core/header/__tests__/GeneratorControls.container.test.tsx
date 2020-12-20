import React from 'react';
import GeneratorControls from '../GeneratorControls.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Header', () => {

	// need to finish deciding exactly what the header will contain before adding these tests

	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<GeneratorControls />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
