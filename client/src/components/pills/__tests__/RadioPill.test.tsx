import React from 'react';
import RadioPill, { RadioPillRow } from '../RadioPill';
import { render } from '@testing-library/react';

describe('RadioPillRow', () => {
	it('renders children', () => {
		const { baseElement } = render(
			<RadioPillRow>
				<div>Children!</div>
			</RadioPillRow>
		);

		expect(baseElement.innerHTML).toContain('Children!');
	});

	it('includes the classname passed', () => {
		const { baseElement } = render(
			<RadioPillRow className="this-is-a-test">
				<div>Children!</div>
			</RadioPillRow>
		);

		expect(baseElement.querySelector('.this-is-a-test')).toBeTruthy();
	});
});

describe('RadioPill', () => {
	it('renders label', () => {
		const { container } = render(
			<RadioPill
				label="Label!"
				onClick={() => {}}
				name="name123"
				checked={false}
				disabled={false}
				tooltip="Yo yo yo"
			/>
		);

		expect(container.innerHTML).toContain('Label!');
	});

	it('includes name field', () => {
		const { container } = render(
			<RadioPill
				label="Label!"
				onClick={() => {}}
				name="name123"
				checked={false}
				disabled={false}
			/>
		);

		expect(container.querySelector('[name=name123]')).toBeTruthy();
	});
});
