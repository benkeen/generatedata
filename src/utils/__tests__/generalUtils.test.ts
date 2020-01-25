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
