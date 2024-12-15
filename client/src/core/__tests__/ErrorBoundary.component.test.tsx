import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary.component';

describe('ErrorBoundary', () => {
	it('renders', () => {
		const { baseElement } = render(
			<ErrorBoundary>
				<span className="hello">Test</span>
			</ErrorBoundary>
		);

		expect(baseElement.querySelector('.hello')).toBeTruthy();
	});
});
