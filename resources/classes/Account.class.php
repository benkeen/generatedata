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
	 * as the constructor parameter. User account login is done via the login method below.
 	 *
	 * @param mixed $accountID
	 */
	public function __construct($accountID) {
		$this->getCurrentUser($accountID);
	}

	/**
	 * Called by the constructor and any time the user updates his user account. 
	 */
	private function getCurrentUser($accountID) {
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
			$this->email = $accountInfo["email"];
			$this->getConfigurations();
			$this->numRowsGenerated = $accountInfo["num_rows_generated"];
		}
	}

	/**
	 * Attempts to log a user in. If successful, it updates sessions and returns a success
	 * message; otherwise, just returns the appropriate error
	 */
	public static function login($email, $password) {
		$prefix = Core::getDbTablePrefix();
		$email = Utils::sanitize($email);
		$response = Core::$db->query("
			SELECT * 
			FROM {$prefix}user_accounts
			WHERE email = '$email'
			LIMIT 1
		");

		if (!$response["success"]) {
			return;
		}

		$data = mysql_fetch_assoc($response["results"]);
		if (empty($data)) {
			return array(
				"success" => false,
				"message" => "Sorry, we couldn't find your account."
			);
		}

		// compare the passwords
		$encryptionSalt    = Core::getEncryptionSalt();
		$encryptedPassword = crypt($password, $encryptionSalt);
		if ($encryptedPassword != $data["password"]) {
			return array(
				"success" => false,
				"message" => "Sorry, that password is not correct. Please try again."
			);
		}

		// store the account in sessions
		$_SESSION["account_id"] = $data["account_id"];

		return array(
			"success" => true,
			"message" => ""
		);
	}

	public static function logout() {
		session_destroy(); 
	}

	public static function resetPassword($email) {
		$prefix = Core::getDbTablePrefix();
		$email = Utils::sanitize($email);
		$response = Core::$db->query("
			SELECT * 
			FROM {$prefix}user_accounts
			WHERE email = '$email'
			LIMIT 1
		");

		if (!$response["success"]) {
			return;
		}

		$data = mysql_fetch_assoc($response["results"]);
		if (empty($data)) {
			return array(
				"success" => false,
				"message" => "Sorry, we were unable to identify you."
			);
		}

		$randPassword = Utils::generateRandomAlphanumericStr("CXCXCX");

		// now attempt to send the email. If it works, update the database

		$response = Emails::sendEmail(array(
			"recipient" => $email,
			"subject"   => "Reset Password",
			"content"   => "Your password has been reset. You may use the following password to log in: $randPassword\n\nPlease change it once you've logged in."
		));

		if ($response) {
			$encryptionSalt = Core::getEncryptionSalt();
			$encryptedPassword = crypt($randPassword, $encryptionSalt);
			$response = Core::$db->query("
				UPDATE {$prefix}user_accounts
				SET password = '$encryptedPassword'
				WHERE email = '$email'
				LIMIT 1
			");
			if ($response["success"]) {
				return array(
					"success" => true,
					"message" => "Your password has been reset and you have been emailed the new password."
				);	
			}
		} else {
			return array(
				"success" => false,
				"message" => "We were unable to send the email notification."
			);
		}
	}

	public function getAccount() {
		return array(
			"isAnonymous"      => $this->isAnonymous,
			"accountID"        => $this->accountID,
			"accountType"      => $this->accountType,
			"dateCreated"      => $this->dateCreated,
			"lastUpdated"      => $this->lastUpdated,
			"dateExpires"      => $this->dateExpires,
			"firstName"        => $this->firstName,
			"lastName"         => $this->lastName,
			"email"            => $this->email,
			"configurations"   => $this->configurations,
			"numRowsGenerated" => $this->numRowsGenerated
		);
	}

	public function isAnonymous() {
		return $this->isAnonymous;
	}

	public function getAccountID() {
		return $this->accountID;
	}

	public function getAccountType() {
		return $this->accountType;
	}

	/**
	 * Loads ANY public data set.
	 */
	public function getPublicDataSet($configurationID) {
		$success = false;
		$message = "";

		if (!empty($configurationID) && is_numeric($configurationID)) {
			$prefix   = Core::getDbTablePrefix();		
			$response = Core::$db->query("
				SELECT *, unix_timestamp(date_created) as date_created_unix, unix_timestamp(last_updated) as last_updated_unix
				FROM   {$prefix}configurations
				WHERE  configuration_id = $configurationID AND
					   status = 'public'
			");

			if ($response["success"]) {
				if (mysql_num_rows($response["results"]) == 1) {
					$success = true;
					$message = mysql_fetch_assoc($response["results"]);
				}
			} else {	
				$message = $response["errorMessage"];
			}
		}

		return array(
			"success" => $success,
			"message" => $message
		);
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
				  configuration_id IN ($configIDStr)
		");

		if ($response["success"]) {
			return array(
				"success" => true,
				"message" => $cleanedConfigurationIDs
			);
		} else {
			return array(
				"success"   => false,
				"errorCode" => ErrorCodes::FAILED_SQL_STATEMENT,
				"message"   => $response["errorMessage"]
			);
		}
	}


	public function saveConfiguration($data) {
		$configurationName = Utils::sanitize($data["dataSetName"]);

		$configurationID = null;
		if (array_key_exists("configurationID", $data)) {
			$configurationID = $data["configurationID"];
			unset($data["configurationID"]);
		}

		unset($data["action"]);
		unset($data["dataSetName"]);
		$content = addslashes(json_encode($data));

		$now = Utils::getCurrentDatetime();
		$nowUnixTime = Utils::convertDatetimeToTimestamp($now);
		$prefix = Core::getDbTablePrefix();
		$accountID = $this->accountID;

		if ($configurationID == null) {
			$response = Core::$db->query("
				INSERT INTO {$prefix}configurations (status, date_created, last_updated, account_id, configuration_name, content)
				VALUES ('private', '$now', '$now', $accountID, '" . $configurationName . "', '" . $content . "')
			");

			if ($response["success"]) {
				$configurationID = mysql_insert_id();
				return array(
					"success" => true,
					"message" => $configurationID,
					"lastUpdated" => $nowUnixTime
				);
			} else {
				return array(
					"success" => false,
					"message" => "There was a problem saving the configuration: " . $response["errorMessage"]
				);
			}
		} else {
			$response = Core::$db->query("
				UPDATE {$prefix}configurations 
				SET 	last_updated = '$now',
						configuration_name = '" . $configurationName . "',
						content = '" . $content . "'
				WHERE account_id = $accountID AND
						configuration_id = $configurationID
			");

			if ($response["success"]) {
				return array(
					"success" => true,
					"message" => $configurationID,
					"lastUpdated" => $nowUnixTime
				);
			} else {
				return array(
					"success" => false,
					"message" => "There was a problem saving the configuration: " . $response["errorMessage"]
				);
			}
		}
	}


	/**
	 * Used (currently) in the installation script. Note: this function relies on the settings file having
	 * been defined, along with an arbitrary encryption salt.
	 *
	 * This is static because it's used during the installation process to create the default account. But in 
	 * all other cases its used by the admin only.
	 *
	 * @param array $accountInfo
	 */
	public static function createAccount($accountInfo) {
		$accountInfo = Utils::sanitize($accountInfo);
		$encryptionSalt = Core::getEncryptionSalt();

		$accountType = $accountInfo["accountType"];
		$firstName   = $accountInfo["firstName"];
		$lastName    = $accountInfo["lastName"];
		$email       = $accountInfo["email"];
		$password    = crypt($accountInfo["password"], $encryptionSalt);
		$autoEmail   = isset($accountInfo["accountType"]) ? $accountInfo["accountType"] : false;

		$now = Utils::getCurrentDatetime();
		$prefix = Core::getDbTablePrefix();
		$result = Core::$db->query("
			INSERT INTO {$prefix}user_accounts (date_created, last_updated, date_expires, last_logged_in, account_type, 
				first_name, last_name, email, password)
			VALUES ('$now', '$now', '$now', NULL, '$accountType', '$firstName', '$lastName', '$email', '$password')
		");

		// TODO
		if ($autoEmail) {

		}

		// if ($result["success"]) {
		// 	$accountID = mysql_insert_id();;
		// 	Core::initSessions();
		// 	$_SESSION["account_id"] = $accountID;
		// 	Core::initUser(true);
		// }
	}


	public function updateAccount($accountID, $info) {
		$accountID = mysql_real_escape_string($accountID);
		$prefix = Core::getDbTablePrefix();

		if (empty($accountID) || !is_numeric($accountID)) {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::INVALID_PARAMS,
				"errorMsg" => "the Account ID is not valid."
			);
		}
		$firstName = $info["firstName"];
		$lastName  = $info["lastName"];
		$email     = $info["email"];

		$passwordClause = "";
		if (isset($info["password"]) && !empty($info["password"])) {
			$encryptionSalt    = Core::getEncryptionSalt();
			$encryptedPassword = crypt($info["password"], $encryptionSalt);
			$passwordClause = ", password = '$encryptedPassword'";
		}

		$response = Core::$db->query("
			UPDATE {$prefix}user_accounts
			SET first_name = '$firstName',
				last_name = '$lastName',
				email = '$email'
				$passwordClause
			WHERE account_id = $accountID
		");

		if ($response["success"]) { 
			$this->getCurrentUser($accountID);
			return array(
				"success" => true
			);
		} else {
			// TODO
		}
	}
	
	public function deleteAccount($accountID) {
		if ($this->accountType != "admin") {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::NON_ADMIN
			);
		} else if (!is_numeric($accountID)) {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::INVALID_PARAMS,
				"errorMsg" => "the Account ID is not valid."
			);
		}

		$accountID = mysql_real_escape_string($accountID);
		$prefix = Core::getDbTablePrefix();
		Core::$db->query("DELETE FROM {$prefix}user_accounts WHERE account_id = $accountID");
		Core::$db->query("DELETE FROM {$prefix}configurations WHERE account_id = $accountID");

		return array("success" => true);
	}


	public function getUsers() {
		if ($this->accountType != "admin") {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::NON_ADMIN
			);
		}

		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM {$prefix}user_accounts 
			WHERE account_type = 'user'
			ORDER BY last_name ASC
		");

		$data = array();
		if ($response["success"]) {
			while ($row = mysql_fetch_assoc($response["results"])) {
				$row["date_created"] = date("U", strtotime($row["date_created"]));
				$row["last_updated"] = date("U", strtotime($row["last_updated"]));
				$row["last_logged_in"] = (!empty($row["last_logged_in"])) ? date("U", strtotime($row["last_logged_in"])) : "";
				$data[] = $row;
			}
		}

		return array(
			"success" => true,
			"accounts" => $data
		);
	}


	public function updateRowsGeneratedCount($configurationID, $rowsGenerated) {
		if (!is_numeric($rowsGenerated)) {
			return;
		}

		$cleanRowsGenerated = mysql_real_escape_string($rowsGenerated);
		$prefix    = Core::getDbTablePrefix();
		$accountID = $this->accountID;
		$response = Core::$db->query("
			UPDATE {$prefix}configurations
			SET num_rows_generated = num_rows_generated+$cleanRowsGenerated
			WHERE  account_id = $accountID AND configuration_id = $configurationID
		");

		$response = Core::$db->query("
			UPDATE {$prefix}user_accounts
			SET num_rows_generated = num_rows_generated+$cleanRowsGenerated
			WHERE account_id = $accountID
		");
	}

	/**
	 * Time is currently passed but not used. It's going to be used to ensure that only NEWEST requests
	 * actually update the record
	 */
	public function saveDataSetVisibilityStatus($configurationID, $status, $time) {
		if (!is_numeric($configurationID)) {
			return;
		}

		$prefix    = Core::getDbTablePrefix();
		$accountID = $this->accountID;
		$configurationID = mysql_real_escape_string($configurationID);
		$status = mysql_real_escape_string($status);

		$response = Core::$db->query("
			UPDATE {$prefix}configurations
			SET    status = '$status'
			WHERE  account_id = $accountID AND 
				   configuration_id = $configurationID
		");

		if ($response["success"]) {
			return array(
				"success" => true,
				"message" => $configurationID,
				"newStatus" => $status
			);
		} else {
			return array(
				"success" => false,
				"message" => "There was a problem saving the configuration: " . $response["errorMessage"]
			);
		}

	}
}

