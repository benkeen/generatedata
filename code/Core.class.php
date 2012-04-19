<?php


/**
 * Called on script load. This contains all general settings for the script, including the main Smarty object,
 * custom settings from the user's settings.php file.
 */
class Core
{
  // overridable settings in settings.php
  public static $dbHostname;
	public static $dbName;
  public static $dbUsername;
	public static $dbPassword;
  public static $dbTablePrefix;
  public static $errorReporting = 2047;
  public static $maxGeneratedRows = 100000;
  public static $defaultLanguage = "en";
  public static $defaultNumRows = 100;

  // shouldn't be able to overwrite these outside of this class... private with getters??
	public static $version = "3.0.0";
	public static $settingsFileExists = false;
  public static $language; // the currently selected language
  public static $smarty;
  public static $L;
  public static $translations;

  /*
	// ordered. TODO. WHere should this go? Core class?
	$g_field_groups = array(
	  "human_data",
	  "text",
	  "other"
	);
  */

	public static function init()
  {
  	// instantiate our all-purpose Smarty object
    self::$smarty = new Smarty();

  	// find out if the settings file is defined and override the default properties
		if (file_exists(dirname(__FILE__) . "/code/settings"))
		{
			self::$settingsFileExists = true;
		  require_once(dirname(__FILE__) . "/code/settings.php");

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
		  if (isset($dbTablePrefix))
		    self::$defaultLanguage = $defaultLanguage;
		}


    if (self::$settingsFileExists)
    {
//      $link = gd_db_connect();
    	session_start();
      header("Cache-control: private");
    }


    // load the appropriate language file and store $L in
//    if (!is_file(dirname(__FILE__) . "/lang/" . self::$defaultLanguage . ".php"))
  //    $g_language = $g_default_language;

    require_once(realpath(dirname(__FILE__) . "/../lang/" . self::$defaultLanguage . ".php"));
    self::$L = $L;

    // load the translations
    $translations = new Translations();
    self::$translations = $translations->getList();
  }

/*
// now sort out the language choice. This allows us to pass the chosen language via the query string. As
// such, we put in a few safeguards against hacking attempts
if (!isset($_SESSION["gd"]))
  $_SESSION["gd"] = array();

$g_language = (isset($_SESSION["gd"]["language"])) ? $_SESSION["gd"]["language"] : $g_defaultLanguage;
if (isset($_GET["lang"]))
{
  $lang = strip_tags($_GET["lang"]);
  $lang = preg_replace("/\W/", "", $lang);
  $g_language = $lang;
}

$_SESSION["gd"]["language"] = $g_language;
*/
}
