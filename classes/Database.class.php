<?php


class Database
{
  public function __construct()
  {

  }

	/**
	 * Connects to a database. After connecting, you should always call disconnect_db() to close it
	 * when done.
	 */
	public function connect()
	{
		global $g_db_hostname, $g_db_username, $g_db_password, $g_db_name;

		$link = mysql_connect($g_db_hostname, $g_db_username, $g_db_password)
			or die("Couldn't connect to database: " . mysql_error());
		@mysql_select_db($g_db_name)
			or die ("couldn't find database '$g_db_name': " . mysql_error());

		return $link;
	}


	/**
	 * Disconnects from a database.
	 */
	public function disconnect($link)
	{
		@mysql_close($link);
	}


	/**
	 * Confirms that the database settings provided are valid.
	 */
	public static function testDbSettings($dbHostname, $dbName, $dbUsername, $dbPassword)
	{
	  $db_connection_error = "";
	  $link = @mysql_connect($hostname, $username, $password)
	    or $db_connection_error = mysql_error();

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


}
