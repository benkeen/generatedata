import * as arrayUtils from '../arrayUtils';

describe('getUnique', () => {
	it('generates expected characters', () => {
		expect(arrayUtils.getUnique([1,1,1,2])).toEqual([1,2]);
        expect(arrayUtils.getUnique([])).toEqual([]);
	});
});

describe('getArrayOfSize', () => {
    it('generated iterable array of specific size', () => {
        const arr = arrayUtils.getArrayOfSize(10);
        const newArray = arr.map((i, index) => index);

        expect(arr.length).toEqual(10);
        expect(newArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
