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

describe('uppercaseWords', () => {
	it('uppercases a single word', () => {
		expect(generalUtils.uppercaseWords('one')).toEqual('One');
		expect(generalUtils.uppercaseWords('ONE')).toEqual('One');
	});

	it('uppercases multiple word', () => {
		expect(generalUtils.uppercaseWords('one two')).toEqual('One Two');
		expect(generalUtils.uppercaseWords('ONE TWO')).toEqual('One Two');
		expect(generalUtils.uppercaseWords('ONE-TWO')).toEqual('One-two');
	});
});