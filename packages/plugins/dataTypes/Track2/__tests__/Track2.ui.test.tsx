import React from 'react'
import { render } from '@testing-library/react';
import { Help } from '../Track2';
const i18n = require('../i18n/en.json');

const defaultProps = {
	coreI18n: {},
	countryI18n: {},
	i18n
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps} />);
		expect(container).toBeTruthy();
	});
});
