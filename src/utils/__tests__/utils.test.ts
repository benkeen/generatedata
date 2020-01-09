import * as utils from '../randomUtils';

describe('getRandomNum', () => {
    it('generates numbers in expected range #1', () => {
        const expected = [1, 2, 3];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(utils.getRandomNum(1, 3)) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #2', () => {
        const expected = [5, 6, 7];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(utils.getRandomNum(5, 7)) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #3', () => {
        const expected = [0, 1];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(utils.getRandomNum(0, 1)) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #3', () => {
        const expected = [-2, -1, 0, 1, 2];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(utils.getRandomNum(-2, 2)) !== -1).toBeTruthy();
        }
    });
});
