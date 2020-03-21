export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowercaseLetters = letters.toLowerCase();
export const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
export const lowercaseConsonants = consonants.toLowerCase();
export const vowels = 'AEIOU';
export const lowercaseVowels = vowels.toLowerCase();
export const hex = '0123456789ABCDEF';

const lettersLen = letters.length;
const consonantsLen = consonants.length;
const vowelsLen = vowels.length;
const hexLen = hex.length;

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

/**
 * Converts the following characters in the parameter string and returns the random string.
 *     C, c, E - any consonant (Upper case, lower case, any)
 *     V, v, F - any vowel (Upper case, lower case, any)
 *     L, l, D - any letter (Upper case, lower case, any)
 *     X       - 1-9
 *     x       - 0-9
 *     H       - 0-F
 */
export const generateRandomAlphanumericStr = (str: string): string => {
	if (!str) {
		return '';
	}

	// loop through each character and convert all unescaped X's to 1-9 and unescaped x's to 0-9
	let newStr = '';
	for (let i = 0, j = str.length; i < j; i++) {
		switch (str[i]) {
			// Numbers
			case 'X': newStr += getRandomNum(1, 9); break;
			case 'x': newStr += getRandomNum(0, 9); break;

			// Letters
			case 'L': newStr += letters[getRandomNum(0, lettersLen - 1)]; break;
			case 'l': newStr += lowercaseLetters[getRandomNum(0, lettersLen - 1)]; break;
			case 'D':
				if (getRandomBool()) {
					newStr += letters[getRandomNum(0, lettersLen - 1)];
				} else {
					newStr += lowercaseLetters[getRandomNum(0, lettersLen - 1)];
				}
				break;

			// Consonants
			case 'C': newStr += consonants[getRandomNum(0, consonantsLen - 1)]; break;
			case 'c': newStr += lowercaseConsonants[getRandomNum(0, consonantsLen - 1)]; break;
			case 'E':
				if (getRandomBool()) {
					newStr += consonants[getRandomNum(0, consonantsLen - 1)];
				} else {
					newStr += lowercaseConsonants[getRandomNum(0, consonantsLen - 1)];
				}
				break;

			// Vowels
			case 'V': newStr += vowels[getRandomNum(0, vowelsLen - 1)]; break;
			case 'v': newStr += lowercaseVowels[getRandomNum(0, vowelsLen - 1)]; break;
			case 'F':
				if (getRandomBool()) {
					newStr += vowels[getRandomNum(0, vowelsLen - 1)];
				} else {
					newStr += lowercaseVowels[getRandomNum(0, vowelsLen - 1)];
				}
				break;

			case 'H':
				newStr += hex[getRandomNum(0, hexLen - 1)];
				break;

			default:
				newStr += str[i];
				break;
		}
	}

	return newStr.trim();
};

// Returns a random subset of an array. The result may be empty, or the same set.
export const getRandomSubset = <T> (arr: T[], size: number): T[] => {
	const shuffled = arr.slice(0);
	let i = arr.length;
	const min = i - size;

	while (i-- > min) {
		const index = Math.floor((i + 1) * Math.random());
		const temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
};


/**
 * Generates a string of lorem ipsum words.
 */
export const generateRandomTextStr = (words: string[], startsWithLorem: boolean, min: number, max?: number): string => {
	let numWords = (max) ? getRandomNum(min, max) : min;

	const totalWords = words.length;
	if (numWords > totalWords) {
		numWords = totalWords;
	}

	if (startsWithLorem) {
		return words.slice(0, numWords).join(' ');
	} else {
		const withoutLorem = words.slice(1);
		const offset = getRandomNum(0, totalWords - 1 - numWords);
		return withoutLorem.slice(offset, offset + numWords).join(' ');
	}
};


// Converts all x's and X's in a string with a random digit. X's: 1-9, x's: 0-9.
/*
public static function generateRandomNumStr($str) {
	// loop through each character and convert all unescaped X's to 1-9 and unescaped x's to 0-9.
	$new_str = "";
	$strlen = strlen($str);
	for ($i=0; $i<$strlen; $i++) {
		if ($str[$i] == '\\' && ($str[$i+1] == "X" || $str[$i+1] == "x")) {
			continue;
		} else if ($str[$i] == "X") {
			if ($i != 0 && ($str[$i-1] == '\\')) {
				$new_str .= "X";
			} else {
				$new_str .= mt_rand(1, 9);
			}
		} else if ($str[$i] == "x") {
			if ($i != 0 && ($str[$i-1] == '\\')) {
				$new_str .= "x";
			} else {
				$new_str .= mt_rand(0, 9);
			}
		} else {
			$new_str .= $str[$i];
		}
	}

	return trim($new_str);
}
*/
