<?php


/**
 * Called on script load for any Data Generator page. It does all the heavy lifting and initializes various
 * general vars and data for the script. It's used instead of the global namespace to store info needed throughout
 * the code; the class is static so we don't need to re-instantiate it all over the place, and force it to
 * reload/re-instantiate the various components.
 */
class Core {

	// overridable settings that the user may define in settings.php
	private static $dbHostname;
	private static $dbName;
	private static $dbUsername;
	private static $dbPassword;
	private static $dbTablePrefix = "gd_";
	private static $encryptionSalt;
	private static $errorReporting = 2047;
	private static $maxGeneratedRows = 100000;
	private static $defaultNumRows = 100;
	private static $defaultLanguageFile = "en";
	private static $defaultExportType = "HTML";
	private static $defaultCountryPlugins = array("canada", "united_states");

	// non-overidable settings
	private static $version = "3.0.0";
	private static $minimumPHPVersion = "5.2.0";
	private static $settingsFileExists = false;
	private static $dataTypeGroups = array("human_data", "geo", "text", "numeric", "other");

	// left as public, because they're often modified
	public static $language;
	public static $db;
	public static $smarty;
	public static $translations;
	public static $user; // the current logged in user (if there IS someone logged in)
	public static $dataTypePlugins;
	public static $exportTypePlugins;
	public static $countryPlugins;


	/**
	 * Our initialization function. This is called on all page requests to initialize the Core
	 * object. Since it's also used during installation (when the databas and/or plugins haven't been
	 * installed), the optional parameter controls whether or not the database object and plugins should
	 * be initialized.
	 *
	 * @param string $runtimeContext This determines the context in which the Core is being initialized. This
	 *          info is used to let plugins instantiate themselves differently, as well as prevent the loading
	 *          of incomplete parts of the script.
	 *          "installation":          a fresh installation, DB not installed yet
	 *          "installation_db_ready": during installation after the DB has been installed
	 *          "ui":                    (default) for the main generator page
	 *          "generation":            when we're in the process of creating actual data
	 */
	public static function init($runtimeContext = "ui") {
		self::loadSettingsFile();

		error_reporting(self::$errorReporting);

		self::$translations = new Translations();
		self::$language     = new Language(self::$defaultLanguageFile);

		self::initSmarty();

		if ($runtimeContext != "installation") {
			self::initDatabase();
		}

		if ($runtimeContext == "ui" || $runtimeContext == "generation") {
			self::initCountries();
			self::initExportTypes($runtimeContext);
			self::initDataTypes($runtimeContext);
		}
	}


	/**
	 * Attempts to load the settings file. If successful, it updates the various private member vars
	 * with whatevers been defined.
	 */
	public function loadSettingsFile() {
		$settingsFilePath = realpath(dirname(__FILE__) . "/../settings.php");
		if (file_exists($settingsFilePath)) {
			self::$settingsFileExists = true;
			require_once($settingsFilePath);
			self::$dbHostname = (isset($dbHostname)) ? $dbHostname : null;
			self::$dbName     = (isset($dbName)) ? $dbName : null;
			self::$dbUsername = (isset($dbUsername)) ? $dbUsername : null;
			self::$dbPassword = (isset($dbPassword)) ? $dbPassword : null;
			self::$dbTablePrefix = (isset($dbTablePrefix)) ? $dbTablePrefix : null;
			self::$errorReporting = (isset($errorReporting)) ? $errorReporting : null;
			self::$encryptionSalt = (isset($encryptionSalt)) ? $encryptionSalt : null;

			if (isset($maxGeneratedRows)) {
				self::$maxGeneratedRows = maxGeneratedRows;
			}
			if (isset($defaultNumRows)) {
				self::$defaultNumRows = $defaultNumRows;
			}
			if (isset($defaultLanguageFile)) {
				self::$defaultLanguageFile = $defaultLanguageFile;
			}
		}
	}

	private function initSmarty() {
		self::$smarty = new Smarty();
		self::$smarty->template_dir = realpath(dirname(__FILE__) . "/../resources/templates/");
		self::$smarty->compile_dir  = realpath(dirname(__FILE__) . "/../cache/");
		self::$smarty->assign("version", self::getVersion());
		self::$smarty->assign("samePage", Utils::getCleanPhpSelf());
	}

	public function initDatabase() {
		if (Core::$settingsFileExists) {
			self::$db = new Database();
		}
	}

	public function initDataTypes($runtimeContext) {
		if (!Core::$settingsFileExists) {
			return;
		}

		// parse the Data Types folder and identify those plugins that are available
		self::$dataTypePlugins = DataTypePluginHelper::getDataTypePlugins($runtimeContext);
	}

	public function initExportTypes($runtimeContext) {
		if (!Core::$settingsFileExists) {
			return;
		}
		self::$exportTypePlugins = ExportTypePluginHelper::getExportTypePlugins($runtimeContext);
	}

	public function initCountries() {
		if (!Core::$settingsFileExists) {
			return;
		}
		self::$countryPlugins = CountryPluginHelper::getCountryPlugins();
	}

	public function getDefaultExportType() {
		return self::$defaultExportType;
	}

	public function getDefaultCountryPlugins() {
		return self::$defaultCountryPlugins;
	}

	public function getHostname() {
		return self::$dbHostname;
	}

	public function getDbName() {
		return self::$dbName;
	}

	public function getDbUsername() {
		return self::$dbUsername;
	}

	public function getDbPassword() {
		return self::$dbPassword;
	}

	public function getDbTablePrefix() {
		return self::$dbTablePrefix;
	}

	public function getMaxGeneratedRows() {
		return self::$maxGeneratedRows;
	}

	public function getEncryptionSalt() {
		return self::$encryptionSalt;
	}

	public function getDefaultNumRows() {
		return self::$defaultNumRows;
	}

	public function getVersion() {
		return self::$version;
	}

	public function checkSettingsFileExists() {
		return self::$settingsFileExists;
	}

	/**
	 * Full installation of the program is determined by (a) the settings.php file existing and (b)
	 * the "installationComplete" setting value existing in the database. Note: this function assumes
	 * the database connection in Core::$db has already been created.
	 */
	public function checkIsInstalled() {
		if (!self::$settingsFileExists) {
			return false;
		}
		$installationComplete = Settings::getSetting("installationComplete");
		if (!isset($installationComplete) || $installationComplete == "no") {
			return false;
		}
		return true;
	}

	public function getDefaultLanguageFile() {
		return self::$defaultLanguageFile;
	}

	public function getDataTypeGroups() {
		return self::$dataTypeGroups;
	}

	public function getMinimumPHPVersion() {
		return self::$minimumPHPVersion;
	}
}
