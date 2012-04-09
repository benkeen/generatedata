<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Names_process_order = 1;

// global vars. Defining them here ensures they're only called & defined ONCE: when this file is initially
// included by the core script
$Names_male_names   = Names_get_firstnames("male");
$Names_female_names = Names_get_firstnames("female");
$Names_all_names    = array_merge($Names_male_names, $Names_female_names);
$Names_surnames     = Names_get_surnames();


/**
 * --- Required function! ---
 *
 * Called by process.php when the user has chosen to generate the data. This determines what options the user
 * selected in the user interface; it's used to figure out what settings to pass to [NAMESPACE]_generate_item(),
 * to provide that function the information needed to generate that particular data item.
 *
 * Note: if this function determines that the values entered by the user in the options column are invalid
 * (most likely just incomplete) the function can explicitly return false to tell the core script to ignore
 * this row.
 *
 * @param array $postdata
 * @param integer the column number (well, *row* in the UI!) of the item
 */
function Names_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["option_$col"]))
    return false;

  return $postdata["option_$col"];
}


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param integer $row the row number in the generated content
 * @param mixed $options whatever options were passed for this function (string in this case)
 * @param array $metadata
 * @return string
 */
function Names_generate_item($row, $str, $existing_row_data)
{
  global $Names_male_names, $Names_female_names, $Names_all_names, $Names_surnames;

  $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  while (preg_match("/MaleName/", $str))
    $str = preg_replace("/MaleName/", Names_get_random_name($Names_male_names), $str, 1);
  while (preg_match("/FemaleName/", $str))
    $str = preg_replace("/FemaleName/", Names_get_random_name($Names_female_names), $str, 1);
  while (preg_match("/Name/", $str))
    $str = preg_replace("/Name/", Names_get_random_name($Names_all_names), $str, 1);
  while (preg_match("/Surname/", $str))
    $str = preg_replace("/Surname/", $Names_surnames[rand(0, count($Names_surnames)-1)], $str, 1);
  while (preg_match("/Initial/", $str))
    $str = preg_replace("/Initial/", $letters[rand(0, strlen($letters)-1)], $str, 1);

  // in case the user entered multiple | separated formats, pick one
  $formats = explode("|", $str);
  $chosen_format = $formats[0];
  if (count($formats) > 1)
  	$chosen_format = $formats[rand(0, count($formats)-1)];

  return trim($chosen_format);
}


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param string $export_type e.g. "sql"
 * @param mixed $options e.g. "mysql" or "oracle"
 * @return string
 */
function Names_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(255) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(255) default NULL";
  	  break;
  }

  return $info;
}

// ------------------------------------------------------------------------------------------------


/**
 * Returns an array of first names.
 *
 * @param string gender - "male", "female", or empty for either
 */
function Names_get_firstnames($gender = "")
{
  global $g_table_prefix;

  if (!empty($gender))
    $where_clause = "WHERE gender='$gender'";

  // first name
  $query = mysql_query("
    SELECT first_name
    FROM   {$g_table_prefix}first_names
    $where_clause
      ");

  $names = array();
  while ($name = mysql_fetch_assoc($query))
    $names[] = $name['first_name'];

  return $names;
}


/**
 * Returns an array of surnames.
 */
function Names_get_surnames()
{
  global $g_table_prefix;

  // first name
  $query = mysql_query("
    SELECT surname
    FROM   {$g_table_prefix}surnames
      ");

  $names = array();
  while ($name = mysql_fetch_assoc($query))
    $names[] = $name['surname'];

  return $names;
}


/**
 * Returns a random name.
 */
function Names_get_random_name($name_array)
{
  return $name_array[rand(0, count($name_array)-1)];
}
