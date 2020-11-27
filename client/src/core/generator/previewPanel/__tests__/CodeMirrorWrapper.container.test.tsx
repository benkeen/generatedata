import React from 'react';
import CodeMirrorWrapper from '../CodeMirrorWrapper.container';
import { renderWithStoreAndRouter } from '../../../../../tests/testHelpers';

describe('CodeMirrorWrapper', () => {
	it('renders', () => {
		const { baseElement } = renderWithStoreAndRouter(
			<CodeMirrorWrapper />
		);

		expect(baseElement.querySelector('div')).toBeTruthy();
	});
});
