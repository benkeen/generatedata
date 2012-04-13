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

/**
 * A security-related function. This returns a clean version of PHP_SELF for use in the templates. This wards
 * against URI Cross-site scripting attacks.
 *
 * @return the cleaned $_SERVER["PHP_SELF"]
 */
function gd_get_clean_php_self()
{
  return htmlspecialchars(strip_tags($_SERVER['PHP_SELF']), ENT_QUOTES);
}


/**
 * Used to generate the main index and install pages.
 *
 * @param string $template
 * @param array $params
 */
function gd_display_page($template, $page_vars)
{
  global $g_success, $g_message, $g_link, $LANG, $g_smarty, $g_version;

  // common variables. These are sent to EVERY templates
  $g_smarty->template_dir = realpath(dirname(__FILE__) . "/../templates");
  $g_smarty->compile_dir  = realpath(dirname(__FILE__) . "/../cache");

  // check the compile directory has the write permissions
  if (!is_writable($g_smarty->compile_dir))
  {
    gd_display_serious_error("The <b>/cache</b> folder isn't writable. This folder is used by Smarty to generate temporary files for speedy page loads. You'll need to update that folder's permissions to allow read and write permissions (777 on unix/mac).");
    exit;
  }

  $g_smarty->assign("LANG", $LANG);
  $g_smarty->assign("SESSION", $_SESSION["gd"]);
  $g_smarty->assign("g_version", $g_version);
  $g_smarty->assign("same_page", gd_get_clean_php_self());
  $g_smarty->assign("query_string", $_SERVER["QUERY_STRING"]);

  // if this page has been told to dislay a custom message, override g_success and g_message
  if ((!isset($g_upgrade_info["message"]) || empty($g_upgrade_info["message"])) && isset($_GET["message"]))
  {
    list($g_success, $g_message) = ft_display_custom_page_message($_GET["message"]);
  }
  $g_smarty->assign("g_success", $g_success);
  $g_smarty->assign("g_message", $g_message);

  // now add the custom variables for this template, as defined in $page_vars
  foreach ($page_vars as $key=>$value)
    $g_smarty->assign($key, $value);

  $g_smarty->display(realpath(dirname(__FILE__) . "/../$template"));

  gd_db_disconnect($g_link);
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
function gd_display_serious_error($error)
{
	$not_fixed_message = "";
	if (isset($_GET["source"]))
	{
		$not_fixed_message = "<div id=\"not_fixed\">Nope, ain't fixed yet. Try again.</div>";
	}

  echo <<< END
<html>
<head>
  <title>Things just aint right.</title>
  <link rel="stylesheet" type="text/css" href="css/errorpage.css">
  <script src="scripts/jquery-1.7.2.min.js"></script>
  <script>
  $(function() {
    $("button").bind("click", function() { window.location = "index.php?source=fromerrorpage"; });
  });
  </script>
</head>
<body>
<div id="box">
  <h1>Uh-oh.</h1>
  $not_fixed_message
  {$error}
  <button class="cupid-green">Click here when you think you've fixed it.</button>
</div>
</body>
</html>
END;
}
