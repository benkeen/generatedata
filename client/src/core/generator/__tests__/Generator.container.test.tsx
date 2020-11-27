import React from 'react';
import Generator from '../Generator.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('Generator', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<Generator />
		);

		// TODO bug here. The CSS modules classes are rendering as undefined... it's not the lib we're using: identify-obj-proxy
		// also has the same issue.

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
