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
        sinon.stub(randomUtils, 'getRandomNum').onCall(0).returns(0);
		expect(randomUtils.generateRandomTextStr(words, false, 1)).toEqual('one');
	});

	it('generates another random word', () => {
        sinon.stub(randomUtils, 'getRandomNum').onCall(0).returns(1);
		expect(randomUtils.generateRandomTextStr(words, false, 1)).toEqual('two');
	});

	it('generates two random words', () => {
		expect(randomUtils.generateRandomTextStr(words, false, 2)).toEqual('one two');
	});

	it('generates the same string every time when min num of words is the total number of words', () => {
		for (let i=0; i<10; i++) {
			expect(randomUtils.generateRandomTextStr(['a', 'b', 'c'], false, 3)).toEqual('a b c');
		}
	});
});

describe('generateRandomAlphanumericStr', () => {
	afterEach(function () {
        sinon.restore();
    });

	it('whitespace is trimmed', () => {
		expect(randomUtils.generateRandomAlphanumericStr('    ')).toEqual('');
	});

	it('special characters are converted as expected', () => {
		const str = 'CcEVvFLlDXxH';
		for (let i=0; i<50; i++) {
			const generated = randomUtils.generateRandomAlphanumericStr(str);

			// C = uppercase consonant
			expect(randomUtils.consonants.indexOf(generated[0]) !== -1).toBeTruthy();

			// c = lowercase consonant
			expect(randomUtils.lowercaseConsonants.indexOf(generated[1]) !== -1).toBeTruthy();

			// A = any case consonant
			expect(randomUtils.consonants.concat(randomUtils.lowercaseConsonants).indexOf(generated[2]) !== -1).toBeTruthy();

			// V = uppercase vowel
			expect(randomUtils.vowels.indexOf(generated[3]) !== -1).toBeTruthy();

			// v = uppercase vowel
			expect(randomUtils.lowercaseVowels.indexOf(generated[4]) !== -1).toBeTruthy();

			// F = any case vowel
			expect(randomUtils.vowels.concat(randomUtils.lowercaseVowels).indexOf(generated[5]) !== -1).toBeTruthy();

			// L = uppercase letter
			expect(randomUtils.letters.indexOf(generated[6]) !== -1).toBeTruthy();

			// l = lowercase letter
			expect(randomUtils.lowercaseLetters.indexOf(generated[7]) !== -1).toBeTruthy();

			// D = any case letter
			expect(randomUtils.letters.concat(randomUtils.lowercaseLetters).indexOf(generated[8]) !== -1).toBeTruthy();

			// X = 1-9
			expect(['1','2','3','4','5','6','7','8','9'].indexOf(generated[9]) !== -1).toBeTruthy();

			// x = 0-9
			expect(['0', '1','2','3','4','5','6','7','8','9'].indexOf(generated[10]) !== -1).toBeTruthy();

			// H = 0-F
			expect(['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'].indexOf(generated[11]) !== -1).toBeTruthy();
		}
	});
});

describe('getRandomCharInString', () => {
	afterEach(function () {
        sinon.restore();
    });

	it('returns a random char', () => {
        sinon.stub(randomUtils, 'getRandomNum')
			.onCall(0).returns(1);

		expect(randomUtils.getRandomCharInString('abc')).toEqual('b');
	});

	it('returns a random char', () => {
        sinon.stub(randomUtils, 'getRandomNum')
			.onCall(0).returns(2);

		expect(randomUtils.getRandomCharInString('abc')).toEqual('c');
	});
});

describe('getRandomSubset', () => {
	it('returns an array of the expected size', () => {
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 1).length).toEqual(1);
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 2).length).toEqual(2);
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 3).length).toEqual(3);
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 4).length).toEqual(4);
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 5).length).toEqual(5);
	});

	it('returns an array of size no greater than the original size', () => {
		expect(randomUtils.getRandomSubset([1,2,3,4,5], 10).length).toEqual(5);
	});

	it('returns the same content when passing a full array', () => {
		expect(randomUtils.getRandomSubset([1,2,3], 3).sort()).toEqual([1,2,3].sort());
	});
});

describe('generatePlaceholderStr', () => {
	it('generates string using custom placeholders', () => {
		var defaultPlaceholders = {
			A: '1',
			B: '2',
			C: '3'
		};
		expect(randomUtils.generatePlaceholderStr('ABC', defaultPlaceholders)).toEqual('123');
	});
});

describe('getRandomWeightedValue', () => {
	// Out of 1, the relative and cumulative values for these are:
	// 		a: 0.1666	-> 0.16666
	// 	 	b: 0.3333   -> 0.5
	// 	 	c: 0.5      -> 1
	const values = { a: 10, b: 20, c: 30 };

	it('returns appropriate values for particular random value', () => {
		// any random number under 0.166666 should return "a"
		const stub1 = sinon.stub(Math, 'random').returns(0);
		const result1 = randomUtils.getRandomWeightedValue(values);
		expect(result1).toEqual('a');
		stub1.restore();

		const stub2 = sinon.stub(Math, 'random').returns(0.1666);
		const result2 = randomUtils.getRandomWeightedValue(values);
		expect(result2).toEqual('a');
		stub2.restore();

		// any random number between 0.166666 and 0.5 should return "b"
		const stub3 = sinon.stub(Math, 'random').returns(0.17);
		const result3 = randomUtils.getRandomWeightedValue(values);
		expect(result3).toEqual('b');
		stub3.restore();

		const stub4 = sinon.stub(Math, 'random').returns(0.3333);
		const result4 = randomUtils.getRandomWeightedValue(values);
		expect(result4).toEqual('b');
		stub4.restore();

		const stub5 = sinon.stub(Math, 'random').returns(0.5);
		const result5 = randomUtils.getRandomWeightedValue(values);
		expect(result5).toEqual('b');
		stub5.restore();

		// any random number above 0.5 should return "c"
		const stub6 = sinon.stub(Math, 'random').returns(0.500001);
		const result6 = randomUtils.getRandomWeightedValue(values);
		expect(result6).toEqual('c');
		stub6.restore();

		const stub7 = sinon.stub(Math, 'random').returns(1);
		const result7 = randomUtils.getRandomWeightedValue(values);
		expect(result7).toEqual('c');
		stub7.restore();
	});
});
