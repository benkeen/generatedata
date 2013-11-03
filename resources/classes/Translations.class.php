<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Translations {
	private $list;

	/**
	 * Examines the contents of the /global/lang folder and returns the $L["language"] value for
	 * all translation files.
	 *
	 * @return array a hash of filename => language name
	 */
	function __construct() {
		$translationsFolder = realpath(__DIR__ . "/../lang/");
		$translations = array();
		if ($handle = opendir($translationsFolder)) {
			while (false !== ($item = readdir($handle))) {
				if ($item == "." || $item == ".." || $item == ".svn") {
					continue;
				}

				if (is_file("$translationsFolder/$item") && preg_match("/php$/", $item)) {
					$validLanguage = $this->checkValidLangFile("$translationsFolder/$item");
					if ($validLanguage !== false) {
						$translations[$item] = $validLanguage;
					}
				}
			}
			closedir($handle);
		}

		$this->list = $translations;
	}

	public function getList() {
		return $this->list;
	}

	private function checkValidLangFile($file) {
		@include($file);
		$info = get_defined_vars();

		if (!isset($info["L"])) {
			return false;
		}
		if (!isset($info["L"]["language"])) {
			return false;
		}
		if (!isset($info["L"]["ENABLED"]) || $info["L"]["ENABLED"] !== true) {
			return false;
		}

		return $info["L"]["language"];
	}
}
