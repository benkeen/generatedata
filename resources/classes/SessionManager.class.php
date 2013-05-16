<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class SessionManager {
	private $dbLink;
	private $dbPrefix;


	function __construct() {
		if (!Core::checkIsInstalled()) {
			return;
		}
		$this->dbLink   = Core::$db->getDBLink();
		$this->dbPrefix = Core::getDbTablePrefix();

		// register this object as the session handler
		session_set_save_handler(
			array(&$this, "open"),
			array(&$this, "close"),
			array(&$this, "read"),
			array(&$this, "write"),
			array(&$this, "destroy"),
			array(&$this, "gc")
		);
	}

	function open($save_path, $session_name) {
		return true;
	}

	function close() {
		return true;
	}

	function read($id) {
		// fetch session data from the selected database
		$time  = time();
		$newID = mysql_real_escape_string($id, $this->dbLink);
		$sql   = "SELECT session_data FROM {$this->dbPrefix}sessions WHERE session_id = '$newID' AND expires > $time";

		$response = mysql_query($sql, $this->dbLink);
		$numRows  = mysql_num_rows($response);

		$data = "";
		if ($numRows > 0) {
			$row = mysql_fetch_assoc($response);
			$data = $row["session_data"];
		}

		return $data;
	}

	// this is only executed until after the output stream has been closed
	function write($id, $data) {
		$life_time = 3600;
		$time = time() + $life_time;
		$newID   = mysql_real_escape_string($id, $this->dbLink);
		$newData = mysql_real_escape_string($data, $this->dbLink);

		$sql = "REPLACE {$this->dbPrefix}sessions (session_id, session_data, expires) VALUES('$newID', '$newData', $time)";
		mysql_query($sql, $this->dbLink);

		return true;
	}

	function destroy($id) {
		$newID = mysql_real_escape_string($id);
		$sql = "DELETE FROM {$this->dbPrefix}sessions WHERE session_id = '$newID'";
		mysql_query($sql, $this->dbLink);
		return true;
	}

	// delete all records who have passed the expiration time
	function gc() {
		$sql = "DELETE FROM {$this->dbPrefix}sessions WHERE expires < UNIX_TIMESTAMP()";
		mysql_query($sql);
		return true;
	}
}
