<?php


/**
 * Utility functions for use throughout the script.
 */
class Utils
{
  public static function cleanHash($hash)
  {
    $cleanHash = $hash;
    if (get_magic_quotes_gpc())
    {
      while (list($key, $value) = each($hash))
      {
        if (!is_array($value))
          $cleanHash[$key] = stripslashes($value);
        else
        {
          $cleanArray = array();
          foreach ($value as $val)
            $cleanArray[] = stripslashes($val);
          $cleanHash[$key] = $cleanArray;
        }
      }
    }
    return $cleanHash;
  }


  /**
   * Recursively sanitizes data stored in any non-object data format, preparing it
   * for safe use in SQL statements.
   */
  public static function sanitize($input)
  {
    if (is_array($input))
    {
      $output = array();
      foreach ($input as $k=>$i)
        $output[$k] = self::sanitize($i);
    }
    else
    {
      if (get_magic_quotes_gpc())
        $output = stripslashes($input);
    }

    return $output;
  }


	/**
	 * Returns a random subset of an array. The result may be empty, or the same set.
	 *
	 * @param array $set - the set of items
	 * @param integer $num - the number of items in the set to return
	 */
	public static function returnRandomSubset($set, $num)
	{
	  // check $num is no greater than the total set
	  if ($num > count($set))
	    $num = count($set);

	  shuffle($set);
	  return array_slice($set, 0, $num);
	}


	/**
	 * Converts a datetime to a timestamp.
	 */
	public static function convertDatetimeToTimestamp($datetime)
	{
	  list($date, $time) = explode(" ", $datetime);
	  list($year, $month, $day) = explode("-", $date);
	  list($hours, $minutes, $seconds) = explode(":", $time);
	  return mktime($hours, $minutes, $seconds, $month, $day, $year);
	}


	/**
	 * Adds years to a MySQL datetime & returns a UNIX timestamp of the new date
	 */
	public static function addYearsToDatetime($datetime, $yearsToAdd)
	{
	  list($date, $time) = explode(" ", $datetime);
	  list($year, $month, $day) = explode("-", $date);
	  list($hours, $minutes, $seconds) = explode(":", $time);
	  return mktime($hours, $minutes, $seconds, $month, $day, $year+$yearsToAdd);
	}


	/**
	 * Sorts a multidimensional (2 deep) array based on a particular key.
	 *
	 * @param array $array
	 * @param mixed $key
	 * @return array
	 */
	public static function arraySort($array, $key)
	{
	  $sortValues = array();
	  for ($i=0; $i<sizeof($array); $i++)
	    $sortValues[$i] = $array[$i][$key];

	  asort($sortValues);
	  reset($sortValues);
	  while (list($k, $v) = each($sortValues))
	    $sortedArr[] = $array[$k];

	  return $sortedArr;
	}


	/**
	 * This function is like rand, only allows it to be weighted.
	 *
	 * @param array $weights
	 * @return integer
	 */
	public static function weightedRand($weights)
	{
	  $r = mt_rand(1, 1000);
	  $offset = 0;
	  foreach ($weights as $k => $w)
	  {
	    $offset += $w * 1000;
	    if ($r <= $offset)
	      return $k;
	  }
	}


	/**
	 * A security-related function. This returns a clean version of PHP_SELF for use in the templates. This wards
	 * against URI Cross-site scripting attacks.
	 *
	 * @return the cleaned $_SERVER["PHP_SELF"]
	 */
	public static function getCleanPhpSelf()
	{
	  return htmlspecialchars(strip_tags($_SERVER['PHP_SELF']), ENT_QUOTES);
	}


	/**
	 * Used to generate the main index and install pages.
	 *
	 * @param string $template
	 * @param array $params
	 */
	static function displayPage($template, $pageVars)
	{
	  global $g_success, $g_message;

	  // common variables. These are sent to EVERY templates
	  Core::$smarty->template_dir = realpath(dirname(__FILE__) . "/../templates");
	  Core::$smarty->compile_dir  = realpath(dirname(__FILE__) . "/../cache");

	  // check the compile directory has the write permissions
	  if (!is_writable(Core::$smarty->compile_dir))
	  {
	    Utils::displaySeriousError("The <b>/cache</b> folder isn't writable. This folder is used by Smarty to generate temporary files for speedy page loads. You'll need to update that folder's permissions to allow read and write permissions (777 on unix/mac).");
	    exit;
	  }

	  // check that the user is running PHP 5 - TODO
	  Core::$smarty->assign("L", Core::getCurrentLanguageStrings());
	  //Core::$smarty->assign("SESSION", $_SESSION["gd"]);
	  Core::$smarty->assign("version", Core::getVersion());
	  Core::$smarty->assign("samePage", Utils::getCleanPhpSelf());
	  Core::$smarty->assign("dbTablePrefix", Core::getDbTablePrefix());
	  Core::$smarty->assign("query_string", $_SERVER["QUERY_STRING"]);

	  //Core::$smarty->assign("g_success", $g_success);
	  //Core::$smarty->assign("g_message", $g_message);

	  // now add the custom variables for this template, as defined in $page_vars
	  foreach ($pageVars as $key=>$value)
	    Core::$smarty->assign($key, $value);

	  Core::$smarty->display(realpath(dirname(__FILE__) . "/../$template"));

	  //gd_db_disconnect($g_link);
	}


