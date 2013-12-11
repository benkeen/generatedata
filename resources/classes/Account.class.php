<?php


/**
 * @package Core
 * @author Ben Keen <ben.keen@gmail.com>
 */
class Account {

	/**
	 * There are two types of anonymous users:
	 * 1. Anonymous admin. This is when the generator is configured to have a single user account at all times.
	 *    This account type has permission to do everything; there's a single user in the user_accounts DB table.
	 * 2. Anonymous user. This is when the user hasn't logged in, but MUST, in order to save and load stuff.
	 */
	private $isAnonymousAdmin = false;
	private $isAnonymousUser = false;
	private $accountID;
	private $accountType;
	private $dateCreated;
	private $lastUpdated;
	private $dateExpires;
	private $firstName;
	private $lastName;
	private $email;
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
		if ($accountID == "anonymousAdmin") {
			$accountID = 1;
			$this->isAnonymousAdmin = true;
			$_SESSION["account_id"] = 1;
		} else if ($accountID == "anonymousUser") {
			$this->isAnonymousUser = true;
		}

		if (is_numeric($accountID)) {
			$prefix = Core::getDbTablePrefix();
			$response = Core::$db->query("
				SELECT * 
				FROM {$prefix}user_accounts
				WHERE account_id = $accountID
			");

			if ($response["success"]) {
				$accountInfo = mysqli_fetch_assoc($response["results"]);
				$this->accountID = $accountInfo["account_id"];
				$this->accountType = $accountInfo["account_type"];
				$this->dateCreated = date("U", strtotime($accountInfo["date_created"]));
				$this->lastUpdated = date("U", strtotime($accountInfo["last_updated"]));
				$this->dateExpires = date("U", strtotime($accountInfo["date_expires"]));
				$this->firstName = $accountInfo["first_name"];
				$this->lastName = $accountInfo["last_name"];
				$this->email = $accountInfo["email"];
				$this->getConfigurations();
				$this->numRowsGenerated = $accountInfo["num_rows_generated"];
			}
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
		$L = Core::$language->getCurrentLanguageStrings();

		$data = mysqli_fetch_assoc($response["results"]);
		if (empty($data)) {
			return array(
				"success" => false,
				"message" => $L["no_account_found"]
			);
		}

		// compare the passwords
		$encryptionSalt    = Core::getEncryptionSalt();
		$encryptedPassword = crypt($password, $encryptionSalt);
		if ($encryptedPassword != $data["password"]) {
			return array(
				"success" => false,
				"message" => $L["invalid_password"]
			);
		}

		// store the account in sessions
		$_SESSION["account_id"] = $data["account_id"];

		// update the last login time for this user 
		$now = Utils::getCurrentDatetime();
		Core::$db->query("UPDATE {$prefix}user_accounts SET last_logged_in = '$now' WHERE account_id = {$data["account_id"]}");

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

		$L = Core::$language->getCurrentLanguageStrings();

		$data = mysqli_fetch_assoc($response["results"]);
		if (empty($data)) {
			return array(
				"success" => false,
				"message" => $L["user_not_found"]
			);
		}

		$randPassword = Utils::generateRandomAlphanumericStr("CXCXCX");

		// now attempt to send the email
		try {
			$emailContent = preg_replace("/%1/", $randPassword, $L["password_reset_email_content1"]);
			$emailContent .= "\n\n" . $L["password_reset_email_content2"];
			$emailSent = Emails::sendEmail(array(
				"recipient" => $email,
				"subject"   => $L["reset_password"],
				"content"   => $emailContent
			));

			$encryptionSalt = Core::getEncryptionSalt();
			$encryptedPassword = crypt($randPassword, $encryptionSalt);
			$response = Core::$db->query("
				UPDATE {$prefix}user_accounts
				SET password = '$encryptedPassword'
				WHERE email = '$email'
				LIMIT 1
			");

			if ($response && $emailSent) {
				if ($response["success"]) {
					return array(
						"success" => true,
						"message" => $L["password_reset_complete"]
					);
				}
			} else {
				return array(
					"success" => false,
					"message" => $L["email_not_sent"]
				);
			}

		} catch (Exception $e) {
			return array(
				"success" => false,
				"message" => $L["email_not_sent"]
			);
		}
	}


	public function getAccount() {
		return array(
			"isAnonymousAdmin" => $this->isAnonymousAdmin,
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

	public function isAnonymousAdmin() {
		return $this->isAnonymousAdmin;
	}

	public function isAdmin() {
		return $this->accountType == "admin";
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
				if (mysqli_num_rows($response["results"]) == 1) {
					$success = true;
					$message = mysqli_fetch_assoc($response["results"]);
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
			while ($row = mysqli_fetch_assoc($response["results"])) {
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
				$configurationID = mysqli_insert_id(Core::$db->getDBLink());
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

	public function copyConfiguration($data) {
		$dataSetId         = Utils::sanitize($data["dataSetId"]);
		$configurationName = Utils::sanitize($data["newDataSetName"]);

		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			INSERT INTO {$prefix}configurations (status, date_created, last_updated, account_id, configuration_name, content, num_rows_generated)
				SELECT status, date_created, last_updated, account_id, configuration_name, content, num_rows_generated
				FROM {$prefix}configurations
				WHERE configuration_id = $dataSetId
		");

		// if it worked okay (it should!) update the last_updated and configuration_name fields
		if ($response["success"]) {
			$newConfigurationID = mysqli_insert_id(Core::$db->getDBLink());
			$now = Utils::getCurrentDatetime();
			$response2 = Core::$db->query("
				UPDATE {$prefix}configurations
				SET configuration_name = '$configurationName',
					last_updated = '$now'
				WHERE configuration_id = $newConfigurationID
			");

			if ($response2["success"]) {
				return array(
					"success" => true,
					"message" => ""
				);
			}

		} else {
			return array(
				"success" => false,
				"message" => "There was a problem copying the Data Set: " . $response["errorMessage"]
			);
		}
	}

	/**
	 * Used (currently) in the installation script. Note: this function relies on the settings file having
	 * been defined, along with an arbitrary encryption salt.
	 * @param $accountInfo
	 * @param bool $isCurrentUser
	 * @return int
	 */
	public static function createAccount($accountInfo, $isCurrentUser = false) {
		$accountInfo = Utils::sanitize($accountInfo);
		$encryptionSalt = Core::getEncryptionSalt();

		$accountType = $accountInfo["accountType"];
		$firstName   = isset($accountInfo["firstName"]) && !empty($accountInfo["firstName"]) ? $accountInfo["firstName"] : "";
		$lastName    = isset($accountInfo["lastName"]) && !empty($accountInfo["lastName"]) ? $accountInfo["lastName"] : "";
		$email       = isset($accountInfo["email"]) && !empty($accountInfo["email"]) ? $accountInfo["email"] : "";
		$password    = "";
		if (isset($accountInfo["password"]) && !empty($accountInfo["password"])) {
			$password = crypt($accountInfo["password"], $encryptionSalt);
		}

		// TODO - this is weird!
		$autoEmail   = isset($accountInfo["accountType"]) ? $accountInfo["accountType"] : false;

		$L = Core::$language->getCurrentLanguageStrings();
		$now = Utils::getCurrentDatetime();
		$prefix = Core::getDbTablePrefix();
		$result = Core::$db->query("
			INSERT INTO {$prefix}user_accounts (date_created, last_updated, date_expires, last_logged_in, account_type, 
				first_name, last_name, email, password)
			VALUES ('$now', '$now', '$now', NULL, '$accountType', '$firstName', '$lastName', '$email', '$password')
		");

		$emailSent = false; // not used yet, but we should notify the user via the interface
		if ($autoEmail) {
			try {
				$content = $L["account_created_msg"] . "\n\n";
				if (isset($_SERVER["HTTP_REFERER"]) && !empty($_SERVER["HTTP_REFERER"])) {
					$content .= "{$L["login_url_c"]} {$_SERVER["HTTP_REFERER"]}\n";
				}
				$content .= "{$L["email_c"]} $email\n{$L["password_c"]} {$accountInfo["password"]}\n";
				Emails::sendEmail(array(
					"recipient" => $email,
					"subject"   => $L["account_created"],
					"content"   => $content
				));
				$emailSent = true;
			} catch (Exception $e) {
				$emailSent = false;
			}
		}

		$returnInfo = array(
			"success" => $result["success"]
		);

		if ($result["success"]) {
			$accountID = mysqli_insert_id(Core::$db->getDBLink());
			if ($isCurrentUser) {
				Core::initSessions();
				$_SESSION["account_id"] = $accountID;
				Core::initUser(true);
			}
			$returnInfo["accountID"] = $accountID;
		}

		return $returnInfo;
	}


	public function updateAccount($accountID, $info) {
		$L = Core::$language->getCurrentLanguageStrings();
		$dbLink = Core::$db->getDBLink();
		$accountID = mysqli_real_escape_string($dbLink, $accountID);
		$prefix = Core::getDbTablePrefix();

		if (empty($accountID) || !is_numeric($accountID)) {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::INVALID_PARAMS,
				"errorMsg" => $L["invalid_account_id"]
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
		$L = Core::$language->getCurrentLanguageStrings();
		$dbLink = Core::$db->getDBLink();
		if ($this->accountType != "admin") {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::NON_ADMIN
			);
		} else if (!is_numeric($accountID)) {
			return array(
				"success" => false,
				"errorCode" => ErrorCodes::INVALID_PARAMS,
				"errorMsg" => $L["invalid_account_id"]
			);
		}

		$accountID = mysqli_real_escape_string($dbLink, $accountID);
		$prefix = Core::getDbTablePrefix();
		Core::$db->query("DELETE FROM {$prefix}user_accounts WHERE account_id = $accountID");
		Core::$db->query("DELETE FROM {$prefix}configurations WHERE account_id = $accountID");

		return array("success" => true);
	}

	/**
	 * Helper function to determine if a user account exists, as determined by their email address.
	 * @param $email
	 * @return bool
	 */
	public static function checkAccountExists($email) {
		$email = Utils::sanitize(trim($email));
		$prefix = Core::getDbTablePrefix();

		$response = Core::$db->query("
			SELECT count(*) as c
			FROM   {$prefix}user_accounts
			WHERE email = '$email'
		");

		$result = mysqli_fetch_assoc($response["results"]);

		// shouldn't be necessary, but just in case, check for >= 1
		return $result["c"] >= 1;
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
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$row["date_created"] = date("U", strtotime($row["date_created"]));
				$row["last_updated"] = date("U", strtotime($row["last_updated"]));
				$row["last_logged_in"] = (!empty($row["last_logged_in"]) && $row["last_logged_in"] != "0000-00-00 00:00:00") ? date("U", strtotime($row["last_logged_in"])) : "";
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
		$dbLink = Core::$db->getDBLink();
		$cleanRowsGenerated = mysqli_real_escape_string($dbLink, $rowsGenerated);
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

		$prefix = Core::getDbTablePrefix();
		$dbLink = Core::$db->getDBLink();
		$accountID = $this->accountID;
		$configurationID = mysqli_real_escape_string($dbLink, $configurationID);
		$status = mysqli_real_escape_string($dbLink, $status);

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

