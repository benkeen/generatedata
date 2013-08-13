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

	// this may be optionally defined and extended as need be. It contains whatever custom information
	// Data Types need and can be appended to in the individual Country classes over time without further
	// modification of the abstract class
	protected $extendedData;


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

	final public function getExtendedData() {
		return $this->extendedData;
	}

	/**
	 * A generalized function for returning any custom data defined in the region's extendedData section.
	 * @param $key contains the top-level key
	 * @return array a hash of [regionSlug] to whatever info is stored in the desired key
	 */
	final public function getRegionalExtendedData($key) {
		$regionSpecificData = array();

		foreach ($this->countryData as $regionInfo) {
			if (!array_key_exists("extendedData", $regionInfo)) {
				continue;
			}

			if (array_key_exists($key, $regionInfo["extendedData"])) {
				$regionSpecificData[$regionInfo["regionSlug"]] = $regionInfo["extendedData"][$key];
			}
		}

		return $regionSpecificData;
	}
}
