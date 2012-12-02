<?php


/**
 * @package Core
 * @author Ben Keen <ben.keen@gmail.com>
 */
class Account {
	private $isAnonymous = false;
	private $accountID;
	private $accountType;
	private $configurations;


	/**
	 * Instantiates a user account. This is passed either "anonymous" or the Account ID
	 * as the constructor parameter. 
 	 *
	 * @param mixed $accountID
	 */
	public function __construct($accountID) {
		if ($accountID == "anonymous") {
			$accountID = 1;
			$this->isAnonymous = true;
		}

		$prefix = Core::getDbTablePrefix();		
		$response = Core::$db->query("
			SELECT * 
			FROM {$prefix}user_accounts
			WHERE account_id = $accountID
		");

		if ($response["success"]) {
			$accountInfo = mysql_fetch_assoc($response["results"]);
			$this->accountID = $accountInfo["account_id"];
			$this->accountType = $accountInfo["account_type"];
		}
/*
		$form_count_query = mysql_query("
			SELECT count(*)
			FROM   {$g_table_prefix}forms
			WHERE  account_id = $account_id
				");
		$form_count = mysql_fetch_array($form_count_query);
		$user_info["num_forms_saved"] = $form_count[0];
*/
	}

	public function isAnonymous() {
		return $this->isAnonymous;
	}

	public function getID() {
		return $this->accountID;
	}

	public function getAccountType() {
		return $this->accountType;
	}

	/*
	 * Saves a test data configuration.
	 *
	 * @param integer $account_id
	 * @param string $form_name
	 * @param string $form_content
	 * @return string
	public function saveConfiguration($form_name, $form_content) {

		// find out if there's already a form with this name for this user
		$count_query = mysql_query("
			SELECT count(*)
			FROM   {$g_table_prefix}forms
			WHERE  account_id = $account_id
			AND    form_name = '$form_name'
				");

		$result = mysql_fetch_row($count_query);
		$form_already_exists = ($result[0] == 0) ? false : true;

		if ($form_already_exists) {
			$query = mysql_query("
				UPDATE {$g_table_prefix}forms
				SET    content = '$form_content'
				WHERE  account_id = $account_id AND
							 form_name = '$form_name'
								 ");
			echo '{ "success": "true",  "message": "Your form has been updated.", "form_name": "' . $form_name . '" }';
		} else {
			$query = mysql_query("
				INSERT INTO {$g_table_prefix}forms (account_id, form_name, content)
				VALUES ($account_id, '$form_name', '$form_content')
								 ");
			$form_id = mysql_insert_id();
			echo '{ "success": "true",  "message": "Your form has been saved.", "form_id": "' . $form_id . '", "form_name": "' . $form_name . '" }';
		}
	}


	public function loadConfiguration($form_id) {
		global $g_table_prefix;

		if (!isset($_SESSION["account_id"])) {
			return;
		}

		$query = mysql_query("
			SELECT *
			FROM   {$g_table_prefix}forms
			WHERE  form_id = $form_id
				");

		if (!$query || mysql_num_rows($query) == 0) {
			echo '{ "success": "false", "message": "Sorry, this form isn\'t found. You might want to try logging out then logging back in." }';
			return;
		}

		$result = mysql_fetch_assoc($query);
		if ($result["account_id"] != $_SESSION["account_id"]) {
			echo '{ "success": "false", "message": "Sorry, you don\'t have permission to view this form. Please re-login in and try again." }';
			return;
		}

		// escape all double quotes
	//  $clean_str = preg_replace("/^\{/", "", $result["content"]);
	//  $clean_str = preg_replace("/\}$/", "", $clean_str);
		$clean_str = addslashes($result["content"]);
		echo '{ "success": "true", "form_content": ' . $result["content"] . ' }';
	}


	public function deleteConfiguration($form_id) {
		global $g_table_prefix;

		if (!isset($_SESSION["account_id"])) {
			return;
		}

		$query = mysql_query("
			SELECT *
			FROM   {$g_table_prefix}forms
			WHERE  form_id = $form_id
				");

		if (mysql_num_rows($query) == 0) {
			echo '{ "success": "false",  "message": "Sorry, this form isn\'t found. You might want to try logging out then logging back in." }';
			return;
		}

		$result = mysql_fetch_assoc($query);
		if ($result["account_id"] != $_SESSION["account_id"]) {
			echo '{ "success": "false", "message": "Sorry, you don\'t have permission to delete this form. Please re-login in and try again." }';
			return;
		}

		mysql_query("
			DELETE FROM {$g_table_prefix}forms
			WHERE  form_id = $form_id
				");

		echo "{ \"success\": \"true\", \"form_id\": $form_id  }";
	}


	// private? part of constructor?
	public function getConfigurations($account_id) {
		global $g_table_prefix;

		$query = mysql_query("
			SELECT form_id, form_name
			FROM   {$g_table_prefix}forms
			WHERE  account_id = $account_id
			ORDER BY form_name
				") or die(mysql_error());

		$forms = array();
		while ($result = mysql_fetch_assoc($query))
			$forms[] = array($result["form_id"], $result["form_name"]);

		return $forms;
	}


	public function updateTotalRowCount($num_rows) {
		// Ben, surely there's a way to do this in a single query...
		$select_query = mysql_query("
			SELECT num_records_generated
			FROM   {$g_table_prefix}user_accounts
			WHERE  account_id = $account_id
				");

		$result = mysql_fetch_assoc($select_query);
		$num_generated = $result["num_records_generated"];

		$new_total = $num_generated + $num_rows;

		mysql_query("
			UPDATE {$g_table_prefix}user_accounts
			SET    num_records_generated = $new_total
			WHERE  account_id = $account_id
				");
	}
*/

	public function saveConfiguration($data) {
		$configurationName = Utils::sanitize($data["dataSetName"]);

		unset($data["action"]);
		unset($data["dataSetName"]);
		$content = Utils::sanitize(json_encode($data));

		$now = Utils::getCurrentDatetime();
		$prefix = Core::getDbTablePrefix();
		$accountID = $this->accountID;

		$response = Core::$db->query("
			INSERT INTO {$prefix}configurations (date_created, last_updated, account_id, configuration_name, content)
			VALUES ('$now', '$now', $accountID, '$configurationName', '$content')
		");

		if ($response["success"]) {
			$configurationID = mysql_insert_id();
			return array(
				"success" => true,
				"message" => $configurationID
			);
		} else {
			return array(
				"success" => false,
				"message" => "There was a problem saving the configuration: " . $response["errorMessage"]
			);
		}
	}


	public static function loadAnonymousDataSet($configurationID) {

	}


	/**
	 * Used (currently) in the installation script. Note: this function relies on the settings file having
	 * been defined, along with an arbitrary encryption salt.
	 *
	 * @param array $accountInfo
	 */
	public static function createUser($accountInfo) {
		$accountInfo = Utils::sanitize($accountInfo);
		$encryptionSalt = Core::getEncryptionSalt();

		$accountType = $accountInfo["accountType"];
		$firstName   = $accountInfo["firstName"];
		$lastName    = $accountInfo["lastName"];
		$email       = $accountInfo["email"];
		$password    = crypt($accountInfo["password"], $encryptionSalt);

		$now = Utils::getCurrentDatetime();

		$prefix = Core::getDbTablePrefix();
		$result = Core::$db->query("
			INSERT INTO {$prefix}user_accounts (date_created, last_updated, date_expires, account_type,
				first_name, last_name, email, password, num_records_generated)
			VALUES ('$now', '$now', '$now', '$accountType', '$firstName', '$lastName', '$email',
				'$password', 0)
		");
	}
}
