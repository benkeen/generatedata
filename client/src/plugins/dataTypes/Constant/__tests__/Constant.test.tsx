import React from 'react'
import { render } from '@testing-library/react';
import { Example, Help, Options } from '../Constant';
const i18n = require('../i18n/en.json');

// const defaultProps = {
// 	coreI18n: {},
// 	countryI18n: {},
// 	i18n
// };

const defaultProps = {
	data: {},
	coreI18n: {},
	countryI18n: {},
	i18n,
	id: 'id',
	gridPanelDimensions: { width: 100, height: 100 },
	onUpdate: () => {}
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});


describe('Example', () => {
	it('renders', () => {
		const { container } = render(<Example {...defaultProps} />);
		expect(container).toBeTruthy();
	});
});


describe('Options', () => {
	it('renders', () => {
		const props = { ...defaultProps };
		props.data = {
			values: []
		};
		const { container } = render(<Options {...props} />);
		expect(container).toBeTruthy();
	});
});
