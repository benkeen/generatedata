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

describe('removeItem', () => {
	it('removes an item from an array', () => {
		expect(arrayUtils.removeItem([1, 2, 3], 1)).toEqual([2, 3]);
	});

	it('removes an item from an array', () => {
		expect(arrayUtils.removeItem([1, 2, 3], 1)).toEqual([2, 3]);
	});

	it('uses strict comparison check for comparison', () => {
		expect(arrayUtils.removeItem(['1', '2', '3'], 1)).toEqual(['1', '2', '3']);
	});

	it('removes all items with the value', () => {
		expect(arrayUtils.removeItem([5, 11, 2, 29, 2, 22, 2], 2)).toEqual([5, 11, 29, 22]);
	});

	it('bounds checking', () => {
		expect(arrayUtils.removeItem([], 1)).toEqual([]);
		expect(arrayUtils.removeItem([1], 1)).toEqual([]);
		expect(arrayUtils.removeItem([1, 1, 1, 1, 1], 1)).toEqual([]);
	});
});
