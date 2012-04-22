<?php

class Language
{
  private $currentLanguageFile;
  private $currentLanguageStrings;


  /**
   * The Language class constructor requires the name of the language file (i.e. "fr" in "fr.php") as the
   * first param. But to keep things as simple (and still as loosely coupled) as possible, there's an optional
   * second param which will override the value passed in param #1. This overrides the value first based
   * on whatever's in sessions and secondly, whatever is in the query param. The query param always takes
   * precedence.
   *
   * @param string $languageFile
   * @param boolean $overrideDefault
   */
	function __construct($languageFile, $overrideDefault = true)
	{
    $this->currentLanguageFile = $languageFile;

		if ($overrideDefault)
		  $this->overrideDefaultLanguageFile();

    // TODO exception handling here

		require(realpath(dirname(__FILE__) . "/../lang/{$languageFile}.php"));
    $this->currentLanguageStrings = $L;
	}

  public function getCurrentLanguageFile()
  {
  	return $this->currentLanguageFile;
  }

  public function getCurrentLanguageStrings()
  {
  	return $this->currentLanguageStrings;
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


  // private member functions

  private function overrideDefaultLanguageFile()
  {
  	// if sessions are enabled, see if the current language is stashed in there

  	//


  	// TODO : all the sessions management stuff sucks!
		//if (!isset($_SESSION["gd"]))
		//  $_SESSION["gd"] = array();
		//$languageFile = (isset($_SESSION["gd"]["languageFile"])) ? $_SESSION["gd"]["languageFile"] : Core::getDefaultLanguageFile();

		// TODO not thrilled about this
		if (isset($_GET["lang"]))
		{
		  $lang = strip_tags($_GET["lang"]);
		  $lang = preg_replace("/\W/", "", $lang);
		  $languageFile = $lang;
		}
		//$_SESSION["gd"]["languageFile"] = $languageFile;

		// if it doesn't exist, fall back on the default language file
//    if (!is_file(realpath(dirname(__FILE__) . "/../lang/$languageFile.php")))
//      $languageFile = self::$defaultLanguageFile;
  }
}
