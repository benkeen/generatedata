<?php


/**
 * Confirms that the database settings provided are valid.
 *
 * @param array $settings
 * @return array [0] boolean true / false
 *               [1] error message (if there was a problem. Empty string otherwise).
 */
function gd_test_db_settings($settings)
{
	global $L;

  $hostname = $settings["dbHostname"];
  $db_name  = $settings["dbName"];
  $username = $settings["dbUsername"];
  $password = $settings["dbPassword"];

  $db_connection_error = "";
  $link = @mysql_connect($hostname, $username, $password) or $db_connection_error = mysql_error();

  if ($db_connection_error)
  {
    $placeholders = array("db_connection_error" => $db_connection_error);
    $error = gd_eval_smarty_string($L["install_invalid_db_info"], $placeholders);
    return array(false, $error);
  }
  else
  {
    $db_select_error = "";
    @mysql_select_db($db_name)
      or $db_select_error = mysql_error();

    if ($db_select_error)
    {
      $placeholders = array("db_select_error" => $db_select_error);
      $error = ft_install_eval_smarty_string($L["install_no_db_connection"], $placeholders);
      return array(false, $error);
    }
    else
    {
      @mysql_close($link);
    }
  }

  return array(true, "");
}



function gd_create_database_tables()
{

}


function gd_create_settings_file()
{

}
