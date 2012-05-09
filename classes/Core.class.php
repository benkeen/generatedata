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
  private static $errorReporting = 2047;
  private static $maxGeneratedRows = 100000;
  private static $defaultNumRows = 100;
  private static $defaultLanguageFile = "en";


  // non-overidable settings
  private static $version = "3.0.0";
  private static $minimumPHPVersion = "5.2.0";
  private static $settingsFileExists = false;
  private static $dataTypeGroups = array("human_data", "text", "other");

  // left as public, because they're often modified throughout the code ... [okay?]
  public static $language;
  public static $db;
  public static $smarty;
  public static $translations;
  public static $user; // the current logged in user (if there IS someone logged in)
  public static $dataTypes;
  public static $exportTypes;
  public static $countries;


  public static function init() {
    self::loadSettingsFile();

    error_reporting(self::$errorReporting);

    self::$smarty       = new Smarty();
    self::$translations = new Translations();
    self::$language     = new Language(self::$defaultLanguageFile);

    self::initDatabase();
    self::initDataTypes();
    self::initExportTypes();
    self::initCountries();
  }


  /**
   * Attempts to load the settings file. If successful, it updates the various private member vars
   * with whatevers been defined.
   */
  public function loadSettingsFile() {
    $settingsFilePath = realpath(dirname(__FILE__) . "/../settings.php");
    if (file_exists($settingsFilePath)) {
      self::$settingsFileExists = true;
      require_once($settingsFilePath); // TODO boy I don't like this... include_once, wrapped in try-catch maybe?

      if (isset($dbHostname)) {
        self::$dbHostname = $dbHostname;
      }
      if (isset($dbName)) {
        self::$dbName = $dbName;
      }
      if (isset($dbUsername)) {
        self::$dbUsername = $dbUsername;
      }
      if (isset($dbPassword)) {
        self::$dbPassword = $dbPassword;
      }
      if (isset($dbTablePrefix)) {
        self::$dbTablePrefix = $dbTablePrefix;
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
      if (isset($defaultLanguageFile)) {
        self::$defaultLanguageFile;
      }
    }
  }

  public function initDatabase() {
  	if (Core::$settingsFileExists) {
      self::$db = new Database();
  	}
  }

  public function initDataTypes() {
  	if (!Core::$settingsFileExists) {
  		return;
  	}

    // parse the Data Types folder and identify those modules that are available
    self::$dataTypes = DataTypeHelper::getDataTypes();
  }

  public function initExportTypes() {
  	if (!Core::$settingsFileExists) {
  		return;
  	}

    // parse the Data Types folder and identify those modules that are available
    self::$exportTypes = ExportTypeHelper::getExportTypes();
  }

  public function initCountries() {

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

  public function getDefaultNumRows() {
    return self::$defaultNumRows;
  }

  public function getVersion() {
    return self::$version;
  }

  public function checkSettingsFileExists() {
    return self::$settingsFileExists;
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
