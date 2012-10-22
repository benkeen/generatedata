<?php


class Database {
	private $link;

	public function __construct() {
		$dbHostname = Core::getHostname();
		$dbUsername = Core::getDbUsername();
		$dbPassword = Core::getDbPassword();
		$dbName     = Core::getDbName();

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
		$lang = Core::$language->getCurrentLanguageStrings();
		$link = @mysql_connect($dbHostname, $dbUsername, $dbPassword)
			or $dbConnectionError = mysql_error();

		if ($dbConnectionError) {
			$placeholders = array("db_connection_error" => $dbConnectionError);
			$error = Templates::evalSmartyString($lang["install_invalid_db_info"], $placeholders);
			return array(false, $error);
		} else {
			$dbSelectError = "";
			@mysql_select_db($dbName)
				or $dbSelectError = mysql_error();

			if ($dbSelectError) {
				$placeholders = array("db_select_error" => $dbSelectError);
				$error = Template::evalSmartyString($lang["install_no_db_connection"], $placeholders);
				return array(false, $error);
			} else {
				@mysql_close($link);
			}
		}

		return array(true, "");
	}

	/**
	 * Performs our actual database query/queries.  This accepts either a single query string or an array of queries
	 * through the first param. The second optional param allows for a custom rollback. We don't use transactions
	 * because it requires the InnoDB or BDB storage engines being available (and from my experience with formtools.org,
	 * there are still a lot of environments that don't have it).
	 *
	 * This function works for any query type: INSERT, UPDATE, SELECT. But the returned info obviously only has
	 * meaning with the SELECT query.
	 *
	 * @param mixed $queries
	 * @param mixed $rollbackQueries
	 * @return hash "success"      => boolean
	 *              "errorMessage" => error string
	 *              "results"      => the result of the MySQL query, or an array of results if an array was passed
	 */
	public function query($queries, $rollbackQueries = "") {
		$singleQuery = false;
		if (!is_array($queries)) {
			$queries = array($queries);
			$singleQuery = true;
		}
		if (!is_array($rollbackQueries)) {
			$rollbackQueries = array($rollbackQueries);
		}

		$results = array();
		$errorMessage = "";
		foreach ($queries as $query) {
			$result = mysql_query($query);
			if (!$result) {
				$errorMessage = mysql_error();
				break;
			} else {
				$results[] = $result;
			}
		}

		if (!empty($errorMessage)) {
			foreach ($rollbackQueries as $query) {
				@mysql_query($query);
			}
		}

		// if this was a single query, make $results
		if ($singleQuery && isset($results[0])) {
			$results = $results[0];
		}

		return array(
			"success"      => empty($errorMessage),
			"errorMessage" => $errorMessage,
			"results"      => $results
		);
	}
}


