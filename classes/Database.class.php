<?php


class Database {
  private $link;

  public function __construct() {
		$dbHostname = Core::getHostname();
		$dbUsername = Core::getDbUsername();
		$dbPassword = Core::getDbPassword();
		$dbName     = Core::getDbPassword();

		try {
		  $this->link = mysql_connect($dbHostname, $dbUsername, $dbPassword);
		} catch (Exception $e) {
			// or die("Couldn't connect to database: " . mysql_error());
		}

		try {
		  @mysql_select_db($dbName);
		} catch (Exception $e) {
     //  die ("couldn't find database '$g_db_name': " . mysql_error());
		}
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