<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class SessionManager {
	private $dbLink;

	function __construct() {
		if (!Core::checkIsInstalled()) {
			return;
		}
		$this->dbLink = Core::$db->getDBLink();
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
		// global $sess_save_path; // TODO?
		// $sess_save_path = $save_path;
		return true;
	}

	function close() {
		return true;
	}

	function read($id) {
		$data = "";

		// fetch session data from the selected database
		$time = time();
		$newid = mysql_real_escape_string($id, $this->dbLink);
		$sql = "SELECT session_data FROM {$this->dbPrefix}sessions WHERE session_id = '$newid' AND expires > $time";

		$rs = mysql_query($sql, $this->dbLink);
		$a  = mysql_num_rows($rs);

		if ($a > 0) {
			$row = mysql_fetch_assoc($rs);
			$data = $row["session_data"];
		}

		return $data;
	}

	// this is only executed until after the output stream has been closed
	function write($id, $data) {
		global $g_table_prefix, $g_api_sessions_timeout;

		$life_time = 3600;
		// if (isset($_SESSION["ft"]["account"]["sessions_timeout"])) {
		// 	$life_time = $_SESSION["ft"]["account"]["sessions_timeout"] * 60;
		// } else {
		// 	$life_time = $g_api_sessions_timeout;
		// }

		$time = time() + $life_time;
		$newid   = mysql_real_escape_string($id, $this->dbLink);
		$newdata = mysql_real_escape_string($data, $this->dbLink);

		$sql = "REPLACE {$this->dbPrefix}sessions (session_id, session_data, expires) VALUES('$newid', '$newdata', $time)";
		mysql_query($sql, $this->dbLink);

		return true;
	}

	function destroy($id) {
		$newid = mysql_real_escape_string($id);
		$sql = "DELETE FROM {$this->dbPrefix}sessions WHERE session_id = '$newid'";
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
