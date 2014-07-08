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
	private static $maxDemoModeRows = 100;
	private static $defaultLanguageFile = "en";
	private static $defaultExportType = "HTML";
	private static $defaultCountryPlugins = array();
	private static $defaultTheme = "classic";
	private static $enableSmartySecurity = true;
	private static $useMinifiedResources = false;

	// non-overridable settings
	private static $version = "3.1.1";
	private static $releaseDate = "2014-01-30";
	private static $minimumPHPVersion = "5.3.0";
	private static $minimumMySQLVersion = "4.1.3";
	private static $settingsFileExists = false;
	private static $dataTypeGroups = array("human_data", "geo", "credit_card_data", "text", "numeric", "math", "other");
	private static $continents = array("africa", "asia", "central_america", "europe", "north_america", "oceania", "south_america");
	private static $isLoggedIn = false;


	// left as public, because they're often modified / accessed, and it's just too fussy otherwise. The
	// PHPDoc helps my IDE figure out what the hell each of them are

	/**
	 * @var Language
	 */
	public static $language;

	/**
	 * @var Database
	 */
	public static $db;

	/**
	 * @var Translations
	 */
	public static $translations;

	/**
	 * @var Account
	 */
	public static $user;

	/**
	 * @var GeoData
	 */
	public static $geoData;

	/**
	 * @var Smarty
	 */
	public static $smarty;

	public static $dataTypePlugins;
	public static $exportTypePlugins;

	/**
	 * @var CountryPlugin
	 */
	public static $countryPlugins;
	public static $allowThemes = false;


	/**
	 * Core::init()
	 *
	 * Our initialization function. This is called on all page requests to initialize the Core
	 * object. Since it's also used during installation (when the database and/or plugins haven't been
	 * installed), the optional parameter controls whether or not the database object, plugins, sessions and user
	 * should be initialized. Different call contexts require different initialization.
	 *
	 * @access public
	 * @static
	 * @param string $runtimeContext This determines the context in which the Core is being initialized. This
	 *          info is used to let plugins instantiate themselves differently, as well as prevent the loading
	 *          of incomplete parts of the script.<br />
	 *          <b>installation</b>:              a fresh installation, DB not installed yet<br />
	 *          <b>installationDatabaseReady</b>: during installation after the DB has been installed<br />
	 *          <b>ui</b>:                        (default) for the main generator page<br />
	 *          <b>generation</b>:                when we're in the process of creating actual data
	 *          <b>resetPlugins</b>:              initialized everything except the plugins, which may be safely reset
	 */
	public static function init($runtimeContext = "ui") {
		self::loadSettingsFile();
		error_reporting(self::$errorReporting);

		// ensure the timezone is set
		if (ini_get("date.timezone") == "") {
			ini_set("date.timezone", "Canada/Vancouver");
		}

		self::$translations = new Translations();

		// the order is significant in all of this
		if ($runtimeContext != "installation") {
			self::initDatabase();
			if (in_array($runtimeContext, array("installationDatabaseReady", "ui",  "generation", "resetPlugins"))) {
				self::initSessions();
			}

			$dbDefaultLanguage = Settings::getSetting("defaultLanguage");
			if (!empty($dbDefaultLanguage)) {
				self::$defaultLanguageFile = $dbDefaultLanguage;
			}
		}
		self::$language = new Language(self::$defaultLanguageFile);
		self::initSmarty();

		if ($runtimeContext == "generation") {
			self::initGeoData();
		}
		if ($runtimeContext == "ui" || $runtimeContext == "generation") {
			self::initCountries();
			self::initExportTypes($runtimeContext);
			self::initDataTypes($runtimeContext);
		}
		if (in_array($runtimeContext, array("ui", "generation", "resetPlugins"))) {
			self::initUser();
		}
	}


	/**
     * Core::loadSettingsFile()
     *
	 * Attempts to load the settings file. If successful, it updates the various private member vars
	 * with whatever's been defined.
	 * @access private
	 */
	private static function loadSettingsFile() {
		$settingsFilePath = realpath(__DIR__ . "/../../settings.php");
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
				self::$maxGeneratedRows = $maxGeneratedRows;
			}
			if (isset($defaultNumRows)) {
				self::$defaultNumRows = $defaultNumRows;
			}
			if (isset($maxDemoModeRows)) {
				self::$maxDemoModeRows = $maxDemoModeRows;
			}
			if (isset($defaultLanguageFile)) {
				self::$defaultLanguageFile = $defaultLanguageFile;
			}
			if (isset($enableSmartySecurity)) {
				self::$enableSmartySecurity = $enableSmartySecurity;
			}
			if (isset($useMinifiedResources)) {
				self::$useMinifiedResources = $useMinifiedResources;
			}

			// TODO temporary, during alpha dev
			if (isset($allowThemes)) {
				self::$allowThemes = $allowThemes;
			}
		}
	}

	/**
	 * @access public
	 */
	public static function getDefaultExportType() {
		return self::$defaultExportType;
	}

    /**
     * TODO Yuck! Why does this return a boolean as a frickin' string?! Was I drunk?
     * @access public
     */
	public static function checkDemoMode() {
		return (self::$demoMode) ? "true" : "false";
	}

	/**
	 * @access public
	 */
	public static function checkAllowMultiUserAnonymousUse() {
		$allowAnonymousAccessSetting = Settings::getSetting("allowAnonymousAccess");
		return ($allowAnonymousAccessSetting == "yes");
	}

	/**
	 * @access public
	 */
	public static function getDefaultCountryPlugins() {
		return self::$defaultCountryPlugins;
	}

	/**
	 * @access public
	 */
	public static function getHostname() {
		return self::$dbHostname;
	}

	/**
	 * @access public
	 */
    public static function getDbName() {
		return self::$dbName;
	}

	/**
	 * @access public
	 */
    public static function getDbUsername() {
		return self::$dbUsername;
	}

	/**
	 * @access public
	 */
    public static function getDbPassword() {
		return self::$dbPassword;
	}

	/**
	 * @access public
	 */
	public static function getDbTablePrefix() {
		return self::$dbTablePrefix;
	}

	/**
	 * @access public
	 */
	public static function getMaxGeneratedRows() {
		return self::$maxGeneratedRows;
	}

	/**
	 * @access public
	 */
	public static function getEncryptionSalt() {
		return self::$encryptionSalt;
	}

	/**
	 * @access public
	 */
	public static function getDefaultNumRows() {
		return self::$defaultNumRows;
	}

	/**
	 * @access public
	 */
	public static function getMaxDemoModeRows() {
		return self::$maxDemoModeRows;
	}

	/**
	 * @access public
	 */
	public static function getVersion() {
		return self::$version;
	}

	/**
	 * @access public
	 */
	public static function checkSettingsFileExists() {
		return self::$settingsFileExists;
	}

	/**
	 * Full installation of the program is determined by (a) the settings.php file existing and (b)
	 * the "installationComplete" setting value existing in the database. Note: this function assumes
	 * the database connection in Core::$db has already been created.
	 * @access public
	 */
	public static function checkIsInstalled() {
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
	public static function checkIsLoggedIn() {
		if (!isset($_SESSION["account_id"])) {
			self::$isLoggedIn = false;
		}
		return self::$isLoggedIn;
	}

	/**
	 * @access public
	 */
	public static function getDefaultLanguageFile() {
		return self::$defaultLanguageFile;
	}

	/**
	 * @access public
	 */
	public static function getDataTypeGroups() {
		return self::$dataTypeGroups;
	}

	/**
	 * @access public
	 */
	public static function getContinents() {
		return self::$continents;
	}

	/**
	 * Returns the minimum PHP version required to run this script. Used during installation to ensure the
	 * server environment is adequate.
	 * @access public
	 */
	public static function getMinimumPHPVersion() {
		return self::$minimumPHPVersion;
	}

	/**
	 * Returns the minimum MySQL version required to run this script. Used during installation to ensure the
	 * server environment is adequate.
	 * @access public
	 */
	public static function getMinimumMySQLVersion() {
		return self::$minimumMySQLVersion;
	}

	/**
	 * Returns a boolean signifying whether we should use the minified + bundled resources generated via Grunt.
	 * @return bool
	 */
	public static function isUsingMinifiedResources() {
		return self::$useMinifiedResources;
	}

	/**
	 * Used during the installation process only: it returns the default theme for new installations.
	 * @access public
	 */
	public static function getDefaultTheme() {
		return self::$defaultTheme;
	}


	public static function isSmartySecurityEnabled() {
		return self::$enableSmartySecurity;
	}

	// ------------------ private methods ------------------

	/**
	 * Initializes the Smarty object used for things like rendering the Smarty templates found in
	 * /resources/templates/ - and for other misc uses.
	 * @access private
	 */
	private function initSmarty() {
		self::$smarty = new SecureSmarty();
		self::$smarty->template_dir = realpath(__DIR__ . "/../templates/");
		self::$smarty->compile_dir  = realpath(__DIR__ . "/../../cache/");
		self::$smarty->assign("version", self::getVersion());
		self::$smarty->assign("samePage", Utils::getCleanPhpSelf());
	}

	/**
	 * Called by Core::init(), this initializes Core::$countryPlugins.
	 * @access private
	 */
	private static function initCountries() {
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
	private static function initGeoData() {
		self::$geoData = new GeoData();
	}

	/**
	 * Initializes the Database object and stores it in Core::$db.
	 * @access private
	 */
	private static function initDatabase() {
		if (Core::$settingsFileExists) {
			self::$db = new Database();
		}
	}

	/**
	 * Called by Core::init(), this initializes Core::$dataTypePlugins.
	 * @access private
	 */
	private static function initDataTypes($runtimeContext) {
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
	private static function initExportTypes($runtimeContext) {
		if (!Core::$settingsFileExists) {
			return;
		}
		self::$exportTypePlugins = ExportTypePluginHelper::getExportTypePlugins($runtimeContext);
	}

	/**
	 * Initializes the current logged in user and stores their Account object in Core::$user.
	 * @param bool $bypass
	 */
	public static function initUser($bypass = false) {
		if ($bypass || self::checkIsInstalled()) {
			$setup = Settings::getSetting("userAccountSetup");
			if ($setup == "anonymousAdmin") {
				self::$user = new Account($setup);
				self::$isLoggedIn = true;
			} else {
				if (isset($_SESSION["account_id"])) {
					self::$user = new Account($_SESSION["account_id"]);
					self::$isLoggedIn = true;
				}
			}
		}
	}

	public static function initSessions() {
		if (session_id() == '') {
			new SessionManager();
			session_start();
			header("Cache-control: private");
		}
	}
}
