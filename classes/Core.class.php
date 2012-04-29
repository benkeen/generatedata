<?php


/**
 * Called on script load for any Data Generator page. It does all the heavy lifting (once!) and initializes
 * various general vars and data for the script, including the main Smarty object, custom settings from the user's
 * settings.php file. Basically, this class is used instead of the global namespace to store info needed throughout
 * the code.
 *
 * init() initializes the bare minimum needed for (for example) the installation page. After the script is installed,
 * to initialize the database, sessions, Data Type info etc., just run the ... ??? [either param to init() or separate
 * function/functions to populate more info in Core].
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
  private static $dataTypeGroups = array("human_data", "text", "other"); // ...

  // non-overidable settings
  private static $version = "3.0.0";
  private static $minimumPHPVersion = "5.2.0";
  private static $settingsFileExists = false;
  private static $language;
  private static $db;

  // Hmm.... I like these being public for the simplicity of the calling syntax [Core::$smarty->doStuff() instead
  // of Core::getSmarty()->customDoStuff()] but it seems poorly designed. Maybe run this by Julius if no solution
  // presents itself
  public static $smarty;
  public static $translations;
  public static $user; // the current logged in user


  public static function init() {
    self::loadSettingsFile();

    error_reporting(self::$errorReporting);

    self::$smarty       = new Smarty();
    self::$translations = new Translations();
    self::$language     = new Language(self::$defaultLanguageFile);

    self::initDatabase();
  }


  /**
   * Attempts to load the settings file. If successful, it updates the various private member vars
   * with whatevers been defined.
   */
  public function loadSettingsFile() {
    $settingsFilePath = realpath(dirname(__FILE__) . "/../settings.php");
    if (file_exists($settingsFilePath)) {
      self::$settingsFileExists = true;
      require_once($settingsFilePath); // boy I don't like this...

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
      $this->db = new Database();
  	}
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

  public function getLanguage() {
    return self::$language;
  }

  public function getDataTypeGroups() {
    return self::$dataTypeGroups;
  }

  public function getMinimumPHPVersion() {
    return self::$minimumPHPVersion;
  }

  public function getDatabase() {
  	return self::$db;
  }
}
