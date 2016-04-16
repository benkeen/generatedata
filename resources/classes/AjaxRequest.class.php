<?php

/**
 * A generic class for handling all of the Core's Ajax requests. All requests are identified
 * through a unique "action" string, and (usually) arbitrary other info passed via POST.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class AjaxRequest {
	private $action;
	private $response;
	private $post;

	/**
	 * AjaxRequest objects are automatically processed when they are created, based on the unique $action
	 * value. The result of the call is stored in $response to be handled however you need (e.g. output
	 * as JSON, XML etc) - or an Exception is thrown if something went wrong. Exceptions are used SOLELY for
	 * program errors: not for user-entry errors.
	 */
	public function __construct($action, $post = array()) {

		$this->action = $action;
		$this->post = Utils::sanitize($post);

		switch ($this->action) {

			// ------------------------------------------------------------------------------------
			// INSTALLATION
			// ------------------------------------------------------------------------------------

			// a fresh install assumes it's a blank slate: no database tables, no settings file
			case "installationTestDbSettings":
				Core::init("installation");
				if (Core::checkIsInstalled()) {
					return;
				}
				list($success, $content) = Database::testDbSettings($this->post["dbHostname"], $this->post["dbName"], $this->post["dbUsername"], $this->post["dbPassword"]);
				$this->response["success"] = $success;
				$this->response["content"] = $content;
				break;

			case "installationCreateSettingsFile":
				Core::init("installation");
				if (Core::checkIsInstalled()) {
					return;
				}
				if (Core::checkSettingsFileExists()) {
					$this->response["success"] = 0;
					$this->response["content"] = "Your settings.php file already exists.";
					return;
				} else {
					list($success, $content) = Installation::createSettingsFile($this->post["dbHostname"],
						$this->post["dbName"], $this->post["dbUsername"], $this->post["dbPassword"], $this->post["dbTablePrefix"]);
					$this->response["success"] = ($success) ? 1 : 0; // bah!
					$this->response["content"] = $content;
				}
				break;

			case "confirmSettingsFileExists":
				Core::init("installation");
				$settingsFileExists = Core::checkSettingsFileExists();
				$this->response["success"] = ($settingsFileExists) ? 1 : 0;
				break;

			case "installationCreateDatabase":
				Core::init("installationDatabaseReady");
				if (Core::checkIsInstalled()) {
					$this->response["success"] = 0;
					$this->response["content"] = "It appears that the script is already installed. If the database already existed, you may need to delete the tables manually before being able to continue.";
					return;
				}
				list($success, $content) = Installation::createDatabase();
				if (!$success) {
					$this->response["success"] = 0;
					$this->response["content"] = $content;
					return;
				}

				// always create the administrator account. If the user chose the anonymous setup, all values
				// will be blank and all configurations will be associated with this (anonymous) user
				$adminAccount = array(
					"accountType" => "admin"
				);
				if ($this->post["userAccountSetup"] != "anonymous") {
					$adminAccount["firstName"] = $this->post["firstName"];
					$adminAccount["lastName"]  = $this->post["lastName"];
					$adminAccount["email"]     = $this->post["email"];
					$adminAccount["password"]  = $this->post["password"];
				}
				Account::createAccount($adminAccount, true);

				// make note of the fact that we've passed this step of the installation process
				Settings::setSetting("userAccountSetup", $this->post["userAccountSetup"]);
				Settings::setSetting("installationStepComplete_Core", "yes");
				Settings::setSetting("defaultLanguage", $this->post["defaultLanguage"]);
				Settings::setSetting("allowAnonymousAccess", ($this->post["allowAnonymousAccess"] == "yes") ? "yes" : "no");
				Settings::setSetting("anonymousUserPermissionDeniedMsg", $this->post["anonymousUserPermissionDeniedMsg"]);

				$this->response["success"] = 1;
				$this->response["content"] = "";
				break;


			// ------------------------------------------------------------------------------------
			// PLUGINS (installation + reset)
			// ------------------------------------------------------------------------------------

			case "installDataTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
                    $this->installDataTypes();
				}
				break;

            case "installationValidateSettingsFile":
                $response = Installation::validateSettingsFile();
                $this->response["success"] = $response["success"];
                $this->response["content"] = $response["errorMessage"];
                break;

			case "resetDataTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->installDataTypes();
				}
				break;

			case "installExportTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$this->installExportTypes();
				}
				break;

			case "resetExportTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->installExportTypes();
				}
				break;

            case "completeInstallation":
                Core::init("installationDatabaseReady");
                if (!Core::checkIsInstalled()) {
                    $response = Account::updateSelectedPlugins(1, $this->post["dataTypes"], $this->post["exportTypes"], $this->post["countries"]);
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["message"];
                    Settings::setSetting("installationComplete", "yes");

                    // at this point the user's finished the installation.
                    if (!Minification::createAppStartFile()) {
                        // need error handling here
                    }
                    return;
                }
                break;

            case "saveUserPlugins":
                Core::init();
                if (Core::checkIsLoggedIn()) {
                    $response = Account::updateSelectedPlugins(Core::$user->getAccountID(), $this->post["dataTypes"],
							$this->post["exportTypes"], $this->post["countries"]);
                    $this->response["success"] = $response["success"];
					$this->response["content"] = $response["message"];
                }
				if (Core::$user->isAdmin()) {
					Minification::createAppStartFile();
				}
                break;

			case "installCountries":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$this->installCountries();
				}
				break;

			case "resetCountries":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->installCountries();
				}
				break;


			// ------------------------------------------------------------------------------------
			// USER ACCOUNTS
			// ------------------------------------------------------------------------------------

			case "getAccount":
				Core::init();
				$response = Core::$user->getAccount();
				$this->response["success"] = true;
				$this->response["content"] = $response;
				break;

			case "getUsers":
				Core::init();
				$response = Core::$user->getUsers();
				$this->response["success"] = $response["success"];
				if (isset($response["accounts"])) {
					$this->response["content"] = $response["accounts"];
				}
				break;

			case "createAccount":
				Core::init();
				if (!Core::checkIsLoggedIn()) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NOT_LOGGED_IN;
				} else if (Core::$user->getAccountType() != "admin") {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NON_ADMIN;
				} else if (Account::checkAccountExists($this->post["email"])) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::ACCOUNT_ALREADY_EXISTS;
				} else {
					$accountInfo = $this->post;
					$accountInfo["accountType"] = "user";
					Account::createAccount($accountInfo);
					$this->response["success"] = true;
				}
				break;

			case "deleteAccount":
				Core::init();
				if (!Core::checkIsLoggedIn()) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NOT_LOGGED_IN;
				} else if (Core::$user->getAccountType() != "admin") {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NON_ADMIN;
				} else {
					$accountID = $this->post["accountID"];
					$response = Core::$user->deleteAccount($accountID);
					$this->response["success"] = true;
				}
				break;

			// updates the current logged in user's info
			case "updateAccount":
				Core::init();
				if (!Core::checkIsLoggedIn()) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NOT_LOGGED_IN;
				} else if (Core::$user->isAnonymousAdmin()) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::INVALID_REQUEST;
				} else {
					$accountID = $this->post["accountID"];
					$this->response = Core::$user->updateAccount($accountID, $this->post);
				}
				break;

			// updates a different user account by an administrator
			case "updateAccountByAdmin":
				Core::init();
				if (!Core::checkIsLoggedIn()) {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NOT_LOGGED_IN;
				} else if (Core::$user->getAccountType() != "admin") {
					$this->response["success"] = false;
					$this->response["errorCode"] = ErrorCodes::NON_ADMIN;
				} else {
					Account::updateAccountByAdmin($this->post);
					$this->response["success"] = true;
				}
				break;

			case "saveConfiguration":
				Core::init();
				$response = Core::$user->saveConfiguration($this->post);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				if (isset($response["lastUpdated"])) {
					$this->response["lastUpdated"] = $response["lastUpdated"];
				}
				break;

            case "saveGlobalSettings":
                Core::init();
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin() || Core::$user->isAnonymousAdmin()) {
					list($success, $message) = Settings::updateGlobalSettings($this->post);
					$this->response["success"] = $success;
					$this->response["content"] = $message;
				}
                break;

			case "copyDataSet":
				Core::init();
                $response = Core::$user->copyConfiguration($this->post);
                $this->response["success"] = $response["success"];
                $this->response["content"] = $response["message"];
				break;

			case "deleteDataSets":
				Core::init();
				$configurationIDs = $this->post["configurationIDs"];
				$response = Core::$user->deleteConfigurations($configurationIDs);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				break;

			case "saveDataSetVisibilityStatus":
				Core::init();
				$configurationID = $this->post["configurationID"];
				$status = $this->post["status"];
				$time   = $this->post["time"];
				$response = Core::$user->saveDataSetVisibilityStatus($configurationID, $status, $time);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				if (isset($response["newStatus"])) {
					$this->response["newStatus"] = $response["newStatus"];
				}
				break;

			case "getPublicDataSet":
				Core::init();
				$configurationID = $this->post["dataSetID"];
				$response = Core::$user->getPublicDataSet($configurationID);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				break;

            case "getDataSetHistory":
                Core::init();
                $configurationID = $this->post["dataSetID"];
                $response = Core::$user->getDataSetHistory($configurationID);
                $this->response["success"] = $response["success"];
                $this->response["content"] = $response["message"];
                break;

			case "login":
				Core::init();
				$email = $this->post["email"];
				$password = $this->post["password"];
				$response = Account::login($email, $password);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				break;

			case "logout":
				Core::init();
				if (!Core::checkIsLoggedIn()) {
					$this->response["success"] = true;
				} else if (!Core::$user->isAnonymousAdmin()) {
					Core::$user->logout();
					$this->response["success"] = true;
				}
				break;

			case "resetPassword":
				Core::init();
				$email = $this->post["email"];
				$response = Account::resetPassword($email);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				break;


			// ------------------------------------------------------------------------------------
			// DATA GENERATION
			// ------------------------------------------------------------------------------------

			case "generateInPage":
				Core::init("generation");
				$gen = new DataGenerator(Constants::GEN_ENVIRONMENT_POST, $this->post);
				$response = $gen->generate();
				$this->response["success"]    = $response["success"];
				$this->response["content"]    = $response["content"];
				$this->response["isComplete"] = $response["isComplete"];
				break;
		}
	}


	// HELPERS

	public function getResponse() {
		return Utils::utf8_encode_array($this->response);
	}

    private function installDataTypes() {
        $groupedDataTypes = DataTypePluginHelper::getDataTypePlugins("installationDatabaseReady", false);
        $L = Core::$language->getCurrentLanguageStrings();
        $hasError = false;
        $response = array();
        $count = 0;
        $folders = array();


        while (list($group_name, $dataTypes) = each($groupedDataTypes)) {
            $data = array();
            foreach ($dataTypes as $currDataType) {
                try {
                    list($success, $content) = $currDataType->install();
                    if (!$success) {
                        $hasError = true;
                        break;
                    }
                    $folder = $currDataType->getFolder();
                    $data[] = array(
                        "name"   => $currDataType->getName(),
                        "folder" => $folder,
                        "desc"   => $currDataType->getDesc()
                    );
                    $folders[] = $folder;
                    $count++;
                } catch (Exception $e) {
                    $hasError = true;
                    break;
                }
            }

            // organized in this data structure because objects lose their order
            $response[] = array(
                "group_name" => $L[$group_name],
                "data_types" => $data
            );
        }

        // need error handling here
        Settings::setSetting("installedDataTypes", implode(",", $folders));

        $this->response["success"] = !$hasError;
        $this->response["content"] = array(
            "total" => $count,
            "results" => $response
        );
    }

    private function installExportTypes() {
        $exportTypes = ExportTypePluginHelper::getExportTypePlugins("installationDatabaseReady", false);
        $hasError = false;
        $results = array();
        $count = 0;
        $folders = array();

        foreach ($exportTypes as $currExportType) {
            try {
                list($success, $content) = $currExportType->install();
                if (!$success) {
                    $hasError = true;
                    break;
                }
                $folder = $currExportType->getFolder();
                $results[] = array(
                    "name"   => $currExportType->getName(),
                    "folder" => $folder
                );
                $folders[] = $folder;
                $count++;
            } catch (Exception $e) {
                $hasError = true;
                break;
            }
        }

        // need error handling here
        Settings::setSetting("installedExportTypes", implode(",", $folders));

        $this->response["success"] = !$hasError;
        $this->response["content"] = array(
            "total" => $count,
            "results" => $results
        );
    }

    private function installCountries() {
        $countryPlugins = CountryPluginHelper::getCountryPlugins(false);
        $hasError = false;
        $results = array();
        $count = 0;
        $folders = array();

        foreach ($countryPlugins as $currCountry) {

			// ensure the country uninstalls itself first
			$currCountry->uninstall();

            try {
                list($success, $content) = $currCountry->install();
                if (!$success) {
                    $hasError = true;
                    break;
                }
                $folder = $currCountry->getFolder();
                $results[] = array(
                    "name"   => $currCountry->getName(),
                    "folder" => $folder
                );
                $folders[] = $folder;
                $count++;
            } catch (Exception $e) {
                $hasError = true;
                break;
            }
        }

        // need error handling here
        Settings::setSetting("installedCountries", implode(",", $folders));

        $this->response["success"] = !$hasError;
        $this->response["content"] = array(
            "total" => $count,
            "results" => $results
        );
    }
}
