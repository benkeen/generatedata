import React from 'react';
import { render } from '@testing-library/react';
import Link from '../Link.component';

describe('Link', () => {
	it('renders link as label if not supplied', () => {
		const { container } = render(<Link url="http://google.com" />);

		expect(container.innerHTML).toEqual('<a href="http://google.com">http://google.com</a>');
	});

	it('renders link as label if not supplied', () => {
		const { container } = render(<Link url="http://google.com">Link here</Link>);

		expect(container.innerHTML).toEqual('<a href="http://google.com">Link here</a>');
	});

	it('renders offsite links', () => {
		const { container } = render(
			<Link url="http://google.com" offSite={true}>
				Link here
			</Link>
		);

		expect(container.innerHTML).toEqual('<a href="http://google.com" target="_blank" rel="noopener noreferrer">Link here</a>');
	});
});
