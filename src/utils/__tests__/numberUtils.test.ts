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
