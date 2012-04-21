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

	// add test settings function, maybe?

}
