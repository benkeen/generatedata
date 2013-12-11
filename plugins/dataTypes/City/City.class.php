<?php

/**
 * @package DataTypes
 */

class DataType_City extends DataTypePlugin {

	protected $isEnabled = true;
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
			// TODO bug here (when user unselected particular row regions)
			$regionData = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug];
			$numCitiesInRegion = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["numCities"];
			$citiesInRegion    = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["cities"];
			$randomCity = $citiesInRegion[mt_rand(0, $numCitiesInRegion-1)]["city"];
		} else if (!empty($rowCountryInfo)) {
			// pick a random region in this country. If the existing row data had a slug, it means there's
			// a country-plugin for that country, so we can intelligently load a City
			if (isset($rowCountryInfo["randomData"]["slug"])) {
				$countrySlug = $rowCountryInfo["randomData"]["slug"];
				$countryRegions    = $this->citiesByCountryRegion[$countrySlug]["regions"];
				$key = array_rand($countryRegions);
				$cities = $countryRegions[$key]["cities"];
				$numCities = $countryRegions[$key]["numCities"];
				$randomCity = $cities[mt_rand(0, $numCities-1)]["city"];
			} else {
				$randomCity = $this->cities[mt_rand(0, $this->numCities-1)];
			}
		} else {
			$randomCity = $this->cities[mt_rand(0, $this->numCities-1)];
		}

		return array(
			"display" => $randomCity
		);
	}


	/**
	 * Called when the plugin is initialized during data generation. Initializes the 
	 * $citiesByCountryRegion private var.
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
		while ($cityInfo = mysqli_fetch_assoc($response["results"])) {
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
			$cities[] = $cityInfo["city"];
		}

		// now we've put together all the info, add in "numRegions" and "numCities" hash keys
		// at the appropriate spots in the data structure. This'll help speed up the data generation
		$this->citiesByCountryRegion = $citiesByCountryRegion;
		$this->cities = $cities;
		$this->numCities = count($cities);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}
}
