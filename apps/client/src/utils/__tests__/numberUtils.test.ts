import * as numberUtils from '~utils/numberUtils';

describe('isNumeric', () => {
	it('evaluates numeric values correctly', () => {
		expect(numberUtils.isNumeric(0)).toEqual(true);
		expect(numberUtils.isNumeric(1)).toEqual(true);
		expect(numberUtils.isNumeric(1.5)).toEqual(true);
		expect(numberUtils.isNumeric('0')).toEqual(true);
		expect(numberUtils.isNumeric('0.5')).toEqual(true);
	});

	it('evaluates non-numeric values correctly', () => {
		expect(numberUtils.isNumeric("0x")).toEqual(false);
		expect(numberUtils.isNumeric("blah")).toEqual(false);
	});
});

describe('numberFormat', () => {
	it('formats numbers as expected', () => {
		expect(numberUtils.numberFormat(1234.56)).toEqual('1,235');
		expect(numberUtils.numberFormat(1234.56, 1)).toEqual('1,234.6');
		expect(numberUtils.numberFormat(1234.56, 2, ',', ' ')).toEqual('1 234,56');
		expect(numberUtils.numberFormat(1234.5678, 2, '.', '')).toEqual('1234.57');
		expect(numberUtils.numberFormat(67, 2, ',', '.')).toEqual('67,00');
		expect(numberUtils.numberFormat(1000)).toEqual('1,000');
		expect(numberUtils.numberFormat(67.311, 2)).toEqual('67.31');
		expect(numberUtils.numberFormat(1000.55, 1)).toEqual('1,000.6');
		expect(numberUtils.numberFormat(67000, 5, ',', '.')).toEqual('67.000,00000');
		expect(numberUtils.numberFormat(0.9, 0)).toEqual('1');
		expect(numberUtils.numberFormat(1.20, 2)).toEqual('1.20');
		expect(numberUtils.numberFormat(1.20, 4)).toEqual('1.2000');
		expect(numberUtils.numberFormat(1.2000, 3)).toEqual('1.200');
		expect(numberUtils.numberFormat(1e-8, 8, '.', '')).toEqual('0.00000001');
	});
});
