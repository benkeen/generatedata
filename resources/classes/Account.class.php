<?php


/**
 * @package Core
 * @author Ben Keen <ben.keen@gmail.com>
 */
class Account {
	private $isAnonymous = false;
	private $accountID;
	private $accountType;
	private $dateCreated;
	private $lastUpdated;
	private $dateExpires;
	private $firstName;
	private $lastName;
	private $email;
	private $password;
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
			$this->dateCreated = date("U", strtotime($accountInfo["date_created"]));
			$this->last_updated = date("U", strtotime($accountInfo["last_updated"]));
			$this->date_expires = date("U", strtotime($accountInfo["date_expires"]));
			$this->firstName = $accountInfo["first_name"];
			$this->lastName = $accountInfo["last_name"];
			
			$this->getConfigurations();
		}
	}


	public function getAccount() {
		return array(
			"isAnonymous"    => $this->isAnonymous,
			"accountID"      => $this->accountID,
			"accountType"    => $this->accountType,
			"dateCreated"    => $this->dateCreated,
			"lastUpdated"    => $this->lastUpdated,
			"dateExpires"    => $this->dateExpires,
			"firstName"      => $this->firstName,
			"lastName"       => $this->lastName,
			"email"          => $this->email,
			"configurations" => $this->configurations
		);
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

	public function getConfigurations() {
		$accountID = $this->accountID;
		$prefix   = Core::getDbTablePrefix();		
		$response = Core::$db->query("
			SELECT *, unix_timestamp(date_created) as date_created_unix, unix_timestamp(last_updated) as last_updated_unix
			FROM   {$prefix}configurations
			WHERE  account_id = $accountID
			ORDER BY last_updated DESC
		");

		if ($response["success"]) {
			$data = array();
			while ($row = mysql_fetch_assoc($response["results"])) {
				$data[] = $row;
			}
			$this->configurations = $data;
		} else {
			// TODO
		}
	}


	public function deleteConfigurations($configurationIDs) {
		if (empty($configurationIDs)) {
			return;
		}

		$cleanedConfigurationIDs = array();
		for ($i=0; $i<count($configurationIDs); $i++) {
			if (is_numeric($configurationIDs[$i])) {
				$cleanedConfigurationIDs[] = $configurationIDs[$i];
			}
		}

		$configIDStr = implode(", ", $cleanedConfigurationIDs);
		$accountID = $this->accountID;
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			DELETE FROM {$prefix}configurations 
			WHERE account_id = {$accountID} AND
				  configurastion_id IN ($configIDStr)
		");

		if ($response["success"]) {
			return array(
				"success" => true,
				"message" => $cleanedConfigurationIDs
			);
		} else {
			return array(
				"success" => false,
				"message" => $response["errorMessage"]
			);
		}
	}


/*
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
		$content = addslashes(json_encode($data));

		$now = Utils::getCurrentDatetime();
		$prefix = Core::getDbTablePrefix();
		$accountID = $this->accountID;

		$response = Core::$db->query("
			INSERT INTO {$prefix}configurations (date_created, last_updated, account_id, configuration_name, content)
			VALUES ('$now', '$now', $accountID, '" . $configurationName . "', '" . $content . "')
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
