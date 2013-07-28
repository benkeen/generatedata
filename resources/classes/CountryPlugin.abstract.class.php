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
	
	// Used for PostalZip plugin.
	protected $zipFormat;
	protected $zipFormatAdvanced   = false;
	protected $zipFormatRegional   = false;

	// Used for PhoneRegional plugin.
	protected $phoneFormat;
	protected $phoneFormatAdvanced = false;
	protected $phoneFormatRegional = false;
	protected $phoneCountryCode    = '';

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

	// Non-overridable helper functions
	final public function getContinent() {
		return $this->continent;
	}

	final public function getName() {
        return $this->countryName;
	}

	final public function getSlug() {
		return $this->countrySlug;
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

	final public function isZipFormatRegional() {
		return $this->zipFormatRegional;
	}

	final public function getPhoneFormat() {
		return $this->phoneFormat;
	}

	final public function isPhoneFormatAdvanced() {
		return $this->phoneFormatAdvanced;
	}

	final public function isPhoneFormatRegional() {
		return $this->phoneFormatRegional;
	}	
}
