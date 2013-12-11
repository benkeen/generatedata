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

			case "installationDataTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$this->setDataTypes();
				}
				break;

			case "resetDataTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->setDataTypes();
				}
				break;

			case "installationSaveDataTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$folders = $this->post["folders"];
					$response = Settings::setSetting("installedDataTypes", $folders);
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["errorMessage"];
				}
				break;

			case "resetSaveDataTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$folders = $this->post["folders"];
					$response = Settings::setSetting("installedDataTypes", $folders);
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["errorMessage"];
				}
				break;

			case "installationExportTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$this->setExportTypes();
				}
				break;

			case "resetExportTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->setExportTypes();
				}
				break;

			case "installationSaveExportTypes":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$folders = $this->post["folders"];
					$response = Settings::setSetting("installedExportTypes", $folders);
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["errorMessage"];
				}
				break;

			case "resetSaveExportTypes":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$folders = $this->post["folders"];
					$response = Settings::setSetting("installedExportTypes", $folders);
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["errorMessage"];
				}
				break;

			case "installationCountries":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$this->setCountries();
				}
				break;

			case "resetCountries":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$this->setCountries();
				}
				break;

			case "installationSaveCountries":
				Core::init("installationDatabaseReady");
				if (!Core::checkIsInstalled()) {
					$folders = $this->post["folders"];
					Settings::setSetting("installedCountries", $folders);
					$response = Settings::setSetting("installationComplete", "yes");
					$this->response["success"] = $response["success"];
					$this->response["content"] = $response["errorMessage"];
				}
				break;

			case "resetSaveCountries":
				Core::init("resetPlugins");
				if (Core::checkIsLoggedIn() && Core::$user->isAdmin()) {
					$folders = $this->post["folders"];
					Settings::setSetting("installedCountries", $folders);
					$this->response["success"] = true; // ...!
				}
				break;

			// called anytime the plugins were updated (either via the installation or core script). This
			// runs any post-processes that need to be done
			case "updatedPluginsPostProcess":
				Core::init();
				$this->response["success"] = (Minification::createAppStartFile()) ? 1 : 0;
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

			case "saveConfiguration":
				Core::init();
				$response = Core::$user->saveConfiguration($this->post);
				$this->response["success"] = $response["success"];
				$this->response["content"] = $response["message"];
				if (isset($response["lastUpdated"])) {
					$this->response["lastUpdated"] = $response["lastUpdated"];
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
				$gen = new DataGenerator($this->post);
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


	private function setDataTypes() {
		$index = $this->post["index"];
		$groupedDataTypes = DataTypePluginHelper::getDataTypePlugins("installationDatabaseReady", false);
		$dataTypes        = DataTypePluginHelper::getDataTypeList($groupedDataTypes);

		if ($index >= count($dataTypes)) {
			$this->response["success"] = 1;
			$this->response["content"] = "";
			$this->response["isComplete"] = true;
		} else {
			// attempt to install this data type
			$currDataType = $dataTypes[$index];
			$this->response["dataTypeName"] = $currDataType->getName();
			$this->response["dataTypeFolder"] = $currDataType->folder;
			$this->response["isComplete"] = false;

			try {
				list($success, $content) = $currDataType->install();
				$this->response["success"] = $success;
				$this->response["content"] = $content;
			} catch (Exception $e) {
				$this->response["success"] = false;
				$this->response["content"] = "Unknown error.";
			}
		}
	}

	private function setExportTypes() {
		$index = $this->post["index"];
		$exportTypes = ExportTypePluginHelper::getExportTypePlugins("installationDatabaseReady", false);

		if ($index >= count($exportTypes)) {
			$this->response["success"] = 1;
			$this->response["content"] = "";
			$this->response["isComplete"] = true;
		} else {
			// attempt to install this export type
			$currExportType = $exportTypes[$index];
			$this->response["exportTypeName"] = $currExportType->getName();
			$this->response["exportTypeFolder"] = $currExportType->folder;
			$this->response["isComplete"] = false;
			try {
				list($success, $content) = $currExportType->install();
				$this->response["success"] = $success;
				$this->response["content"] = $content;
			} catch (Exception $e) {
				$this->response["success"] = false;
				$this->response["content"] = "Unknown error.";
			}
		}
	}

	private function setCountries() {
		$index = $this->post["index"];
		$countryPlugins = CountryPluginHelper::getCountryPlugins(false);

		if ($index >= count($countryPlugins)) {
			$this->response["success"] = 1;
			$this->response["content"] = "";
			$this->response["isComplete"] = true;
		} else {
			// attempt to install this country
			$currCountryPlugin = $countryPlugins[$index];
			$this->response["countryName"] = $currCountryPlugin->getName();
			$this->response["countryFolder"] = $currCountryPlugin->folder;
			$this->response["isComplete"] = false;
			try {
				// always run the uninstallation function first to ensure any old data is all cleared out
				$currCountryPlugin->uninstall();
				list($success, $content) = $currCountryPlugin->install();
				$this->response["success"] = $success;
				$this->response["content"] = $content;
			} catch (Exception $e) {
				$this->response["success"] = false;
				$this->response["content"] = "Unknown error.";
			}
		}
	}
}
