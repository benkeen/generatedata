<?php


/**
 * Called on script load for any Data Generator page. It does all the heavy lifting (once!) and initializes
 * various general vars and data for the script, including the main Smarty object, custom settings from the user's
 * settings.php file. Basically, this class is used instead of the global namespace to store info needed throughout
 * the code.
 */
class Core
{
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

  // non-overidable settings
	private static $version = "3.0.0";
	private static $settingsFileExists = false;
  private static $dataTypeGroups = array("human_data", "text", "other");
	private static $translations;
  private static $language;
  private static $db;
  private static $user; // the current logged in user

  // can't be private! Or if so, we have to provide additional getters + settings, which seems awfully klutzy...
  public static $smarty;


  public static function init()
  {
  	// instantiate our all-purpose Smarty object
    self::$smarty = new Smarty();

  	// find out if the settings file is defined and override the default properties
  	$settingsFilePath = realpath(dirname(__FILE__) . "/../settings.php");
  	$defaultLanguage = "";
		if (file_exists($settingsFilePath))
		{
			self::$settingsFileExists = true;
		  require_once($settingsFilePath); // boy I don't like this!

		  if (isset($errorReporting))
		    self::$errorReporting = $errorReporting;
		  if (isset($dbHostname))
		    self::$dbHostname = $dbHostname;
		  if (isset($dbName))
		    self::$dbName = $dbName;
		  if (isset($dbUsername))
		    self::$dbUsername = $dbUsername;
		  if (isset($dbPassword))
		    self::$dbPassword = $dbPassword;
		  if (isset($dbTablePrefix))
		    self::$dbTablePrefix = $dbTablePrefix;
		  if (isset($defaultLanguageFile))
		    self::$defaultLanguageFile;
		}

    error_reporting(self::$errorReporting);

/*
    if (self::$settingsFileExists)
    {
      $db = new Database(self::$dbHostname, self::$dbName, self::$dbUsername, self::$dbPassword);
      SessionManager();
    }
*/

    self::$translations = new Translations();
    self::$language     = new Language();
  }

  public function getHostname()
  {
  	return self::$dbHostname;
  }

  public function getDbName()
  {
  	return self::$dbName;
  }

  public function getDbUsername()
  {
  	return self::$dbUsername;
  }

  public function getDbPassword()
  {
  	return self::$dbPassword;
  }

  public function getDbTablePrefix()
  {
  	return self::$dbTablePrefix;
  }

  public function getMaxGeneratedRows()
  {
  	return self::$maxGeneratedRows;
  }

  public function getDefaultNumRows()
  {
  	return self::$defaultNumRows;
  }

  public function getVersion()
  {
  	return self::$version;
  }

  public function checkSettingsFileExists()
  {
  	return self::$settingsFileExists;
  }

  public function getCurrentLanguageFile()
  {
  	return self::$currentLanguageFile;
  }

  public function getDefaultLanguageFile()
  {
  	return self::$defaultLanguageFile;
  }

  public function getAvailableTranslations()
  {
  	return self::$availableTranslations;
  }

  public function getDataTypeGroups()
  {
  	return self::$dataTypeGroups;
  }
}
