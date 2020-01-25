import * as sinon from 'sinon';
import * as randomUtils from '../randomUtils';

describe('getRandomNum', () => {
    it('generates numbers in expected range #1', () => {
        const expected = [1, 2, 3];
        for (let i=0; i<50; i++) {
			const val = randomUtils.getRandomNum(1, 3);
            expect(expected.indexOf(val) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #2', () => {
        const expected = [5, 6, 7];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(randomUtils.getRandomNum(5, 7)) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #3', () => {
        const expected = [0, 1];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(randomUtils.getRandomNum(0, 1)) !== -1).toBeTruthy();
        }
    });

    it('generates numbers in expected range #4', () => {
        const expected = [-2, -1, 0, 1, 2];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(randomUtils.getRandomNum(-2, 2)) !== -1).toBeTruthy();
        }
	});
	
    it('generates numbers when number range entirely negative', () => {
        const expected = [-4, -3, -2, -1];
        for (let i=0; i<50; i++) {
            expect(expected.indexOf(randomUtils.getRandomNum(-4, -1)) !== -1).toBeTruthy();
        }
    });

    it('generates the same number when min and max have same values', () => {
        for (let i=0; i<50; i++) {
			expect(randomUtils.getRandomNum(0, 0) === 0).toBeTruthy();
			expect(randomUtils.getRandomNum(-800, -800) === -800).toBeTruthy();
        }
    });
});

describe('generateRandomTextStr', () => {
	const words = ['one', 'two', 'three'];

	afterEach(function () {
        sinon.restore();
    });

	it('generates a single word starting from the first word', () => {
		expect(randomUtils.generateRandomTextStr(words, true, 1)).toEqual('one');

	});
	it('generates multiple words starting from the first word', () => {
		expect(randomUtils.generateRandomTextStr(words, true, 2)).toEqual('one two');
		expect(randomUtils.generateRandomTextStr(words, true, 3)).toEqual('one two three');
	});

	it('generates a random word', () => {
        sinon.stub(randomUtils, 'getRandomNum')
			.onCall(0).returns(0);

		expect(randomUtils.generateRandomTextStr(words, false, 1)).toEqual('two');
	});

	it('generates another random word', () => {
        sinon.stub(randomUtils, 'getRandomNum')
			.onCall(0).returns(1);

		expect(randomUtils.generateRandomTextStr(words, false, 1)).toEqual('three');
	});

	it('generates two random words (has to be last 2)', () => {
		expect(randomUtils.generateRandomTextStr(words, false, 2)).toEqual('two three');
	});

});