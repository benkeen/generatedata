import React from 'react';
import ActivityPanel from '../ActivityPanel.container';
import { renderWithStoreAndRouter } from '../../../../tests/testHelpers';

describe('ActivityPanel', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<ActivityPanel />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
