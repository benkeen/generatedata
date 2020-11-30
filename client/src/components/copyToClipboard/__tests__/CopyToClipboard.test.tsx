import React from 'react'
import { render } from '@testing-library/react';
import CopyToClipboard from '../CopyToClipboard';

jest.mock('copy-to-clipboard', () => {
	return jest.fn();
});

const defaultProps = {
	message: 'Message here',
	tooltip: 'Tooltip here',
	content: 'Content here',
	autoHideDuration: 0
};

describe('CopyToClipboard', () => {
	it('renders copy icon with tooltip', () => {
		const { baseElement } = render(
			<CopyToClipboard
				{...defaultProps}
			/>
		);

		expect(baseElement.querySelector('.copyIcon')).toBeTruthy();
		expect(baseElement.innerHTML).toContain(defaultProps.tooltip);
	});
});
