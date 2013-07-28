<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 * @abstract
 */
abstract class CountryPlugin {
	protected $continent;
	protected $countryName;
	protected $countrySlug;
	protected $regionNames;
	protected $countryData;

	// used for PostalZip plugin
	protected $zipFormat;
	protected $zipFormatAdvanced = false;

	// used for PhoneRegional plugin
	protected $phoneFormat;
	protected $phoneFormatAdvanced = false;

	/**
	 * The installation function. This should populate the countries, regions and cities tables
	 * with the country-specific data.
	 */
	public function install() {
		return array(true, "");
	}

	/**
	 * Country plugins don't need to implement their own uninstallation function - this takes
	 * care of all the database cleanup for them, since we know the locations of all the data.
	 * However, if need be, this function can be overridden.
	 */
	public function uninstall() {
		$prefix = Core::getDbTablePrefix();
		$countrySlug = $this->countrySlug;
		$queries = array();
		$queries[] = "DELETE FROM {$prefix}cities    WHERE country_slug = '{$countrySlug}'";
		$queries[] = "DELETE FROM {$prefix}regions   WHERE country_slug = '{$countrySlug}'";
		$queries[] = "DELETE FROM {$prefix}countries WHERE country_slug = '{$countrySlug}'";
		Core::$db->query($queries);
	}

	// non-overridable helper functions
	final public function getContinent() {
		return $this->continent;
	}

	final public function getName() {
        return $this->countryName;
	}

	final public function getSlug() {
		return $this->countrySlug;
	}

	final public function getCountryData() {
		return $this->countryData;
	}

	final public function getRegionNames() {
		return $this->regionNames;
	}

	final public function getZipFormat() {
		return $this->zipFormat;
	}

	final public function isZipFormatAdvanced() {
		return $this->zipFormatAdvanced;
	}

	/**
	 * Country plugins can choose to be as specific as they want to be with regard to the zip format. They can enter:
	 *   (1) a single one for all data ($zipFormat is a string with placeholder chars defined by Utils::generateRandomAlphanumericStr())
	 *   (2) a single one for all data, but with more control over the exact format of the zipcode ($zipFormatAdvanced == true"),
	 *   (3) provide region-specific postal/zip info directly in the $countryData.
	 * This function returns any data added in #3.
	 */
	final public function getCountryRegionSpecificPostalCodeFormats() {
		$regionSpecificData = array();
		foreach ($this->countryData as $regionInfo) {
			if (array_key_exists("zipFormat", $regionInfo)) {
				$regionSpecificData[$regionInfo["regionShort"]] = $regionInfo["zipFormat"];
			}
		}
		return $regionSpecificData;
	}

	final public function getPhoneFormat() {
		return $this->phoneFormat;
	}

	final public function isPhoneFormatAdvanced() {
		return $this->phoneFormatAdvanced;
	}

	/**
	 * Like with zipcode, Country plugins can choose to be as specific as they want to be with regard to the phone format.
	 * They can enter:
	 *   (1) a single one for all data ($phoneFormat is a string with placeholder chars defined by Utils::generateRandomAlphanumericStr())
	 *   (2) a single one for all data, but with more control over the exact format of the phone number ($phoneFormatAdvanced == true),
	 *   (3) provide region-specific phone number info directly in $countryData.
	 * This function returns any data added in #3.
	 */
	final public function getCountryRegionSpecificPhoneFormats() {
		$regionSpecificData = array();
		foreach ($this->countryData as $regionInfo) {
			if (array_key_exists("phoneFormat", $regionInfo)) {
				$regionSpecificData[$regionInfo["regionShort"]] = $regionInfo["phoneFormat"];
			}
		}
		return $regionSpecificData;
	}

}
