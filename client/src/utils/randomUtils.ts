export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowercaseLetters = letters.toLowerCase();
export const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
export const lowercaseConsonants = consonants.toLowerCase();
export const vowels = 'AEIOU';
export const lowercaseVowels = vowels.toLowerCase();
export const hex = '0123456789ABCDEF';

// TODO should accommodate negative numbers
export const getRandomNum = (min: number, max: number): number => {
	const range = Math.abs(max - min);
	let val = Math.round(Math.random() * range);
	if (min < 0) {
		val -= Math.abs(min);
	} else {
		val += Math.abs(min);
	}
	return val;
};

export const getRandomBool = (): boolean => Math.random() < 0.5;
export const getRandomArrayValue = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomCharInString = (str: string): string => {
	const index = getRandomNum(0, str.length - 1);
	return str[index];
};

export const defaultPlaceholders = {
	X: '123456789',
	x: '0123456789',
	L: letters,
	l: lowercaseLetters,
	D: letters + lowercaseLetters,
	C: consonants,
	c: lowercaseConsonants,
	E: consonants + lowercaseConsonants,
	V: vowels,
	v: lowercaseVowels,
	F: vowels + lowercaseVowels,
	H: hex
};

/**
 * Converts the following characters in the parameter string and returns the random string.
 *     C, c, E - any consonant (Upper case, lower case, any)
 *     V, v, F - any vowel (Upper case, lower case, any)
 *     L, l, D - any letter (Upper case, lower case, any)
 *     X       - 1-9
 *     x       - 0-9
 *     H       - 0-F
 */
export const generateRandomAlphanumericStr = (str: string, placeholders: any = defaultPlaceholders): string => {
	if (!str) {
		return '';
	}
	let newStr = '';
	for (let i = 0, j = str.length; i < j; i++) {
		if (placeholders.hasOwnProperty(str[i])) {
			newStr += placeholders[str[i]][getRandomNum(0, placeholders[str[i]].length-1)];
		} else {
			newStr += str[i];
		}
	}
	return newStr.trim();
};

// Returns a random subset of an array of a particular size. The result may be empty, or the same set.
export const getRandomSubset = <T> (arr: T[], size: number): T[] => {
	const shuffled = arr.slice(0);
	let totalArrSize = arr.length;
	const min = totalArrSize - size;

	while (totalArrSize-- > min) {
		const index = Math.floor((totalArrSize + 1) * Math.random());
		const temp = shuffled[index];
		shuffled[index] = shuffled[totalArrSize];
		shuffled[totalArrSize] = temp;
	}
	return shuffled.slice(min);
};

export const getRandomWeightedSubset = (options: WeightedOptions, size: number, allowDuplicates: boolean): string[] => {
	const subset: string[] = [];
	const weightedOptions = {
		...options
	};
	let totalArrSize = Object.keys(weightedOptions).length;

	if (!totalArrSize) {
		return subset;
	}

	while (subset.length < size && totalArrSize > 0) {
		const value = getRandomWeightedValue(weightedOptions);
		subset.push(value);
		if (!allowDuplicates) {
			delete weightedOptions[value];
			totalArrSize = totalArrSize-1;
		}
	}

	return subset;
};

/**
 * Generates a string of words from a source array of strings.
 */
export const generateRandomTextStr = (words: string[], fromStart: boolean, min: number, max?: number): string => {
	let numWords = (max) ? getRandomNum(min, max) : min;

	const totalWords = words.length;
	if (numWords > totalWords) {
		numWords = totalWords;
	}

	if (numWords === 0) {
		return '';
	}

	if (fromStart) {
		return words.slice(0, numWords).join(' ');
	} else {
		const offset = getRandomNum(0, totalWords - 1 - numWords);
		return words.slice(offset, offset + numWords).join(' ');
	}
};

export const generatePlaceholderStr = (str: string, customPlaceholders: any): string => {
	const placeholders = {
		...defaultPlaceholders,
		...customPlaceholders
	};
	return generateRandomAlphanumericStr(str, placeholders);
};

export type WeightedOptions = {
	[option: string]: number;
};

// pass in an object like { a: 10, b: 4, c: 400 } and it'll return either "a", "b", or "c", factoring in their respective
// weight. So in this example, "c" is likely to be returned 400 times out of 414
export const getRandomWeightedValue = (options: WeightedOptions): string => {
	const keys = Object.keys(options);
	const totalSum = keys.reduce((acc, item) => acc + options[item], 0);

	let runningTotal = 0;
	const cumulativeValues = keys.map((key) => {
		const relativeValue = options[key]/totalSum;
		const cv = {
			key,
			value: relativeValue + runningTotal
		};
		runningTotal += relativeValue;
		return cv;
	});

	if (keys.length === 0) {
		return '';
	}

	const r = Math.random();
	return cumulativeValues.find(({ value }) => r <= value)!.key;
};
