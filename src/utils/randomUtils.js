"use strict";
exports.__esModule = true;
exports.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.lowercaseLetters = exports.letters.toLowerCase();
exports.consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
exports.lowercaseConsonants = exports.consonants.toLowerCase();
exports.vowels = 'AEIOU';
exports.lowercaseVowels = exports.vowels.toLowerCase();
exports.hex = '0123456789ABCDEF';
var lettersLen = exports.letters.length;
var consonantsLen = exports.consonants.length;
var vowelsLen = exports.vowels.length;
var hexLen = exports.hex.length;
// TODO should accommodate negative numbers
exports.getRandomNum = function (min, max) {
    var range = Math.abs(max - min);
    var val = Math.round(Math.random() * range);
    if (min < 0) {
        val -= Math.abs(min);
    }
    else {
        val += Math.abs(min);
    }
    return val;
};
exports.getRandomBool = function () { return Math.random() < 0.5; };
exports.getRandomArrayValue = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
exports.getRandomCharInString = function (str) {
    var index = exports.getRandomNum(0, str.length - 1);
    return str[index];
};
/**
 * Converts the following characters in the parameter string and returns it:
 *
 *     C, c, E - any consonant (Upper case, lower case, any)
 *     V, v, F - any vowel (Upper case, lower case, any)
 *     L, l, D - any letter (Upper case, lower case, any)
 *     X       - 1-9
 *     x       - 0-9
 *     H       - 0-F
 */
exports.generateRandomAlphanumericStr = function (str) {
    if (!str) {
        return '';
    }
    // loop through each character and convert all unescaped X's to 1-9 and unescaped x's to 0-9
    var newStr = '';
    for (var i = 0, j = str.length; i < j; i++) {
        switch (str[i]) {
            // Numbers
            case 'X':
                newStr += exports.getRandomNum(1, 9);
                break;
            case 'x':
                newStr += exports.getRandomNum(0, 9);
                break;
            // Letters
            case 'L':
                newStr += exports.letters[exports.getRandomNum(0, lettersLen - 1)];
                break;
            case 'l':
                newStr += exports.lowercaseLetters[exports.getRandomNum(0, lettersLen - 1)];
                break;
            case 'D':
                if (exports.getRandomBool()) {
                    newStr += exports.letters[exports.getRandomNum(0, lettersLen - 1)];
                }
                else {
                    newStr += exports.lowercaseLetters[exports.getRandomNum(0, lettersLen - 1)];
                }
                break;
            // Consonants
            case 'C':
                newStr += exports.consonants[exports.getRandomNum(0, consonantsLen - 1)];
                break;
            case 'c':
                newStr += exports.lowercaseConsonants[exports.getRandomNum(0, consonantsLen - 1)];
                break;
            case 'E':
                if (exports.getRandomBool()) {
                    newStr += exports.consonants[exports.getRandomNum(0, consonantsLen - 1)];
                }
                else {
                    newStr += exports.lowercaseConsonants[exports.getRandomNum(0, consonantsLen - 1)];
                }
                break;
            // Vowels
            case 'V':
                newStr += exports.vowels[exports.getRandomNum(0, vowelsLen - 1)];
                break;
            case 'v':
                newStr += exports.lowercaseVowels[exports.getRandomNum(0, vowelsLen - 1)];
                break;
            case 'F':
                if (exports.getRandomBool()) {
                    newStr += exports.vowels[exports.getRandomNum(0, vowelsLen - 1)];
                }
                else {
                    newStr += exports.lowercaseVowels[exports.getRandomNum(0, vowelsLen - 1)];
                }
                break;
            case 'H':
                newStr += exports.hex[exports.getRandomNum(0, hexLen - 1)];
                break;
            default:
                newStr += str[i];
                break;
        }
    }
    return newStr.trim();
};
// Returns a random subset of an array. The result may be empty, or the same set.
exports.getRandomSubset = function (arr, size) {
    var shuffled = arr.slice(0);
    var i = arr.length;
    var min = i - size;
    while (i-- > min) {
        var index = Math.floor((i + 1) * Math.random());
        var temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
};
/**
 * Generates a string of lorem ipsum words.
 */
exports.generateRandomTextStr = function (words, startsWithLorem, min, max) {
    var numWords = (max) ? exports.getRandomNum(min, max) : min;
    var totalWords = words.length;
    if (numWords > totalWords) {
        numWords = totalWords;
    }
    if (startsWithLorem) {
        return words.slice(0, numWords).join(' ');
    }
    else {
        var withoutLorem = words.slice(1);
        var offset = exports.getRandomNum(0, totalWords - 1 - numWords);
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