	/**
	 * This is used for serious errors: when no database connection can be made or the Smarty cache folder isn't writable.
	 * All it does is output the error string with no other dependencies - not even language strings. The paths assume
	 * that we're in the application root (otherwise they won't work).
	 *
	 * This function only handles English. For problems of this severity, I think that's okay.
	 *
	 * @param string $error
	 */
	static function gd_display_serious_error($error)
	{
	  $not_fixed_message = "";
	  if (isset($_GET["source"]))
	  {
	    $not_fixed_message = "<div id=\"not_fixed\">Nope, ain't fixed yet. Try again.</div>";
	  }

	  echo <<< END
	<html>
	<head>
	  <title>Things just ain't right.</title>
	  <link rel="stylesheet" type="text/css" href="css/styles.css">
	  <script src="scripts/jquery-1.7.2.min.js"></script>
	  <script>
	  $(function() {
	    $("button").bind("click", function() { window.location = "index.php?source=fromerrorpage"; });
	  });
	  </script>
	</head>
	<body class="error_page">
	<div id="box">
	  <h1>Uh-oh.</h1>
	  $not_fixed_message
	  {$error}
	  <button class="greenButton">Click here when you think you've fixed it.</button>
	</div>
	</body>
	</html>
END;
  }

	function evalSmartyString($placeholderStr, $placeholders)
	{
	  global $g_smarty;

	  $smarty = new Smarty();
	  $smarty->template_dir = realpath(dirname(__FILE__) . "/../code/smarty");
	  $smarty->compile_dir  = realpath(dirname(__FILE__) . "/../cache");

	  $smarty->assign("eval_str", $placeholderStr);
	  if (!empty($placeholders))
	  {
	    while (list($key, $value) = each($placeholders))
	      $smarty->assign($key, $value);
	  }

	  return $smarty->fetch("eval.tpl");
	}

