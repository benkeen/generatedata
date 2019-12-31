import * as arrayUtils from '../arrayUtils';

describe('getUnique', () => {
	it('generates expected characters', () => {
		expect(arrayUtils.getUnique([1,1,1,2])).toEqual([1,2]);
        expect(arrayUtils.getUnique([])).toEqual([]);
	});
});
