import { isNested } from '../JSON.generator';


describe('isNested', () => {
    it('should return false when no columns have dots in them', () => {
        const cols = [
            'one',
            'two',
            'three'
        ];
        expect(isNested(cols)).toEqual(false);
    });

    it('should return false when there are no columns', () => {
        expect(isNested([])).toEqual(false);
    });


    it('should return true when one item contains a dot', () => {
        expect(isNested(['a.c', 'b', 'c'])).toEqual(true);
        expect(isNested(['a', 'b.e', 'b.c'])).toEqual(true);
        expect(isNested(['a', 'b', 'b.c'])).toEqual(true);
    });
});
