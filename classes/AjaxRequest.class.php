<?php


/**
 * A generic class for handling all of the Core's Ajax requests. All requests are identified
 * through a unique "action" string, and (usually) arbitrary other info passed via POST
 */
class AjaxRequest {
	private $action;
	private $response;

	/**
	 * AjaxRequest objects are automatically processed when they are created, based on the unique $action
	 * value. The result of the call is stored in $response to be handled however you need (e.g. output
	 * as JSON, XML etc) - or an Exception is thrown if something went wrong. Exceptions are used SOLELY for
	 * program errors: not for user-entry errors.
	 */
	public function __construct($action, $post = array()) {
		if (empty($action)) {
			throw new Exception("no_action_specified");
			return;
		}

		$this->action = $action;
		$post = Utils::cleanHash($post);

		switch ($this->action) {

			// ------------------------------------------------------------------------------------
			// INSTALLATION
			// ------------------------------------------------------------------------------------

			// a fresh install assumes it's a blank slate: no database tables, no settings file
			case "installation_test_db_settings":
				Core::init(array());
				list($success, $message) = Database::testDbSettings($post["dbHostname"], $post["dbName"], $post["dbUsername"], $post["dbPassword"]);
				$this->response["success"] = $success;
				$this->response["message"] = $message;
				break;

			case "installation_create_settings_file":
				Core::init(array());
				if (Core::checkSettingsFileExists()) {
					$this->response["success"] = 0;
					$this->response["message"] = "Your settings.php file already exists.";
					return;
				} else {
					list($success, $message) = Installation::createSettingsFile($post["dbHostname"], $post["dbName"], $post["dbUsername"], $post["dbPassword"], $post["dbTablePrefix"]);
					$this->response["success"] = $success;
					$this->response["message"] = $message;
				}
				break;

			case "installation_create_database":
				Core::init(array("database"));
				list($success, $message) = Installation::createDatabase();
				if (!$success) {
					$this->response["success"] = 0;
					$this->response["message"] = $message;
					return;
				}

				// if they want user accounts, create the administrator account
				if ($post["employUserAccounts"] == "yes") {
					$adminAccount = array(
						"accountType" => "admin",
						"firstName"   => $post["firstName"],
						"lastName"    => $post["lastName"],
						"email"       => $post["email"],
						"password"    => $post["password"]
					);
					Account::createUser($adminAccount);
					Settings::setSetting("employUserAccounts", "yes");
				}

				// make note of the fact that we've passed this installation step
				Settings::setSetting("installationStepComplete_Core", "yes");

				$this->response["success"] = 1;
				$this->response["message"] = "";
				break;

			case "installation_data_types":
				Core::init(array("database"));
				$index = $post["index"];

				$groupedDataTypes = DataTypePluginHelper::getDataTypePlugins(false);
				$dataTypes = DataTypePluginHelper::getDataTypeList($groupedDataTypes);

				if ($index >= count($dataTypes)) {
					$this->response["success"] = 1;
					$this->response["isComplete"] = true;
				} else {
					// attempt to install this data type
					$currDataType = $dataTypes[$index];
					$this->response["dataTypeName"] = $currDataType->getName();
					$this->response["dataTypeFolder"] = $currDataType->folder;
					$this->response["isComplete"] = false;

					try {
						list($success, $message) = $currDataType->install();
						$this->response["success"] = $success;
						$this->response["message"] = $message;
					} catch (Exception $e) {
						$this->response["success"] = false;
						$this->response["message"] = "Unknown error.";
					}
				}
				break;

			case "installation_save_data_types":
				Core::init(array("database"));
				$folders = $post["folders"];
				$response = Settings::setSetting("installedDataTypes", $folders);
				$this->response["success"] = $response["success"];
				$this->response["message"] = $response["message"];
				break;

			case "installation_export_types":
				Core::init(array("database"));
				$index = $post["index"];
				$exportTypes = ExportTypePluginHelper::getExportTypePlugins(false);

				if ($index >= count($exportTypes)) {
					$this->response["success"] = 1;
					$this->response["isComplete"] = true;
				} else {
					// attempt to install this data type
					$currExportType = $exportTypes[$index];
					$this->response["exportTypeName"] = $currExportType->getName();
					$this->response["exportTypeFolder"] = $currExportType->folder;
					$this->response["isComplete"] = false;
					try {
						list($success, $message) = $currExportType->install();
						$this->response["success"] = $success;
						$this->response["message"] = $message;
					} catch (Exception $e) {
						$this->response["success"] = false;
						$this->response["message"] = "Unknown error.";
					}
				}
				break;

			case "installation_save_export_types":
				Core::init(array("database"));
				$folders = $post["folders"];
				$response = Settings::setSetting("installedExportTypes", $folders);
				$this->response["success"] = $response["success"];
				$this->response["message"] = $response["message"];
				break;

			case "installation_countries":
				Core::init(array("database"));
				$index = $post["index"];
				$countryPlugins = CountryPluginHelper::getCountryPlugins();

				if ($index >= count($countryPlugins)) {
					$this->response["success"] = 1;
					$this->response["isComplete"] = true;
				} else {
					// attempt to install this data type
					$currCountryPlugin = $countryPlugins[$index];
					$this->response["countryName"] = $currCountryPlugin->getName();
					$this->response["countryFolder"] = $currCountryPlugin->folder;
					$this->response["isComplete"] = false;
					try {
						list($success, $message) = $currCountryPlugin->install();
						$this->response["success"] = $success;
						$this->response["message"] = $message;
					} catch (Exception $e) {
						$this->response["success"] = false;
						$this->response["message"] = "Unknown error.";
					}
				}
				break;

			case "installation_save_countries":
				Core::init(array("database"));
				$folders = $post["folders"];
				$response = Settings::setSetting("installedCountries", $folders);
				$response = Settings::setSetting("installationComplete", "yes");
				$this->response["success"] = $response["success"];
				$this->response["message"] = $response["message"];
				break;

			// ------------------------------------------------------------------------------------
			// USER ACCOUNTS
			// ------------------------------------------------------------------------------------

			case "login":
				break;

			case "logout":
				break;


			case "loadConfiguration":
/*        $assertions = array(
					"logged_in" => true,
					"post" => array(
						"required" => "form_id",
						"numeric"  => "form_id"
					)
				);
				Utils::assert($assertions);
				$this->response = Core::$user->loadConfiguration($post["form_id"]);
*/
				break;

			case "saveConfiguration":
//				$account_id   = $_SESSION["account_id"];
//				$form_name    = addslashes($request["form_name"]);
//				$form_content = addslashes($request["form_content"]);
				//gd_save_form($account_id, $form_name, $form_content);
				$this->response = Core::$user->saveConfiguration($post);
				break;

			case "deleteConfiguration":
				$form_id = $request["form_id"];
				gd_delete_form($form_id);
				break;




			case "updateSettings":
				list($success, $message) = Settings::updateSettings($post);
				$this->response["success"] = $success;
				$this->response["message"] = $message;
				break;
		}
	}

	public function getResponse() {
		return $this->response;
	}
}

