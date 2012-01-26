<?php
/*------------------------------------------------------------------------------------------------*\

  generator.php
  -------------
  Generic helper function for use by the data types.

/*------------------------------------------------------------------------------------------------*\


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
function get_cities()
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
 * Converts the following characters in the string and returns it:
 *
 *     C, c, A - any consonant (Upper case, lower case, any)
 *     V, v, B - any vowel (Upper case, lower case, any)
 *     L, l, V - any letter (Upper case, lower case, any)
 *     X       - 1-9
 *     x       - 0-9
 *     H       - 0-F
 */
function gd_generate_random_alphanumeric_str($str)
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
 * This is used to generate custom XML structures (added on 2.3.6).
 *
 * @param string $custom_xml_structure
 * @param array $g_template
 * @param integer $num_rows
 */
function gd_generate_custom_xml($custom_xml_structure, $g_template, $num_rows)
{
  global $LANG;

  $xml = "";

  // first, add the chunk of markup between the records tag. Note the "is" bit. That tells
  // the regexp parser to let . match newline characters and that it should be case
  // insensitive
  preg_match("/(.*)\{records\}(.*)\{\/records\}(.*)/is", $custom_xml_structure, $matches);

  if (count($matches) < 2)
  {
  	echo "<error>{$LANG["invalid_custom_xml"]}</error>";
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

