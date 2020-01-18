const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
const vowels = 'AEIOU';
const hex = '0123456789ABCDEF';
const lettersLen = letters.length;
const consonantsLen = consonants.length;
const vowelsLen = vowels.length;
const hexLen = hex.length;

// TODO should accommodate negative numbers
export const getRandomNum = (min: number, max: number) => {
	const range = Math.abs(max - min);
	let val = Math.round(Math.random() * range);
	if (min < 0) {
		val -= Math.abs(min);
	} else {
		val += Math.abs(min);
	}
	return val;
};

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
export const getRandomSubset = (arr: any[], size: number) => {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
	return shuffled.slice(min);
};


/**
 * Generates a string of lorem ipsum words.
 */
export const generateRandomTextStr = (words: string[], startsWithLipsum: boolean, min: number, max?: number) => {
	let numWords = (max) ? getRandomNum(min, max) : min;

	const totalWords = words.length;
	if (numWords > totalWords) {
		numWords = totalWords;
	}
	let offset = 0;
	if (!startsWithLipsum) {
		offset = getRandomNum(2, totalWords - (numWords + 1));
	}
	return words.slice(offset, numWords).join(' ');
};


// Converts all x's and X's in a string with a random digit. X's: 1-9, x's: 0-9.
/*public static function generateRandomNumStr($str) {
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
}*/

