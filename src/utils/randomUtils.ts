const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
const vowels = 'AEIOU';
const hex = '0123456789ABCDEF';
const lettersLen = letters.length;
const consonantsLen = consonants.length;
const vowelsLen = vowels.length;
const hexLen = hex.length;


export const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomBool = () => Math.random() < 0.5;
export const getRandomArrayValue = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
export const getRandomCharInString = (str: string) => {
    const index = getRandomNum(0, str.length-1);
    return str[index];
};

/**
 * Converts the following characters in the parameter string and returns it:
 *
 *     C, c, A - any consonant (Upper case, lower case, any)
 *     V, v, B - any vowel (Upper case, lower case, any)
 *     L, l, D - any letter (Upper case, lower case, any)
 *     X       - 1-9
 *     x       - 0-9
 *     H       - 0-F
 */
export const generateRandomAlphanumericStr = (str: string) => {
    if (!str) {
        return '';
    }

	// loop through each character and convert all unescaped X's to 1-9 and unescaped x's to 0-9
	let newStr = '';
	for (let i=0, j=str.length; i<j; i++) {
		switch (str[i]) {
			// Numbers
			case 'X': newStr += getRandomNum(1, 9); break;
			case 'x': newStr += getRandomNum(0, 9); break;

			// Letters
			case 'L': newStr += letters[getRandomNum(0, lettersLen-1)]; break;
			case 'l': newStr += letters[getRandomNum(0, lettersLen-1)].toLowerCase(); break;
			case 'D':
				if (getRandomBool()) {
					newStr += letters[getRandomNum(0, lettersLen-1)];
				} else {
					newStr += letters[getRandomNum(0, lettersLen-1)].toLowerCase();
				}
				break;

			// Consonants
			case 'C': newStr += consonants[getRandomNum(0, consonantsLen-1)]; break;
			case 'c': newStr += consonants[getRandomNum(0, consonantsLen-1)].toLowerCase(); break;
			case 'E':
				if (getRandomBool()) {
					newStr += consonants[getRandomNum(0, consonantsLen-1)];
				} else {
					newStr += consonants[getRandomNum(0, consonantsLen-1)].toLowerCase();
				}
				break;

			// Vowels
			case 'V': newStr += vowels[getRandomNum(0, vowelsLen-1)]; break;
			case 'v': newStr += vowels[getRandomNum(0, vowelsLen-1)].toLowerCase(); break;
			case 'F':
				if (getRandomBool()) {
					newStr += vowels[getRandomNum(0, vowelsLen-1)];
				} else {
					newStr += vowels[getRandomNum(0, vowelsLen-1)].toLowerCase();
				}
				break;

			case 'H':
				newStr += hex[getRandomNum(0, hexLen-1)];
				break;

			default:
				newStr += str[i];
				break;
		}
	}

	return newStr.trim();
};

// Returns a random subset of an array. The result may be empty, or the same set.
export const getRandomSubset = (arr: any[], num: number) => {
	if (num > arr.length) {
		num = arr.length;
	}
	// shuffle($set);

	// what's the most efficient way to do this method...?

	// return array_slice($set, 0, $num);
	return arr;
}
