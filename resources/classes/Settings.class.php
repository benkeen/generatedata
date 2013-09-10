<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Settings {

	/**
	 * Returns all settings in the database.
	 * @return
	 */
	public static function getSettings() {
		$prefix = Core::getDbTablePrefix();
		$query = Core::$db->query("SELECT * FROM {$prefix}settings");

		// TODO. work out standardized return format... Exception maybe
		if ($query["success"]) {
			$results = array();
			while ($row = mysqli_fetch_assoc($query["results"])) {
				$results[$row["setting_name"]] = $row["setting_value"];
			}
			return $results;
		} else {
			return;
		}
	}

	/**
	 * Returns the value of a specific settings.
	 * @param string the unique setting name (setting_name column value in the Settings table)
	 * @return if not found, null. Otherwise the string value
	 */
	public static function getSetting($settingName) {
		$prefix = Core::getDbTablePrefix();

		if (!Core::$db) {
			return;
		}

		$response = Core::$db->query("
			SELECT setting_value
			FROM {$prefix}settings
			WHERE setting_name = '$settingName'
		");

		$value = null;
		if ($response["success"]) {
			$data = mysqli_fetch_assoc($response["results"]);
			$value = $data["setting_value"];
		}

		return $value;
	}

	public static function setSetting($settingName, $settingValue) {
		$prefix = Core::getDbTablePrefix();
		$settingValue = mysqli_real_escape_string(Core::$db->getDBLink(), $settingValue);
		$response = Core::$db->query("
			UPDATE {$prefix}settings
			SET    setting_value = '$settingValue'
			WHERE  setting_name = '$settingName'
		");
		return $response;
	}

	/**
	 * Used to update the settings on the Settings tab.
	 * @param array $post
	 */
	public static function updateSettings($post) {
		$accountInfo = Core::$user->getAccount();
		$dbLink = Core::$db->getDBLink();
		$accountType = $accountInfo["accountType"];
		$isAnonymous = isset($accountInfo["isAnonymous"]) ? $accountInfo["isAnonymous"] : "";

		$L = Core::$language->getCurrentLanguageStrings();
		if (!isset($post["consoleEventsDataTypePlugins"]) || empty($post["consoleEventsDataTypePlugins"])) {
			$post["consoleEventsDataTypePlugins"] = array();
		}
		if (!isset($post["consoleEventsExportTypePlugins"]) || empty($post["consoleEventsExportTypePlugins"])) {
			$post["consoleEventsExportTypePlugins"] = array();
		}

		$settings = array(
			"consoleWarnings"         => isset($post["consoleWarnings"]) ? "enabled" : "",
			"consoleEventsPublish"    => isset($post["consoleEventsPublish"]) ? "enabled" : "",
			"consoleEventsSubscribe"  => isset($post["consoleEventsSubscribe"]) ? "enabled" : "",
			"consoleCoreEvents"       => isset($post["consoleCoreEvents"]) ? "enabled" : "",
			"consoleEventsDataTypePlugins"   => implode(",", $post["consoleEventsDataTypePlugins"]),
			"consoleEventsExportTypePlugins" => implode(",", $post["consoleEventsExportTypePlugins"]),
		    "theme" => $post["theme"]
		);

		if (!$isAnonymous && $accountType == "admin") {
			if (isset($post["userAccountSetup"])) {
				$settings["userAccountSetup"] = ($post["userAccountSetup"] == "single") ? "single" : "multiple";
			}
		}

		$prefix = Core::getDbTablePrefix();
		$errors = array();
		while (list($key, $value) = each($settings)) {
			$value = mysqli_real_escape_string($dbLink, $value);
			$result = Core::$db->query("
				UPDATE {$prefix}settings
				SET    setting_value = '$value'
				WHERE  setting_name = '$key'
			");
			if (!$result["success"]) {
				$errors[] = $result["errorMessage"];
			}
		}

		if (count($errors) > 0) {
			return array(false, implode("<br />", $errors));
		} else {
			return array(true, $L["notify_settings_updated"]);
		}
	}

	/**
	 * A custom function for outputting a settings file into the constants.js file. This
	 * allows the file to be referenced in the installation script prior to actual installation (where
	 * there are no settings yet in the DB).
	 *
	 * @param string $setting
	 */
	public function safeDisplaySetting($setting) {
		switch ($setting) {
			case "consoleWarnings":
				if (!Core::checkIsInstalled()) {
					echo "false";
				} else {
					echo (Settings::getSetting("consoleWarnings") == "enabled") ? "true" : "false";
				}
				break;

			case "consoleEventsPublish":
				if (!Core::checkIsInstalled()) {
					echo "false";
				} else {
					echo (Settings::getSetting("consoleEventsPublish") == "enabled") ? "true" : "false";
				}
				break;

			case "consoleEventsSubscribe":
				if (!Core::checkIsInstalled()) {
					echo "false";
				} else {
					echo (Settings::getSetting("consoleEventsSubscribe") == "enabled") ? "true" : "false";
				}
				break;

			case "consoleCoreEvents":
				if (!Core::checkIsInstalled()) {
					echo "false";
				} else {
					echo (Settings::getSetting("consoleCoreEvents") == "enabled") ? "true" : "false";
				}
				break;

			case "consoleEventsDataTypePlugins":
				if (Core::checkIsInstalled()) {
					echo Settings::getSetting("consoleEventsDataTypePlugins");
				}
				break;

			case "consoleEventsExportTypePlugins":
				if (Core::checkIsInstalled()) {
					echo Settings::getSetting("consoleEventsExportTypePlugins");
				}
				break;

			case "theme":
				if (Core::checkIsInstalled()) {
					echo Settings::getSetting("theme");
				}
				break;

			case "anonymousUserPermissionDeniedMsg":
				if (Core::checkIsInstalled()) {
					// this message is entered by the user during installation. It can contain any old thing, but we're outputting it
					// into a JS var. So, handle newlines + double quotes.
					$message = Settings::getSetting("anonymousUserPermissionDeniedMsg");
					$message = addslashes($message);
					$message = preg_replace("/\n/", "\\n", $message);
					echo $message;
				}
				break;
		}
	}
}
