import React from 'react';
import { render } from '@testing-library/react';
import { Settings } from '../Typescript';
import { initialState } from '../Typescript.state';
import { defaultETSettings } from '../../../../../tests/testHelpers';

const i18n = require('../i18n/en.json');

describe('Settings', () => {
	it('renders', () => {
		const data = { ...initialState };
		const onUpdate = jest.fn();

		const { container } = render(
			<Settings
				{...defaultETSettings}
				i18n={i18n}
				data={data}
				onUpdate={onUpdate}
			/>
		);
		expect(container).toBeTruthy();
	});
});
