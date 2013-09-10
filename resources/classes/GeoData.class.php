<?php


/**
 * This contains all practical functions for accessing the geographical data (countries,
 * regions and cities) in the database that have been populated by the various Country plugins.
 * This class is automatically instantiated by the Core during code generation
 * (runtimeContext == "generation") and found in Core::$geoData
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class GeoData {

	private $countryData;
	private $regionData;
	private $cityData;
	private $countryRegions;
	private $regionCities;


	/**
	 * Our contructor. This extracts all the region info from the database (country, region +
	 * city) and stores them in private vars for easy reference later on.
	 */
	public function __construct() {
		$this->initCountryData();
		$this->initRegionData();
		$this->initCityData();
		$this->constructDataSubsets();
	}

	/**
	 * Returns a hash of country_slug => country data. The regions are stored in a "regions"
	 * key and the number of regions is additionally stored in a "numRegions" key, for convenience.
	 * @param null $countrySlug
	 * @return array
	 */
	public function getCountryRegionHash($countrySlug = null) {
		$data = $this->countryRegions;
		if ($countrySlug != null) {
			foreach ($this->countryRegions as $countryData) {
				if ($countryData["countrySlug"] == $countrySlug) {
					$data = $countryData;
					break;
				}
			}
		}

		// convert the country-region info into something more useful for us
		$countryRegionHash = array();
		foreach ($data as $countryRegion) {
			$countrySlug = $countryRegion["country_slug"];
			$countryRegion["numRegions"] = count($countryRegion["regions"]);
			$countryRegionHash[$countrySlug] = $countryRegion;
		}

		return $countryRegionHash;
	}

	public function getRegionCities($regionSlug = null) {
		$data = $this->regionCities;
		if ($regionSlug != null) {
			foreach ($this->regionRegions as $regionData) {
				if ($regionData["regionSlug"] == $regionSlug) {
					$data = $regionData;
					break;
				}
			}
		}
		return $data;
	}

	private function initCountryData() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}countries
			ORDER BY country
		");

		// TODO
		if (!$response["success"]) {
			//throw new GDException();
			return;
		}
		$countryData = array();
		while ($row = mysqli_fetch_assoc($response["results"])) {
			$countryData[] = $row;
		}

		$this->countryData = $countryData;
	}

	private function initRegionData() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}regions
			ORDER BY country_slug
		");
		if (!$response["success"]) {
			return;
		}
		$regionData = array();
		while ($row = mysqli_fetch_assoc($response["results"])) {
			$regionData[] = $row;
		}
		$this->regionData = $regionData;
	}

	private function initCityData() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}cities
			ORDER BY country_slug
		");
		if (!$response["success"]) {
			return;
		}
		$cityData = array();
		while ($row = mysqli_fetch_assoc($response["results"])) {
			$cityData[] = $row;
		}
		$this->cityData = $cityData;
	}

	/**
	 * Called after the country, region and city data has been populated. This populates $countryRegions
	 * and $regionCities, for general use.
	 */
	private function constructDataSubsets() {

		// first, create the country-regions map
		$countryRegions = array();
		$ungroupedRegionData = $this->regionData;
		foreach ($this->countryData as $countryData) {
			$countryData["regions"] = array();
			$remainingRegionData = array();

			foreach ($ungroupedRegionData as $regionData) {
				if ($regionData["country_slug"] == $countryData["country_slug"]) {
					unset($regionData["country_slug"]);
					$countryData["regions"][] = $regionData;
				} else {
					$remainingRegionData[] = $regionData;
				}
			}

			$ungroupedRegionData = $remainingRegionData;
			$countryRegions[] = $countryData;
		}
		$this->countryRegions = $countryRegions;

		// second, create the region-city map
		$ungroupedCityData = $this->cityData;
		$regionCities = array();
		foreach ($this->regionData as $regionData) {
			$regionData["cities"] = array();
			$remainingCityData = array();
			foreach ($ungroupedCityData as $cityData) {
				if ($cityData["country_slug"] == $regionData["country_slug"] &&
					$cityData["region_slug"] == $regionData["region_slug"]) {
					$regionData["cities"][] = $cityData;
				} else {
					$remainingCityData[] = $cityData;
				}
			}
			$ungroupedCityData = $remainingCityData;
			$regionCities[] = $regionData;
		}
		$this->regionCities = $regionCities;
	}
}
