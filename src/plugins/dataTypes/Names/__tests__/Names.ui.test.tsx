import React from 'react'
import { render } from '@testing-library/react';
// @ts-ignore
import * as i18n from '../i18n/en';
import { Help } from '../Names.ui';

const defaultProps = {
	coreI18n: {},
	i18n
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});
