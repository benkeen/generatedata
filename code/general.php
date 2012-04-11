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
 * This function is like rand, only allows it to be weighted.
 *
 * @param array $weights
 * @return integer
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


function gd_display_page()
{
  global $g_root_dir, $g_root_url, $g_success, $g_message, $g_link, $LANG, $g_smarty;

  // common variables. These are sent to EVERY templates
  $g_smarty->template_dir = "$g_root_dir/themes/$theme";
  $g_smarty->compile_dir  = "$g_root_dir/themes/$theme/cache";

  // check the compile directory has the write permissions
  if (!is_writable($g_smarty->compile_dir))
  {
    ft_display_serious_error("", "");
		exit;
  }

  $g_smarty->assign("LANG", $LANG);
  $g_smarty->assign("SESSION", $_SESSION["ft"]);
  $g_smarty->assign("account", $_SESSION["ft"]["account"]);
  $g_smarty->assign("g_root_dir", $g_root_dir);
  $g_smarty->assign("g_root_url", $g_root_url);
  $g_smarty->assign("same_page", ft_get_clean_php_self());
  $g_smarty->assign("query_string", $_SERVER["QUERY_STRING"]);

  // if this page has been told to dislay a custom message, override g_success and g_message
  if ((!isset($g_upgrade_info["message"]) || empty($g_upgrade_info["message"])) && isset($_GET["message"]))
  {
    list($g_success, $g_message) = ft_display_custom_page_message($_GET["message"]);
  }
  $g_smarty->assign("g_success", $g_success);
  $g_smarty->assign("g_message", $g_message);

  // check the "required" vars are at least set so they don't produce warnings when smarty debug is enabled
  if (!isset($page_vars["head_string"])) $page_vars["head_string"] = "";
  if (!isset($page_vars["head_js"]))     $page_vars["head_js"] = "";

  if (!empty($page_vars["head_js"]) || !empty($js_messages))
    $page_vars["head_js"] = "<script>\n//<![CDATA[\n{$page_vars["head_js"]}\n$js_messages\n//]]>\n</script>";

  if (!isset($page_vars["head_css"]))
    $page_vars["head_css"] = "";

  // now add the custom variables for this template, as defined in $page_vars
  foreach ($page_vars as $key=>$value)
    $g_smarty->assign($key, $value);

  $g_smarty->display($template);

  ft_db_disconnect($g_link);
}


/**
 * A helper function called when trying to render a Smarty template. It checks the Smarty cache
 * folder exists and is writable.
 *
 * @param boolean true if all is okay; false otherwise
 */
function gd_check_cache_folder_writable()
{
	$cache_folder = realpath(dirname(__FILE__) . "../cache");
  return (is_readable($cache_folder) && is_writable($cache_folder));
}




























