<?php


function gd_clean_hash($hash)
{
  $clean_hash = $hash;

  if (get_magic_quotes_gpc())
  {
    while (list($key, $value) = each($hash))
    {
      if (!is_array($value))
        $clean_hash[$key] = stripslashes($value);
      else
      {
        $clean_array = array();
        foreach ($value as $val)
          $clean_array[] = stripslashes($val);
        $clean_hash[$key] = $clean_array;
      }
    }
  }

  return $clean_hash;
}


/**
 * Recursively sanitizes data stored in any non-object data format, preparing it
 * for safe use in SQL statements.
 */
function gd_sanitize($input)
{
  if (is_array($input))
  {
    $output = array();
    foreach ($input as $k=>$i)
      $output[$k] = gd_sanitize($i);
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
function gd_return_random_subset($set, $num)
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
function gd_convert_datetime_to_timestamp($datetime)
{
  list($date, $time) = explode(" ", $datetime);
  list($year, $month, $day) = explode("-", $date);
  list($hours, $minutes, $seconds) = explode(":", $time);

  return mktime($hours, $minutes, $seconds, $month, $day, $year);
}


/**
 * Adds years to a MySQL datetime & returns a UNIX timestamp of the new date
 */
function gd_add_years_to_datetime($datetime, $years_to_add)
{
  list($date, $time) = explode(" ", $datetime);
  list($year, $month, $day) = explode("-", $date);
  list($hours, $minutes, $seconds) = explode(":", $time);

  return mktime($hours, $minutes, $seconds, $month, $day, $year+$years_to_add);
}


/**
 * Sorts a multidimensional (2 deep) array based on a particular key.
 *
 * @param array $array
 * @param mixed $key
 * @return array
 */
function gd_array_sort($array, $key)
{
  $sort_values = array();
  for ($i=0; $i<sizeof($array); $i++)
    $sort_values[$i] = $array[$i][$key];

  asort($sort_values);
  reset($sort_values);
  while (list ($arr_key, $arr_val) = each($sort_values))
    $sorted_arr[] = $array[$arr_key];

  return $sorted_arr;
}


/**
 * This function is like rand
 *
 * @param unknown_type $weights
 * @return unknown
 */
function gd_weighted_rand($weights)
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
