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
    private $selectedDataTypes;
    private $selectedExportTypes;
    private $selectedCountries;
	private $configurations;
    private $numRowsGenerated = 0;


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
	 * Called by the constructor and any time the user updates his/her user account.
	 */
	private function getCurrentUser($accountID) {
		if ($accountID == "anonymousAdmin") {
			$accountID = 1;
			$this->isAnonymousAdmin = true;
			$_SESSION["account_id"] = 1;
		} else if ($accountID == "anonymousUser") {
			$this->isAnonymousUser = true;

			// anon users don't have an entry in the accounts table, so we populate the available plugins by pulling
			// the full list of available plugins right from Settings
			$this->selectedDataTypes = explode(",", Settings::getSetting("installedDataTypes"));
			$this->selectedExportTypes = explode(",", Settings::getSetting("installedExportTypes"));
			$this->selectedCountries = explode(",", Settings::getSetting("installedCountries"));
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
                $this->selectedDataTypes = explode(",", $accountInfo["selected_data_types"]);
                $this->selectedExportTypes = explode(",", $accountInfo["selected_export_types"]);
                $this->selectedCountries = explode(",", $accountInfo["selected_countries"]);
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

    public static function updateSelectedPlugins($accountID, $dataTypes, $exportTypes, $countries) {
        $prefix = Core::getDbTablePrefix();
        $dbLink = Core::$db->getDBLink();
		$L = Core::$language->getCurrentLanguageStrings();

        $dataTypes   = mysqli_real_escape_string($dbLink, implode(",", $dataTypes));
        $exportTypes = mysqli_real_escape_string($dbLink, implode(",", $exportTypes));
        $countries   = mysqli_real_escape_string($dbLink, implode(",", $countries));

        $response = Core::$db->query("
			UPDATE {$prefix}user_accounts
			SET selected_data_types = '$dataTypes',
				selected_export_types = '$exportTypes',
				selected_countries = '$countries'
			WHERE account_id = $accountID
		");

		if ($response["success"]) {
			$response["message"] = $L["notify_settings_updated"];
		} else {
			$response["message"] = $response["errorMessage"];
		}

		return $response;
    }

	public function getAccount() {
		return array(
			"isAnonymousAdmin"    => $this->isAnonymousAdmin,
			"accountID"           => $this->accountID,
			"accountType"         => $this->accountType,
			"dateCreated"         => $this->dateCreated,
			"lastUpdated"         => $this->lastUpdated,
			"dateExpires"         => $this->dateExpires,
			"firstName"           => $this->firstName,
			"lastName"            => $this->lastName,
			"email"               => $this->email,
			"configurations"      => $this->configurations,
            "selectedDataTypes"   => $this->selectedDataTypes,
            "selectedExportTypes" => $this->selectedExportTypes,
            "selectedCountries"   => $this->selectedCountries,
			"numRowsGenerated"    => $this->numRowsGenerated
		);
	}

    /**
     * Returns the subset of Data Type plugins selected by this user.
     */
    public function getDataTypePlugins() {
        $groupedDataTypes = Core::$dataTypePlugins;

        $whitelistedGroupedDataTypes = array();
        while (list($group_name, $dataTypes) = each($groupedDataTypes)) {
            $matched = array();
            foreach ($dataTypes as $dataType) {
                if (in_array($dataType->getFolder(), $this->selectedDataTypes)) {
                    $matched[] = $dataType;
                }
            }
            if (!empty($matched)) {
                $whitelistedGroupedDataTypes[$group_name] = $matched;
            }
        }
        return $whitelistedGroupedDataTypes;
    }

    /**
     * Returns the subset of Export Type plugins selected by this user.
     */
    public function getExportTypePlugins() {
        $exportTypes = Core::$exportTypePlugins;

        $whitelistedExportTypes = array();
        foreach ($exportTypes as $exportType) {
            if (in_array($exportType->getFolder(), $this->selectedExportTypes)) {
                $whitelistedExportTypes[] = $exportType;
            }
        }
        return $whitelistedExportTypes;
    }


	/**
	 * With 3.2.2, users can now customize the plugins they want to use, so Core::getDefaultExportType() is no longer
	 * sufficient to figure out what tab should be selected in the UI on page load. This is now used instead.
	 */
	public function getDefaultExportType () {
		$defaultExportType = Core::getDefaultExportType();
		$exportTypes = $this->getExportTypePlugins();

		// if the default export type isn't selected for this particular user, select the first in the list. Assumption
		// if that there's always at least one Export Type
		$found = false;
		foreach ($exportTypes as $exportType) {
			$exportTypeClass = get_class($exportType);
			if ($exportTypeClass == $defaultExportType) {
				$found = true;
				break;
			}
		}
		if (!$found) {
			$defaultExportType = get_class($exportTypes[0]);
		}
		return $defaultExportType;
	}

    /**
     * Returns the subset of Country plugins selected by this user.
     */
    public function getCountryPlugins() {
        $countryPlugins = Core::$countryPlugins;
        $whitelistedCountryPlugins = array();
        foreach ($countryPlugins as $countryPlugin) {
            if (in_array($countryPlugin->getFolder(), $this->selectedCountries)) {
                $whitelistedCountryPlugins[] = $countryPlugin;
            }
        }
        return $whitelistedCountryPlugins;
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

    /**
     * As of 3.2.1, configurations are now backed up for every time the user clicks save. This method continues
     * to work the same, but only returns the most recent configuration version from the history table.
     */
	public function getConfigurations() {
		$accountID = $this->accountID;
		$prefix   = Core::getDbTablePrefix();		

        $response = Core::$db->query("
            SELECT c.*, ch.*, unix_timestamp(c.date_created) as date_created_unix, unix_timestamp(ch.last_updated) as last_updated_unix
            FROM {$prefix}configurations c
                LEFT JOIN {$prefix}configuration_history ch
                    ON ch.configuration_id = c.configuration_id
                    AND ch.history_id =
                        (
                            SELECT history_id
                            FROM {$prefix}configuration_history ch2
                            WHERE ch2.configuration_id = c.configuration_id
                            ORDER BY history_id DESC
                            LIMIT 1
                        )
			WHERE account_id = $accountID
			ORDER BY ch.last_updated DESC
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

    public function getDataSetHistory($configurationID) {
        $accountID = $this->accountID;
        $prefix   = Core::getDbTablePrefix();

        $response = Core::$db->query("
            SELECT  ch.*, unix_timestamp(ch.last_updated) as last_updated_unix
            FROM    {$prefix}configuration_history ch, {$prefix}configurations c
            WHERE c.account_id = $accountID AND
                  c.configuration_id = $configurationID AND
                  c.configuration_id = ch.configuration_id
            ORDER BY ch.last_updated DESC
        ");

        if ($response["success"]) {
            $data = array(
                "maxResults" => Core::getMaxDataSetHistorySize(),
                "results" => array()
            );
            while ($row = mysqli_fetch_assoc($response["results"])) {
                $data["results"][] = $row;
            }
            return array(
                "success"   => true,
                "message"   => $data
            );
        } else {
            return array(
                "success"   => false,
                "message"   => $response["errorMessage"]
            );
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
        $response2 = Core::$db->query("
			DELETE FROM {$prefix}configuration_history
			WHERE configuration_id IN ($configIDStr)
		");

		if ($response["success"] && $response2["success"]) {
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

        // if this is a new configuration, create the main record
		if ($configurationID == null) {
            $response = Core::$db->query("
				INSERT INTO {$prefix}configurations (status, date_created, account_id)
				VALUES ('private', '$now', $accountID)
			");
            if ($response["success"]) {
                $configurationID = mysqli_insert_id(Core::$db->getDBLink());
            } else {
                return array(
                    "success" => false,
                    "message" => "There was a problem saving the configuration: " . $response["errorMessage"]
                );
            }
        }

        $response2 = Core::$db->query("
            INSERT INTO {$prefix}configuration_history (configuration_id, last_updated, configuration_name, content)
            VALUES ($configurationID, '$now', '" . $configurationName . "', '" . $content . "')
        ");
        if ($response2["success"]) {

            $this->truncateDataSetHistory($configurationID);

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

	public function copyConfiguration($data) {
		$dataSetId         = Utils::sanitize($data["dataSetId"]);
		$configurationName = Utils::sanitize($data["newDataSetName"]);

		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			INSERT INTO {$prefix}configurations (status, date_created, account_id, num_rows_generated)
                SELECT status, date_created, account_id, num_rows_generated
                FROM {$prefix}configurations
                WHERE configuration_id = $dataSetId
		");

		if (!$response["success"]) {
            return array(
                "success" => false,
                "message" => "There was a problem copying the Data Set: " . $response["errorMessage"]
            );
        }

        // if it worked okay (it should!) update the last_updated and configuration_name fields
        $newConfigurationID = mysqli_insert_id(Core::$db->getDBLink());
        $response2 = Core::$db->query("
            INSERT INTO {$prefix}configuration_history (configuration_id, last_updated, configuration_name, content)
                SELECT $newConfigurationID as configuration_id, last_updated, configuration_name, content
                FROM {$prefix}configuration_history
                WHERE configuration_id = $dataSetId
        ");

        $now = Utils::getCurrentDatetime();
        $response3 = Core::$db->query("
            UPDATE {$prefix}configurations
            SET date_created = '$now'
            WHERE configuration_id = $newConfigurationID
        ");
        $response4 = Core::$db->query("
            UPDATE {$prefix}configuration_history
            SET configuration_name = '" . $configurationName . "'
            WHERE configuration_id = $newConfigurationID
            ORDER BY history_id DESC
            LIMIT 1
        ");

        if ($response2["success"] && $response3["success"] && $response4["success"]) {
            return array(
                "success" => true,
                "message" => ""
            );
        } else {
            return array(
                "success" => false,
                "message" => "There was a problem copying the Data Set."
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

		$selectedDataTypes = Settings::getSetting("installedDataTypes");
		$selectedExportTypes = Settings::getSetting("installedExportTypes");
		$selectedCountries = Settings::getSetting("installedCountries");

		$result = Core::$db->query("
			INSERT INTO {$prefix}user_accounts (date_created, last_updated, date_expires, last_logged_in, account_type, 
				first_name, last_name, email, password, selected_data_types, selected_export_types, selected_countries)
			VALUES ('$now', '$now', '$now', NULL, '$accountType', '$firstName', '$lastName', '$email', '$password',
				'$selectedDataTypes', '$$selectedExportTypes', '$selectedCountries')
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


	// called by administrators to update a user's account
	public function updateAccountByAdmin($info) {
		$L = Core::$language->getCurrentLanguageStrings();
		$dbLink = Core::$db->getDBLink();
		$accountID = mysqli_real_escape_string($dbLink, $info["accountID"]);
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

		$response = Core::$db->query("
			UPDATE {$prefix}user_accounts
			SET first_name = '$firstName',
				last_name = '$lastName',
				email = '$email'
			WHERE account_id = $accountID
		");

		if ($response["success"]) {
			return array(
				"success" => true
			);
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

    public function getSelectedDataTypes() {
        return $this->selectedDataTypes;
    }

    public function getSelectedExportTypes() {
        return $this->selectedExportTypes;
    }

    public function getSelectedCountries() {
        return $this->selectedCountries;
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


    /**
     * Called after every save. This ensures the size of the history is truncated to whatever value is set (see
     * the $maxDataSetHistorySize setting in Core.
     * @param $configurationID
     */
    private function truncateDataSetHistory($configurationID) {
        $prefix = Core::getDbTablePrefix();
        $maxHistory = Core::getMaxDataSetHistorySize();

        if (empty($maxHistory) || !is_numeric($maxHistory)) {
            return;
        }

        // first, get the ID of the oldest saved history item, according to however large this
        $response = Core::$db->query("
            SELECT *
            FROM  {$prefix}configuration_history
            WHERE configuration_id = $configurationID
            ORDER BY history_id DESC
            LIMIT 1
            OFFSET $maxHistory
        ");

        if ($response["success"] && !empty($response["results"])) {
            $results = mysqli_fetch_assoc($response["results"]);
            $historyID = $results["history_id"];

            Core::$db->query("
              DELETE FROM {$prefix}configuration_history
              WHERE configuration_id = $configurationID AND history_id <= $historyID
            ");
        }
    }

}
