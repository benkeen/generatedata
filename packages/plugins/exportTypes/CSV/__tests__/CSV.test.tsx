import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { Settings } from '../CSV';
import { initialState } from '../CSV.state';
import { defaultETSettings } from '../../../../../tests/testHelpers';
import * as langUtils from '~utils/langUtils';

const i18n = require('../i18n/en.json');

describe('Settings', () => {
	it('renders', () => {
		const data = { ...initialState };
		const onUpdate = jest.fn();

		sinon.stub(langUtils, 'getStrings').returns({
			core: i18n,
			dataTypes: {}
		});

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
