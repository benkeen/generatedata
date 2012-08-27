<?php

/**
 * This class contains all functionality relating to the current selected language. For code
 * relating to all available translations, see the Translation class.
 */
class Language {

	private $currentLanguageFile; // should include .php suffix, no?
	private $currentLanguageStrings;


	// TODO also add private var for human-readable string of current language

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
	function __construct($languageFile, $overrideDefault = true) {
		$this->currentLanguageFile = $languageFile;

		if ($overrideDefault) {
			$this->overrideDefaultLanguageFile();
		}

		// TODO exception handling here

		$fileAndPath = realpath(dirname(__FILE__) . "/../lang/" . $this->currentLanguageFile . ".php");
		require($fileAndPath);
		$this->currentLanguageStrings = $L;
	}

	public function getCurrentLanguageFile() {
		return $this->currentLanguageFile;
	}

	public function getCurrentLanguageStrings() { // TODO far too verbose
		return $this->currentLanguageStrings;
	}

	/**
	 * Used in lang.php to return the current language strings for the Core, data types and
	 * export types.
	 */
	public function getLanguageStringsJS() {
		$lines = array();
		while (list($key, $value) = each($this->currentLanguageStrings)) {
			$lines[] = "\"$key\":\"" . addslashes($value) . "\"";
		}

		$moduleLines = array();
		$exportTypes = Core::$exportTypePlugins;
		foreach ($exportTypes as $exportType) {
			$moduleFolder = $exportType->folder;
			if (!isset($exportType->language)) {
				continue;
			}

			$currModuleLines = array();
			while (list($key, $value) = each($exportType->language)) {
				$currModuleLines[] = "\"$key\":\"" . addslashes($value) . "\"";
			}

			$moduleLines[] = "  \"$moduleFolder\": {" . implode(",\n", $currModuleLines) . "}";
		}

		$lines[] = "\"modules\": {\n" . implode(",\n", $moduleLines) . "\n}";

		return "var L={\n" . implode(",\n", $lines) . "}";
	}



	// private member functions

	private function overrideDefaultLanguageFile() {
		$languageFile = $this->currentLanguageFile;

		// if sessions are enabled, see if the current language is stashed in there

		if (isset($_GET["lang"])) {
			$queryStringLangFile = strip_tags($_GET["lang"]);
			$queryStringLangFile = preg_replace("/\W/", "", $queryStringLangFile);
			$fileAndPath = realpath(dirname(__FILE__) . "/../lang/{$queryStringLangFile}.php");
			if (file_exists($fileAndPath)) {
				$languageFile = $queryStringLangFile;
			}
		}

		$this->currentLanguageFile = $languageFile;
	}
}
