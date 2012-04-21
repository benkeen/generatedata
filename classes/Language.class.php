<?php

class Language
{
  private static $currentLanguageFile;
  private static $currentLanguageStrings;

	function __construct()
	{
  	// TODO : all the sessions management stuff sucks!
		//if (!isset($_SESSION["gd"]))
		//  $_SESSION["gd"] = array();
		$languageFile = (isset($_SESSION["gd"]["languageFile"])) ? $_SESSION["gd"]["languageFile"] : Core::getDefaultLanguageFile();


		// TODO not thrilled about this
		/*if (isset($_GET["lang"]))
		{
		  $lang = strip_tags($_GET["lang"]);
		  $lang = preg_replace("/\W/", "", $lang);
		  $languageFile = $lang;
		}
		$_SESSION["gd"]["languageFile"] = $languageFile;
    */

		// if it doesn't exist, fall back on the default language file
//    if (!is_file(realpath(dirname(__FILE__) . "/../lang/$languageFile.php")))
//      $languageFile = self::$defaultLanguageFile;

		require(realpath(dirname(__FILE__) . "/../lang/{$languageFile}.php"));
    self::$currentLanguageFile = $languageFile;
    self::$currentLanguageStrings = $L;
	}

	public function generateJSStrings()
	{
		$lines = array();
		while (list($key, $value) = each($L))
		{
			$lines[] = "\"$key\":\"" . addslashes($value) . "\"";
		}
		echo "var L={\n" . implode(",\n", $lines) . "}";
	}

  public function getCurrentLanguageStrings()
  {
  	return self::$currentLanguageStrings;
  }
}