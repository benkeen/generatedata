import * as generalUtils from '../generalUtils';

describe('isNumeric', () => {
    it('evaluates numeric values correctly', () => {
        expect(generalUtils.isNumeric(0)).toEqual(true);
        expect(generalUtils.isNumeric(1)).toEqual(true);
        expect(generalUtils.isNumeric(1.5)).toEqual(true);
        expect(generalUtils.isNumeric('0')).toEqual(true);
        expect(generalUtils.isNumeric('0.5')).toEqual(true);
    });

    it('evaluates non-numeric values correctly', () => {
        expect(generalUtils.isNumeric("0x")).toEqual(false);
        expect(generalUtils.isNumeric("blah")).toEqual(false);
    });
});

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

		const clone: any = generalUtils.cloneObj(obj)
		expect(obj === clone).toBeFalsy();
		expect(obj.one === clone.one).toBeTruthy();
	});
});
