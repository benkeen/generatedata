import React from 'react';
import ActivePacketsList from '../ActivePacketsList.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('ActivePacketsList', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<ActivePacketsList />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
