<?php

/**
 * Called on script load for any Data Generator page. It does all the heavy lifting and initializes various
 * general vars and data for the script. It's used instead of the global namespace to store info needed throughout
 * the code; the class is static so we don't need to re-instantiate it all over the place, and force it to
 * reload/re-instantiate the various components.
 *
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Core {

	// overridable settings that the user may define in settings.php
	private static $demoMode = false;
	private static $dbHostname;
	private static $dbName;
	private static $dbUsername;
	private static $dbPassword;
	private static $dbTablePrefix = "gd_";
	private static $encryptionSalt;
	private static $errorReporting = 1;
	private static $maxGeneratedRows = 100000;
	private static $defaultNumRows = 100;
	private static $defaultLanguageFile = "en";
	private static $defaultExportType = "HTML";
	private static $defaultCountryPlugins = array("canada", "united_states");
	private static $defaultTheme = "classic";

	// non-overidable settings
	private static $version = "3.0.0 alpha 1";
	private static $minimumPHPVersion = "5.2.0";
	private static $settingsFileExists = false;
	private static $dataTypeGroups = array("human_data", "geo", "text", "numeric", "other");

	// left as public, because they're often modified / accessed, and it's just too fussy otherwise
	public static $language;
	public static $db;
	public static $smarty;
	public static $translations;
	public static $user;
	public static $dataTypePlugins;
	public static $exportTypePlugins;
	public static $countryPlugins;
	public static $geoData;


	/**
	 * Core::init()
	 *
	 * Our initialization function. This is called on all page requests to initialize the Core
	 * object. Since it's also used during installation (when the databas and/or plugins haven't been
	 * installed), the optional parameter controls whether or not the database object and plugins should
	 * be initialized.
	 *
	 * @access public
	 * @static
	 * @param string $runtimeContext This determines the context in which the Core is being initialized. This
	 *          info is used to let plugins instantiate themselves differently, as well as prevent the loading
	 *          of incomplete parts of the script.<br />
	 *          <b>installation</b>:          a fresh installation, DB not installed yet<br />
	 *          <b>installation_db_ready</b>: during installation after the DB has been installed<br />
	 *          <b>ui</b>:                    (default) for the main generator page<br />
	 *          <b>generation</b>:            when we're in the process of creating actual data
	 */
	public static function init($runtimeContext = "ui") {
		self::loadSettingsFile();

		error_reporting(self::$errorReporting);

		self::$translations = new Translations();
		self::$language     = new Language(self::$defaultLanguageFile);

		self::initSmarty();

		// the order is significant, here
		if ($runtimeContext != "installation" || $runtimeContext != "installation_db_ready") {
			self::initDatabase();
		}
		if ($runtimeContext == "generation") {
			self::initGeoData();
		}
		if ($runtimeContext == "ui" || $runtimeContext == "generation") {
			self::initCountries();
			self::initExportTypes($runtimeContext);
			self::initDataTypes($runtimeContext);
			self::initUser();
		}
	}


	/**
     * Core::init()
     *
	 * Attempts to load the settings file. If successful, it updates the various private member vars
	 * with whatevers been defined.
	 * @access private
	 */
	private function loadSettingsFile() {
		$settingsFilePath = realpath(dirname(__FILE__) . "/../../settings.php");
		if (file_exists($settingsFilePath)) {
			self::$settingsFileExists = true;
			require_once($settingsFilePath);
			self::$demoMode = (isset($demoMode)) ? $demoMode : null;
			self::$dbHostname = (isset($dbHostname)) ? $dbHostname : null;
			self::$dbName     = (isset($dbName)) ? $dbName : null;
			self::$dbUsername = (isset($dbUsername)) ? $dbUsername : null;
			self::$dbPassword = (isset($dbPassword)) ? $dbPassword : null;
			self::$dbTablePrefix = (isset($dbTablePrefix)) ? $dbTablePrefix : null;
			self::$encryptionSalt = (isset($encryptionSalt)) ? $encryptionSalt : null;

			if (isset($demoMode)) {
				self::$demoMode = $demoMode;
			}
			if (isset($errorReporting)) {
				self::$errorReporting = $errorReporting;
			}
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

	/**
	 * @access public
	 */
	public function getDefaultExportType() {
		return self::$defaultExportType;
	}

	/**
	 * @access public
	 */
	public function checkDemoMode() {
		return (self::$demoMode) ? "true" : "false";
	}

	/**
	 * @access public
	 */
	public function getDefaultCountryPlugins() {
		return self::$defaultCountryPlugins;
	}

	/**
	 * @access public
	 */
	public function getHostname() {
		return self::$dbHostname;
	}

	/**
	 * @access public
	 */
	public function getDbName() {
		return self::$dbName;
	}

	/**
	 * @access public
	 */
	public function getDbUsername() {
		return self::$dbUsername;
	}

	/**
	 * @access public
	 */
	public function getDbPassword() {
		return self::$dbPassword;
	}

	/**
	 * @access public
	 */
	public function getDbTablePrefix() {
		return self::$dbTablePrefix;
	}

	/**
	 * @access public
	 */
	public function getMaxGeneratedRows() {
		return self::$maxGeneratedRows;
	}

	/**
	 * @access public
	 */
	public function getEncryptionSalt() {
		return self::$encryptionSalt;
	}

	/**
	 * @access public
	 */
	public function getDefaultNumRows() {
		return self::$defaultNumRows;
	}

	/**
	 * @access public
	 */
	public function getVersion() {
		return self::$version;
	}

	/**
	 * @access public
	 */
	public function checkSettingsFileExists() {
		return self::$settingsFileExists;
	}

	/**
	 * Full installation of the program is determined by (a) the settings.php file existing and (b)
	 * the "installationComplete" setting value existing in the database. Note: this function assumes
	 * the database connection in Core::$db has already been created.
	 * @access public
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

	/**
	 * @access public
	 */
	public function getDefaultLanguageFile() {
		return self::$defaultLanguageFile;
	}

	/**
	 * @access public
	 */
	public function getDataTypeGroups() {
		return self::$dataTypeGroups;
	}

	/**
	 * Returns the minimum PHP version required to run this script. Used during installation to ensure the
	 * server environment is adequate.
	 * @access public
	 */
	public function getMinimumPHPVersion() {
		return self::$minimumPHPVersion;
	}

	/**
	 * Used during the installation process only: it returns the default theme for new installations.
	 * @access public
	 */
	public function getDefaultTheme() {
		return self::$defaultTheme;
	}


	// ------------------ private methods ------------------

	/**
	 * Initializes the Smarty object used for things like rendering the Smarty templates found in
	 * /resources/templates/ - and for other misc uses.
	 * @access private
	 */
	private function initSmarty() {
		self::$smarty = new Smarty();
		self::$smarty->template_dir = realpath(dirname(__FILE__) . "/../templates/");
		self::$smarty->compile_dir  = realpath(dirname(__FILE__) . "/../../cache/");
		self::$smarty->assign("version", self::getVersion());
		self::$smarty->assign("samePage", Utils::getCleanPhpSelf());
	}

	/**
	 * Called by Core::init(), this initializes Core::$countryPlugins.
	 * @access private
	 */
	private function initCountries() {
		if (!Core::$settingsFileExists) {
			return;
		}
		self::$countryPlugins = CountryPluginHelper::getCountryPlugins();
	}

	/**
	 * This function returns the actual data populated in the database by the Country plugins. It
	 * returns an array of country data, contains regions and cities.
	 * @access private
	 */
	private function initGeoData() {
		self::$geoData = new GeoData();
	}


	/**
	 * Initializes the Database object and stores it in Core::$db.
	 * @access private
	 */
	private function initDatabase() {
		if (Core::$settingsFileExists) {
			self::$db = new Database();
		}
	}

	/**
	 * Called by Core::init(), this initializes Core::$dataTypePlugins.
	 * @access private
	 */
	private function initDataTypes($runtimeContext) {
		if (!Core::$settingsFileExists) {
			return;
		}

		// parse the Data Types folder and identify those plugins that are available
		self::$dataTypePlugins = DataTypePluginHelper::getDataTypePlugins($runtimeContext);
	}

	/**
	 * Called by Core::init(), this initializes Core::$exportTypePlugins.
	 * @access private
	 */
	private function initExportTypes($runtimeContext) {
		if (!Core::$settingsFileExists) {
			return;
		}
		self::$exportTypePlugins = ExportTypePluginHelper::getExportTypePlugins($runtimeContext);
	}


	/**
	 * Initializes the current logged in user and stores their Account object in Core::$user.
	 * @access private
	 */
	private function initUser() {
		if (self::checkIsInstalled()) {
			$setup = Settings::getSetting("userAccountSetup");
			self::$user = new Account("anonymous");
		}
	}
}
