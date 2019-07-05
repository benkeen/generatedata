<?php

/**
 * Utility functions for use throughout the script.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Utils {

	// the Utils class memoizes a bunch of stuff to improve speed
	static $charLengthMemoized = false;
	static $letters     = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	static $consonants  = "BCDFGHJKLMNPQRSTVWXYZ";
	static $vowels      = "AEIOU";
	static $hex         = "0123456789ABCDEF";
	static $lettersLen;
	static $consonantsLen;
	static $vowelsLen;
	static $hexLen;

	static $lipsumMemoized = false;
	static $lipsum;


	public static function cleanHash($hash) {
		$cleanHash = $hash;
		if (get_magic_quotes_gpc()) {
			while (list($key, $value) = each($hash)) {
				if (!is_array($value)) {
					$cleanHash[$key] = stripslashes($value);
				} else {
					$cleanArray = array();
					foreach ($value as $val) {
						$cleanArray[] = stripslashes($val);
					}
					$cleanHash[$key] = $cleanArray;
				}
			}
		}
		return $cleanHash;
	}


	/**
	 * A generic assertion function used to confirm the existence of things like the existence of values in $_POST,
	 * $_GET, $_SESSIONS, whether the user is logged in and so on. If it fails anything, it throws a GDException,
	 * otherwise it does nothing.
	 * @param $statements
	 * @throws GDException
	 */
	public static function assert($statements) {
		if (empty($statements)) {
			return;
		}

		 while (list($test, $values) = each($statements)) {
			 switch ($test) {
				 case "loggedIn":
					if (empty(Core::$user)) {
						throw new GDException(Exceptions::NOTLOGGEDIN);
						return;
					}
					 break;

				 case "noSettingsFile":
					 $settingsFileAndPath = realpath(__DIR__ . "/../settings.php");
					 $settingsFileExists = file_exists($settingsFileAndPath);
					if ($values === true && $settingsFileExists) {
						throw new GDException(Exceptions::SETTINGSFILEEXISTS);
					}
					 break;
			 }
		}
	}


	/**
	 * Recursively sanitizes data stored in any non-object data format, preparing it
	 * for safe use in SQL statements.
	 */
	public static function sanitize($input) {
		if (is_array($input)) {
			$output = array();
			foreach ($input as $k=>$i) {
				$output[$k] = Utils::sanitize($i);
			}
		} else {
			if (get_magic_quotes_gpc()) {
				$output = stripslashes($input);
			} else {
				$output = $input;
			}
		}

		return $output;
	}


	/**
	 * Returns a random subset of an array. The result may be empty, or the same set.
	 *
	 * @param array $set set of items
	 * @param integer $num the number of items in the set to return
	 * @return array
	 * @throws Exception
	 */
	public static function returnRandomSubset($set, $num) {
		if (!is_array($set) || !is_numeric($num)) {
			throw new Exception(ErrorCodes::INVALID_PARAMS);
			return;
		}
		// check $num is no greater than the total set
		$numInSet = count($set);
		if ($num > $numInSet) {
			$num = $numInSet;
		}
		shuffle($set);
		return array_slice($set, 0, $num);
	}

	/**
	 * Converts a datetime to a timestamp.
	 * @param $datetime
	 * @return int
	 */
	public static function convertDatetimeToTimestamp($datetime) {
		list($date, $time) = explode(" ", $datetime);
		list($year, $month, $day) = explode("-", $date);
		list($hours, $minutes, $seconds) = explode(":", $time);
		return mktime($hours, $minutes, $seconds, $month, $day, $year);
	}

	/**
	 * @return string
	 */
	public static function getCurrentDatetime() {
		return date("Y-m-d H:i:s");
	}

	/**
	 * Adds years to a MySQL datetime & returns a UNIX timestamp of the new date
	 */
	public static function addYearsToDatetime($datetime, $yearsToAdd) {
		list($date, $time) = explode(" ", $datetime);
		list($year, $month, $day) = explode("-", $date);
		list($hours, $minutes, $seconds) = explode(":", $time);
		return mktime($hours, $minutes, $seconds, $month, $day, $year+$yearsToAdd);
	}

	/**
	 * This function is like rand, only allows it to be weighted.
	 *
	 * @param $weightedValues
	 * @return int|string
	 */
	public static function weightedRand($weightedValues) {
		$rand = mt_rand(1, (int) array_sum($weightedValues));
		foreach ($weightedValues as $key => $value) {
			$rand -= $value;
			if ($rand <= 0) {
				return $key;
			}
		}
	}

	/**
	 * A security-related function. This returns a clean version of PHP_SELF for use in the templates. This wards
	 * against URI Cross-site scripting attacks.
	 *
	 * @return the cleaned $_SERVER["PHP_SELF"]
	 */
	public static function getCleanPhpSelf() {
		return htmlspecialchars(strip_tags($_SERVER['PHP_SELF']), ENT_QUOTES);
	}

	/**
	 * Converts the following characters in the parameter string and returns it:
	 *
	 *     C, c, A - any consonant (Upper case, lower case, any)
	 *     V, v, B - any vowel (Upper case, lower case, any)
	 *     L, l, D - any letter (Upper case, lower case, any)
	 *     X       - 1-9
	 *     x       - 0-9
	 *     H       - 0-F
	 *
	 * @param string
	 * @return string
	 */
	static public function generateRandomAlphanumericStr($str) {

		// simple memoization to GREATLY increase speed for this heavily-relied on function
		if (!self::$charLengthMemoized) {
			self::$lettersLen    = strlen(self::$letters);
			self::$consonantsLen = strlen(self::$consonants);
			self::$vowelsLen     = strlen(self::$vowels);
			self::$hexLen        = strlen(self::$hex);
			self::$charLengthMemoized = true;
		}


		// loop through each character and convert all unescaped X's to 1-9 and
		// unescaped x's to 0-9.
		$new_str = "";
		$strlen = strlen($str);
		for ($i=0; $i<$strlen; $i++) {
			switch ($str[$i]) {
				// Numbers
				case "X": $new_str .= mt_rand(1, 9);  break;
				case "x": $new_str .= mt_rand(0, 9);  break;

				// Letters
				case "L": $new_str .= self::$letters[mt_rand(0, self::$lettersLen-1)]; break;
				case "l": $new_str .= strtolower(self::$letters[mt_rand(0, self::$lettersLen-1)]); break;
				case "D":
					$bool = mt_rand()&1;
					if ($bool) {
						$new_str .= self::$letters[mt_rand(0, self::$lettersLen-1)];
					} else {
						$new_str .= strtolower(self::$letters[mt_rand(0, self::$lettersLen-1)]);
					}
					break;

				// Consonants
				case "C": $new_str .= self::$consonants[mt_rand(0, self::$consonantsLen-1)];      break;
				case "c": $new_str .= strtolower(self::$consonants[mt_rand(0, self::$consonantsLen-1)]);  break;
				case "E":
					$bool = mt_rand()&1;
					if ($bool) {
						$new_str .= self::$consonants[mt_rand(0, self::$consonantsLen-1)];
					} else {
						$new_str .= strtolower(self::$consonants[mt_rand(0, self::$consonantsLen-1)]);
					}
					break;

				// Vowels
				case "V": $new_str .= self::$vowels[mt_rand(0, self::$vowelsLen-1)];  break;
				case "v": $new_str .= strtolower(self::$vowels[mt_rand(0, self::$vowelsLen-1)]);  break;
				case "F":
					$bool = mt_rand()&1;
					if ($bool) {
						$new_str .= self::$vowels[mt_rand(0, self::$vowelsLen-1)];
					} else {
						$new_str .= strtolower(self::$vowels[mt_rand(0, self::$vowelsLen-1)]);
					}
					break;

				case "H":
					$new_str .= self::$hex[mt_rand(0, self::$hexLen-1)];
					break;

				default:
					$new_str .= $str[$i];
					break;
			}
		}

		return trim($new_str);
	}


	/**
	 * Returns an array of lorem ipsum words. Assumes that a file exists in a misc/ subfolder called
	 * loremipsum.txt, containing lorem ipsum text.
	 *
	 * @return array a large array of words
	 */
	public static function getLipsum() {
		if (!self::$lipsumMemoized) {
			$prefix = Core::getDbTablePrefix();

			// grab all the words in the text files & put them in an array (1 word per index)
			$response = Core::$db->query("
				SELECT *
				FROM {$prefix}settings
				WHERE setting_name = 'lipsum'
			");

			if ($response["success"]) {
				$info = mysqli_fetch_assoc($response["results"]);
				self::$lipsum = preg_split("/\s+/", $info["setting_value"]);
			}
			self::$lipsumMemoized = true;
		}

		return self::$lipsum;
	}


	/**
	 * Generates a string of lorem ipsum words.
	 *
	 * @param string $starts_with_lipsum  - true/false
	 * @param string $type                - "fixed"/"range"
	 * @param integer $min     - the minimum # of words to return OR the total number
	 * @param integer $max     - the max # of words to return (or null for "fixed" type)
	 */
	public static function generateRandomTextStr($words, $startsWithLipsum, $type, $min, $max = "", $maxChars = 0) {

		// determine the number of words to return
		if ($type == "fixed") {
			$numWords = $min;
		} else if ($type == "range") {
			$numWords = mt_rand($min, $max);
		}

		$totalWords = count($words);
		if ($numWords > $totalWords) {
			$numWords = $totalWords;
		}

		// determine the offset
		$offset = 0;
		if (!$startsWithLipsum) {
			$offset = mt_rand(2, $totalWords - ($numWords + 1));
		}
		$wordArray = array_slice($words, $offset, $numWords);

//		return join(" ", $wordArray);
		$return_str = join(" ", $wordArray);
                if ( $maxChars > 0 ) {
                    error_log( "maxChars: $maxChars" );
                    $return_str = substr( $return_str, 0, $maxChars );
                } else {
                    error_log( "No maxChars" );
                }
                return $return_str;
	}


	/**
	 * Converts all x's and X's in a string with a random digit. X's: 1-9, x's: 0-9.
	 */
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


	public static function maybeShowInstallationPage() {
		if (!Core::checkIsInstalled()) {
			$query_string = (isset($_GET["source"]) && in_array($_GET["source"], array("fromerrorpage"))) ?
				"?source={$_GET["source"]}" : "";

			header("location: install.php{$query_string}");
			exit;
		}
	}

	public static function enquoteArray($arr, $char = "\"") {
		$newArr = array();
		foreach ($arr as $item) {
			$newArr[] = "{$char}$item{$char}";
		}
		return $newArr;
	}

	public static function isHash($var) {
		if (!is_array($var)) {
			return false;
		}
		return array_keys($var) !== range(0, sizeof($var) - 1);
	}

	/**
	 * A method to recursively encode an array (associative or indexed).
	 * @param array
	 * @return array
	 */
	public static function utf8_encode_array($array) {

		// if the parameter wasn't an array, explicitly return false
		if (!is_array($array)) {
			return false;
		}

		$resultArray = array();
		foreach ($array as $key => $value) {
			if (Utils::isHash($array)) {
				if (is_array($value)) {
					$resultArray[utf8_encode($key)] = Utils::utf8_encode_array($value);
				} else {
					if (is_string($value)) {
						$resultArray[utf8_encode($key)] = utf8_encode($value);
					} else {
						$resultArray[utf8_encode($key)] = $value;
					}
				}
			} else {
				if (is_array($value)) {
					$resultArray[$key] = Utils::utf8_encode_array($value);
				} else {
					if (is_string($value)) {
						$resultArray[$key] = utf8_encode($value);
					} else {
						$resultArray[$key] = $value;
					}
				}
			}
		}
		return $resultArray;
	}

	/**
	 * Returns a human-readable version of the JSON error codes, listed here:
	 * http://php.net/manual/en/function.json-last-error.php
	 * @param error
	 * @return string
	 */
	public static function getJSONErrorMessage($errorCode) {
		$map = array(
			JSON_ERROR_NONE           => "No error has occurred (JSON_ERROR_NONE)",
			JSON_ERROR_DEPTH          => "The maximum stack depth has been exceeded (JSON_ERROR_DEPTH)",
			JSON_ERROR_STATE_MISMATCH => "Invalid or malformed JSON (JSON_ERROR_STATE_MISMATCH)",
			JSON_ERROR_CTRL_CHAR      => "Control character error, possibly incorrectly encoded (JSON_ERROR_CTRL_CHAR)",
			JSON_ERROR_SYNTAX         => "Syntax error (JSON_ERROR_SYNTAX)"
		);

		// now add the lah-de-dah fancy ones added in PHP versions > 5.3
		if (defined('JSON_ERROR_UTF8')) {
			$map[JSON_ERROR_UTF8] = "Malformed UTF-8 characters, possibly incorrectly encoded (JSON_ERROR_UTF8)";
		}
		if (defined('JSON_ERROR_RECURSION')) {
			$map[JSON_ERROR_UTF8] = "One or more recursive references in the value to be encoded (JSON_ERROR_RECURSION)";
		}
		if (defined('JSON_ERROR_INF_OR_NAN')) {
			$map[JSON_ERROR_UTF8] = "One or more NAN or INF values in the value to be encoded (JSON_ERROR_INF_OR_NAN)";
		}
		if (defined('JSON_ERROR_UNSUPPORTED_TYPE')) {
			$map[JSON_ERROR_UTF8] = "A value of a type that cannot be encoded was given (JSON_ERROR_UNSUPPORTED_TYPE)";
		}

		return (array_key_exists($errorCode, $map)) ? $map[$errorCode] : "Unknown JSON error" . JSON_ERROR_SYNTAX;
	}


	public static function validateJSON($json) {
		// try decoding the input to see if it's valid or not
		$data = @json_decode($json);
		if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
			return Utils::getJSONErrorMessage(json_last_error());
		}
	}

}
