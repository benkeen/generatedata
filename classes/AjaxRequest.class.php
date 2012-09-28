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


			// a fresh install assumes it's a blank slate: no database tables, no settings file
			case "installation_test_db_settings":
				list($success, $message) = Database::testDbSettings($post["dbHostname"], $post["dbName"], $post["dbUsername"], $post["dbPassword"]);
				$this->response["success"] = $success;
				$this->response["message"] = $message;
				break;

			case "installation_create_settings_file":
				list($success, $message) = Installation::createSettingsFile($post["dbHostname"], $post["dbName"], $post["dbUsername"], $post["dbPassword"], $post["dbTablePrefix"]);
				if (!$success) {
					$this->response["success"] = 0;
					$this->response["message"] = $message;
					return;
				}
				break;

			case "installation_create_core_database":
				break;

			case "installation_data_types":
				break;

			case "installation_export_types":
				break;

			case "install":
				if (Core::checkIsInstalled()) {
					$this->response["success"] = 0;
					$this->response["message"] = "Your settings.php file already exists.";
					return;
				}

				// now create the database. This creates the database and initializes the Core::$db object
				// for use by any following SQL

				$installationLog = array();

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
				}

				$this->response["success"] = 1;
				$this->response["message"] = "";
				break;

			case "login":
				break;

			case "logout":
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

