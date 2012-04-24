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
  private static $dbTablePrefix;
  private static $errorReporting = 2047;
  private static $maxGeneratedRows = 100000;
  private static $defaultNumRows = 100;
	private static $defaultLanguageFile = "en";
  private static $dataTypeGroups = array("human_data", "text", "other");

  // non-overidable settings
	private static $version = "3.0.0";
	private static $minimumPHPVersion = '5.2.0';
	private static $settingsFileExists = false;

  // Hmm.... I like these being public for the simplicity of the calling syntax [Core::$language->smarty->doStuff()]
  // but it seems poorly designed. Maybe run this by Julius if no solution presents itself.
  public static $smarty;
  public static $language;
  public static $translations;
  public static $user; // the current logged in user
  public static $db;


  public static function init() {
  	// instantiate our all-purpose Smarty object
    self::$smarty = new Smarty();

  	// find out if the settings file is defined and override the default properties
  	$settingsFilePath = realpath(dirname(__FILE__) . "/../settings.php");
  	$defaultLanguage = "";
		if (file_exists($settingsFilePath)) {
			self::$settingsFileExists = true;
		  require_once($settingsFilePath); // boy I don't like this!

		  if (isset($errorReporting)) {
		    self::$errorReporting = $errorReporting;
		  }
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
		  if (isset($defaultLanguageFile)) {
		    self::$defaultLanguageFile;
		  }
		}

    error_reporting(self::$errorReporting);

    self::$translations = new Translations();
    self::$language     = new Language(self::$defaultLanguageFile);
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
