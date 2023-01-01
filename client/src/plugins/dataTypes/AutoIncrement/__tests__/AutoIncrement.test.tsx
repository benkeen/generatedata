import React from 'react'
import { render } from '@testing-library/react';
import { Help, getMetadata } from '../AutoIncrement';
import { AutoIncrementState } from '../AutoIncrement.state';
const i18n = require('../i18n/en.json');

const defaultProps = {
	coreI18n: {},
	countryI18n: {},
	i18n
};

describe('Help', () => {
	it('renders', () => {
		const { container } = render(<Help {...defaultProps}/>);
		expect(container).toBeTruthy();
	});
});


describe('getMetadata', () => {
	it('returns number as the general data type when no placeholder and numeric values for the incr + starting value', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: '',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('number');

		const rowData2: AutoIncrementState = {
			incrementPlaceholder: '',
			incrementValue: '1.5',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData2).general!.dataType).toEqual('number');
	});

	it('still returns a number when the placeholder is set but only contains the placeholder or numeric vals', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: '{{INCR}}',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('number');

		const rowData2: AutoIncrementState = {
			incrementPlaceholder: '100{{INCR}}',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData2).general!.dataType).toEqual('number');

		const rowData3: AutoIncrementState = {
			incrementPlaceholder: '123{{INCR}}456',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData3).general!.dataType).toEqual('number');
	});

	it('returns a number when the placeholder contains whitespace only', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: ' ',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('number');
	});

	it('returns a number when the placeholder string contains multiple placeholders and nothing else', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: '{{INCR}}{{INCR}}{{INCR}}',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('number');
	});

	it('returns a string when the placeholder contains whitespace and the placeholder', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: ' {{INCR}}',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('string');
	});

	it('returns a string when the placeholder contains any non-numeric chars and the placeholder', () => {
		const rowData1: AutoIncrementState = {
			incrementPlaceholder: 'b{{INCR}}',
			incrementValue: '1',
			incrementStart: '1',
			example: ''
		};
		expect(getMetadata(rowData1).general!.dataType).toEqual('string');
	});

});
