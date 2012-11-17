<?php

class DataType_City extends DataTypePlugin {

	protected $dataTypeName = "City";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 20;
	protected $processOrder = 3;
	private $countryRegions;
	private $citiesByCountryRegion;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			self::initCityList();
			$this->countryRegions = Core::$geoData->getCountryRegionHash();
		}
	}


	public function generate($generator, $generationContextData) {

		// see if this row has a region [N.B. This is something that could be calculated ONCE on the first row]
		$rowRegionInfo = array();
		$rowCountryInfo = array();

		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Region") {
				$rowRegionInfo = $info;
				break;
			}
		}
		reset($generationContextData["existingRowData"]);

		// if there was no region specified, see if this row has a country [N.B. This is also
		// something that could be calculated ONCE on the first row]
		$rowCountryInfo = array();
		if (empty($rowRegionInfo)) {
			while (list($key, $info) = each($generationContextData["existingRowData"])) {
				if ($info["dataTypeFolder"] == "Country") {
					$rowCountryInfo = $info;
					break;
				}
			}
		}

		$randomCity = "";
		if (!empty($rowRegionInfo)) {
			$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			$regionSlug = $rowRegionInfo["randomData"]["region_slug"];

			// now pick the random city in the country-region specified
			$regionData = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug];
			$numCitiesInRegion = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["numCities"];
			$citiesInRegion    = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["cities"];
			$randomCity = $citiesInRegion[rand(0, $numCitiesInRegion-1)]["city"];
		} else if (!empty($rowCountryInfo)) {

			// pick a random region in this country
			$countrySlug = $rowCountryInfo["randomData"]["slug"];
			$countryRegions = $this->citiesByCountryRegion[$countrySlug]["regions"];
			$numCountryRegions = $this->citiesByCountryRegion[$countrySlug]["numRegions"];

			print_r($this->citiesByRegion);
			exit;

			/*
			// get all region IDs associated with this country
			$regions = Country_get_regions($row_country_info["randomData"]["id"]);
			$random_region_id = $regions[rand(0, count($regions)-1)]["region_id"];
			$random_city = $City_list[$random_region_id][rand(0, count($City_list[$random_region_id])-1)]["city"];
			*/
		} else {
			$randRegionSlug = array_rand($this->citiesByRegion);
			$randomCity = $this->citiesByRegion[$randRegionSlug][rand(0, count($this->citiesByRegion[$randRegionSlug])-1)]["city"];
		}

		return array(
			"display" => $randomCity
		);
	}


	/**
	 * Called when the plugin is initialized during data generation. This
	 */
	private function initCityList() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM {$prefix}cities
		");

		if (!$response["success"]) {
			return;
		}

		$cities = array();
		$citiesByCountryRegion = array();
		while ($cityInfo = mysql_fetch_assoc($response["results"])) {
			$currCountrySlug = $cityInfo["country_slug"];
			$currRegionSlug  = $cityInfo["region_slug"];
			if (!array_key_exists($currCountrySlug, $citiesByCountryRegion)) {
				$citiesByCountryRegion[$currCountrySlug] = array(
					"numRegions" => 0,
					"regions" => array()
				);
			}
			if (!array_key_exists($currRegionSlug, $citiesByCountryRegion[$currCountrySlug]["regions"])) {
				$citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug] = array(
					"numCities" => 0,
					"cities" => array()
				);
				$citiesByCountryRegion[$currCountrySlug]["numRegions"]++;
			}
			$citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug]["cities"][] = array(
				"city"    => $cityInfo["city"],
				"city_id" => $cityInfo["city_id"]
			);
			$citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug]["numCities"]++;
		}

		// now we've put together all the info, add in "numRegions" and "numCities" hash keys
		// at the appropriate spots in the data structure. This'll help speed up the data generation
		$this->citiesByCountryRegion = $citiesByCountryRegion;
	}


	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "varchar(100) default NULL";
				} else if ($options == "Oracle") {
					$info = "varchar2(100) default NULL";
				}
				break;
		}

		return $info;
	}
}
