<?php

/*
 * Our custom Exception class. This is pretty much just the native Exception class, with a few tweaks.
 *   1. It does away with the first $message param. That's constructed automatically based on
 *   2. It allows for additional, custom info relative to the current error to be stashed in $data. For example,
 *      if the user fails to enter all installation DB field info (a scenario which SHOULD be caught by the client-side
 *      code), this stores the fields that are missing in $data.
 *   3. There's a custom getFormattedError function which generates a simple hash of the Exception information in a
 *      format easily convertable to JSON, along with a custom generate human-friendly error string.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
class GDException extends Exception {
	private $data;

	public function __construct($code, $data = array()) {
		parent::__construct(null, $code);
		$this->data = $data;
	}

	public function getFormattedError() {
		$language     = Core::getLanguage()->getCurrentLanguageStrings();
		$errorCode    = $this->getCode();
		$errorMessage = "";

		switch ($errorCode) {
			case Exceptions::SETTINGSFILEEXISTS:
				$errorMessage = $language["settings_file_exists"];
				break;
			case Exceptions::NOTLOGGEDIN:
				$errorMessage = "";
				break;
			case Exceptions::NOTNUMERICFIELD:
				$errorMessage = "";
				break;
		}

		return array(
			"success"   => 0,
			"exception" => 1,
			"message"   => $errorMessage
		);
	}
}
*/