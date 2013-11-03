<?php

/**
 * This class contains all functionality relating to the current selected language. For code
 * relating to all available translations, see the Translation class.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
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

		$fileAndPath = realpath(__DIR__ . "/../lang/" . $this->currentLanguageFile . ".php");
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
			if (is_string($value)) {
				$lines[] = "\"$key\":\"" . addslashes($value) . "\"";
			}
		}

		// Export Types
		$exportTypeLines = array();
		$exportTypes = Core::$exportTypePlugins;

		if (is_array($exportTypes)) {
			foreach ($exportTypes as $exportType) {
				$moduleFolder = $exportType->folder;
				if (!isset($exportType->L)) {
					continue;
				}
				$currModuleLines = array();
				while (list($key, $value) = each($exportType->L)) {
					$currModuleLines[] = "\"$key\":\"" . addslashes($value) . "\"";
				}
				$exportTypeLines[] = "  \"$moduleFolder\": {" . implode(",\n", $currModuleLines) . "}";
			}
			$lines[] = "\"exportTypePlugins\": {\n" . implode(",\n", $exportTypeLines) . "\n}";
		}

		// Data Types
		$dataTypeLines = array();
		$dataTypesByGroup = Core::$dataTypePlugins;
		if (is_array($dataTypesByGroup)) {
			$dataTypes = DataTypePluginHelper::getDataTypeList($dataTypesByGroup);
			foreach ($dataTypes as $dataType) {
				$moduleFolder = $dataType->folder;
				if (!isset($dataType->L)) {
					continue;
				}
				$currModuleLines = array();
				while (list($key, $value) = each($dataType->L)) {
					$currModuleLines[] = "\"$key\":\"" . addslashes($value) . "\"";
				}
				$dataTypeLines[] = "  \"$moduleFolder\": {" . implode(",\n", $currModuleLines) . "}";
			}
			$lines[] = "\"dataTypePlugins\": {\n" . implode(",\n", $dataTypeLines) . "\n}";
		}

		return "var L={\n" . implode(",\n", $lines) . "}";
	}


	// private member functions

	private function overrideDefaultLanguageFile() {
		$languageFile = $this->currentLanguageFile;

		// if sessions are enabled, see if the current language is stashed in there
		$overriddenLangFile = "";
		if (isset($_GET["lang"])) {
			$overriddenLangFile = strip_tags($_GET["lang"]);
			$overriddenLangFile = preg_replace("/\W/", "", $overriddenLangFile);
			$_SESSION["lang"] = $overriddenLangFile;
		} else if (isset($_SESSION["lang"])) {
			$overriddenLangFile = $_SESSION["lang"];
		}

		if (!empty($overriddenLangFile)) {
			$fileAndPath = realpath(__DIR__ . "/../lang/{$overriddenLangFile}.php");
			if (file_exists($fileAndPath)) {
				$languageFile = $overriddenLangFile;
			}
		}

		$this->currentLanguageFile = $languageFile;
	}
}

