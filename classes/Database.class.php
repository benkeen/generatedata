<?php


class Database {

  public function __construct() {

  }


	/**
	 * Connects to a database. After connecting, you should always call disconnect_db() to close it
	 * when done.
	 */
	public function connect() {
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
	public function disconnect($link) {
		@mysql_close($link);
	}


	/**
	 * Checks to see if the database information provided is valid or not.
	 */
	public static function testDbSettings($dbHostname, $dbName, $dbUsername, $dbPassword) {
	  $dbConnectionError = "";
	  $lang = Core::getLanguage()->getCurrentLanguageStrings();
	  $link = @mysql_connect($dbHostname, $dbUsername, $dbPassword)
	    or $dbConnectionError = mysql_error();

	  if ($dbConnectionError) {
	    $placeholders = array("db_connection_error" => $dbConnectionError);
	    $error = Utils::evalSmartyString($lang["install_invalid_db_info"], $placeholders);
	    return array(false, $error);
	  } else {
	    $dbSelectError = "";
	    @mysql_select_db($dbName)
	      or $dbSelectError = mysql_error();

	    if ($dbSelectError) {
	      $placeholders = array("db_select_error" => $dbSelectError);
	      $error = Utils::evalSmartyString($lang["install_no_db_connection"], $placeholders);
	      return array(false, $error);
	    } else {
	      @mysql_close($link);
	    }
	  }

	  return array(true, "");
	}
}