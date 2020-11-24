import React from 'react'
import { render, fireEvent } from '@testing-library/react';
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

	it('clicking icon shows notification with message', () => {
		const { baseElement } = render(
			<CopyToClipboard
				{...defaultProps}
			/>
		);

		fireEvent.click(baseElement.querySelector('.copyIcon') as Element);
		expect(baseElement.innerHTML).toContain(defaultProps.message);
	});
});