	/**
	 * Converts the following characters in the string and returns it:
	 *
	 *     C, c, A - any consonant (Upper case, lower case, any)
	 *     V, v, B - any vowel (Upper case, lower case, any)
	 *     L, l, V - any letter (Upper case, lower case, any)
	 *     X       - 1-9
	 *     x       - 0-9
	 *     H       - 0-F
	 */
	static public function generateRandomAlphanumericStr($str)
	{
	  $letters    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	  $consonants = "BCDFGHJKLMNPQRSTVWXYZ";
	  $vowels     = "AEIOU";
	  $hex        = "0123456789ABCDEF";

	  // loop through each character and convert all unescaped X's to 1-9 and
	  // unescaped x's to 0-9.
	  $new_str = "";
	  for ($i=0; $i<strlen($str); $i++)
	  {
	    switch ($str[$i])
	    {
	      // Numbers
	      case "X": $new_str .= rand(1,9);  break;
	      case "x": $new_str .= rand(0,9);  break;

	      // Letters
	      case "L": $new_str .= $letters[rand(0, strlen($letters)-1)]; break;
	      case "l": $new_str .= strtolower($letters[rand(0, strlen($letters)-1)]); break;
	      case "D":
	        $bool = rand()&1;
	        if ($bool)
	          $new_str .= $letters[rand(0, strlen($letters)-1)];
	        else
	          $new_str .= strtolower($letters[rand(0, strlen($letters)-1)]);
	        break;

	      // Consonants
	      case "C": $new_str .= $consonants[rand(0, strlen($consonants)-1)];      break;
	      case "c": $new_str .= strtolower($consonants[rand(0, strlen($consonants)-1)]);  break;
	      case "E":
	        $bool = rand()&1;
	        if ($bool)
	          $new_str .= $consonants[rand(0, strlen($consonants)-1)];
	        else
	          $new_str .= strtolower($consonants[rand(0, strlen($consonants)-1)]);
	        break;

	      // Vowels
	      case "V": $new_str .= $vowels[rand(0, strlen($vowels)-1)];  break;
	      case "v": $new_str .= strtolower($vowels[rand(0, strlen($vowels)-1)]);  break;
	      case "F":
	        $bool = rand()&1;
	        if ($bool)
	          $new_str .= $vowels[rand(0, strlen($vowels)-1)];
	        else
	          $new_str .= strtolower($vowels[rand(0, strlen($vowels)-1)]);
	        break;

	      case "H":
	      	$new_str .= $hex[rand(0, strlen($hex)-1)];
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
	 */
	function gd_get_lipsum()
	{
		global $g_table_prefix;

		// grab all the words in the text files & put them in an array (1 word per index)
		$query = mysql_query("SELECT * FROM {$g_table_prefix}loremipsum");

		$info = mysql_fetch_assoc($query);
		$words = preg_split("/\s+/", $info["lipsum"]);

		return $words;
	}


	/**
	 * Returns an array of cities
	 */
	function gd_get_cities()
	{
	  global $g_table_prefix;

	  $query = mysql_query("
	    SELECT city
	    FROM   {$g_table_prefix}cities
	      ");

	  $cities = array();
	  while ($city_info = mysql_fetch_assoc($query))
	    $cities[] = $city_info['city'];

	  return $cities;
	}


	/**
	 * Generates a string of lorem ipsum words.
	 *
	 * @param string $starts_with_lipsum  - true/false
	 * @param string $type                - "fixed"/"range"
	 * @param integer $min     - the minimum # of words to return OR the total number
	 * @param integer $max     - the max # of words to return (or null for "fixed" type)
	 */
	function gd_generate_random_text_str($words, $starts_with_lipsum, $type, $min, $max = "")
	{
	  // determine the number of words to return
	  $index = 0;
	  if      ($type == "fixed")
	    $num_words = $min;
	  else if ($type == "range")
	    $num_words = rand($min, $max);

	  if ($num_words > count($words))
	    $num_words = count($words);

	  // determine the offset
	  $offset = 0;
	  if (!$starts_with_lipsum)
	    $offset = rand(2, count($words) - ($num_words + 1));

	  $word_array = array_slice($words, $offset, $num_words);

	  return join(" ", $word_array);
	}


	/**
	 * Converts all x's and X's in a string with a random digit. X's: 1-9, x's: 0-9.
	 */
	function gd_generate_random_num_str($str)
	{
	  // loop through each character and convert all unescaped X's to 1-9 and
	  // unescaped x's to 0-9.
	  $new_str = "";
	  for ($i=0; $i<strlen($str); $i++)
	  {
	    if      ($str[$i] == '\\' && ($str[$i+1] == "X" || $str[$i+1] == "x"))
	      continue;
	    else if ($str[$i] == "X")
	    {
	      if ($i != 0 && ($str[$i-1] == '\\'))
	        $new_str .= "X";
	      else
	        $new_str .= rand(1,9);
	    }
	    else if ($str[$i] == "x")
	      if ($i != 0 && ($str[$i-1] == '\\'))
	        $new_str .= "x";
	      else
	        $new_str .= rand(0,9);
	    else
	      $new_str .= $str[$i];
	  }

	  return trim($new_str);
	}


	/**
	 * This is used to generate custom XML structures (added on 2.3.6).
	 *
	 * @param string $custom_xml_structure
	 * @param array $g_template
	 * @param integer $num_rows
	 */
	function gd_generate_custom_xml($custom_xml_structure, $g_template, $num_rows)
	{
	  global $L;

	  $xml = "";

	  // first, add the chunk of markup between the records tag. Note the "is" bit. That tells
	  // the regexp parser to let . match newline characters and that it should be case
	  // insensitive
	  preg_match("/(.*)\{records\}(.*)\{\/records\}(.*)/is", $custom_xml_structure, $matches);

	  if (count($matches) < 2)
	  {
	  	echo "<error>{$L["invalid_custom_xml"]}</error>";
	  	return;
	  }

	  $xml_start  = $matches[1];
	  $row_markup = $matches[2];
	  $xml_end    = $matches[3];

	  // now loop through the {records} and replace the appropriate placeholders with their rows
	  $xml_rows = "";
	  for ($row=1; $row<=$num_rows; $row++)
	  {
	    $placeholders = array();
	    while (list($order, $data_types) = each($g_template))
	    {
	      foreach ($data_types as $data_type)
	      {
	        $order = $data_type["column_num"];
	        $data_type_folder = $data_type["data_type_folder"];
	        $data_type_func = "{$data_type_folder}_generate_item";
	        $data_type["random_data"] = $data_type_func($row, $data_type["options"], $row_data);

	        if (is_array($data_type["random_data"]))
	          $placeholders["ROW{$order}"] = $data_type["random_data"]["display"];
	        else
	          $placeholders["ROW{$order}"] = $data_type["random_data"];
	      }
	    }
	    reset($g_template);

	    $row_markup_copy = $row_markup;
	    while (list($placeholder, $value) = each($placeholders))
	    {
	      $row_markup_copy = preg_replace("/\{$placeholder\}/", $value, $row_markup_copy);
	    }

	    $xml_rows .= $row_markup_copy;
	  }

	  $final_xml = $xml_start . $xml_rows . $xml_end;

	  return $final_xml;
	}
}
