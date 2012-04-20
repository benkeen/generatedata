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
  private static $defaultLanguageFile = "en";
  private static $defaultNumRows = 100;

  // non-overidable settings
	private static $version = "3.0.0";
	private static $settingsFileExists = false;
  private static $currentLanguageFile;
  private static $currentLanguageStrings;
  private static $availableTranslations;
  private static $dataTypeGroups = array("human_data", "text", "other");
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
		    self::$defaultLanguageFile = $defaultLanguageFile;
		}


    error_reporting(self::$errorReporting);

/*
    if (self::$settingsFileExists)
    {
      $db = new Database(self::$dbHostname, self::$dbName, self::$dbUsername, self::$dbPassword);

    	session_start();
      //header("Cache-control: private");
    }
*/

    self::initLanguage();
    self::initTranslations();
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

  public function getCurrentLanguageStrings()
  {
  	return self::$currentLanguageStrings;
  }

  public function getAvailableTranslations()
  {
  	return self::$availableTranslations;
  }

  public function getDataTypeGroups()
  {
  	return self::$dataTypeGroups;
  }


  // private methods

  /**
   * Called in init(), this figures out what language file we should be using, stores all the
   * language strings in memory and loads all available translation file info for rendering the
   * language dropdowns.
   */
  private function initLanguage()
  {
  	// TODO : all the sessions management stuff sucks!

		if (!isset($_SESSION["gd"]))
		  $_SESSION["gd"] = array();

		$languageFile = (isset($_SESSION["gd"]["languageFile"])) ? $_SESSION["gd"]["languageFile"] : self::$defaultLanguageFile;

		// not thrilled about this. Seems strongly coupled, to me.
		if (isset($_GET["lang"]))
		{
		  $lang = strip_tags($_GET["lang"]);
		  $lang = preg_replace("/\W/", "", $lang);
		  $languageFile = $lang;
		}

		$_SESSION["gd"]["languageFile"] = $languageFile;

		// if it doesn't exist, fall back on the default language file
    if (!is_file(realpath(dirname(__FILE__) . "/../lang/$languageFile.php")))
      $languageFile = self::$defaultLanguageFile;
    else
      self::$currentLanguageFile = $languageFile;

    require_once(realpath(dirname(__FILE__) . "/../lang/$languageFile.php"));
    self::$currentLanguageStrings = $L;
  }


  private function initTranslations()
  {
    // locate and make a note of all available translations
    $translations = new Translations();
    self::$availableTranslations = $translations->getList();
  }
}
