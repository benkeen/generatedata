import * as generalUtils from '../generalUtils';

describe('isBoolean', () => {
	it('evaluates as booleans', () => {
		expect(generalUtils.isBoolean('one')).toEqual(false);
		expect(generalUtils.isBoolean('true')).toEqual(false);
		expect(generalUtils.isBoolean('false')).toEqual(false);
		expect(generalUtils.isBoolean(false)).toEqual(true);
		expect(generalUtils.isBoolean(true)).toEqual(true);
		expect(generalUtils.isBoolean(1)).toEqual(false);
		expect(generalUtils.isBoolean(0)).toEqual(false);
		expect(generalUtils.isBoolean(undefined)).toEqual(false);
		expect(generalUtils.isBoolean(null)).toEqual(false);
		expect(generalUtils.isBoolean(NaN)).toEqual(false);
	});
});

describe('cloneObj', () => {
	it('clones an object', () => {
		const obj = { one: 114 };
		expect(obj === obj).toBeTruthy();

		const clone: any = generalUtils.cloneObj(obj);
		expect(obj === clone).toBeFalsy();
		expect(obj.one === clone.one).toBeTruthy();
	});
});

describe('template', () => {
	it('renders plain string', () => {
		expect(generalUtils.template('hello', {})).toEqual('hello');
	});

	it('renders placeholder', () => {
		expect(generalUtils.template('Hello {{name}}', { name: 'Ben' })).toEqual('Hello Ben');
	});

	it('check basic math', () => {
		expect(generalUtils.template('Hello {{value+1}}', { value: 1 })).toEqual('Hello 2');
		expect(generalUtils.template('{{value/10}}', { value: 250 })).toEqual('25');
	});
});

describe('isValidEmail', () => {
	it('validates email as expected', () => {
		expect(generalUtils.isValidEmail('nope')).toEqual(false);
		expect(generalUtils.isValidEmail('')).toEqual(false);
		expect(generalUtils.isValidEmail('a@b.com')).toEqual(true);
	});
});
