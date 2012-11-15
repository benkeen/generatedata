<?php

class DataType_City extends DataTypePlugin {

	protected $dataTypeName = "City";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 20;
	protected $processOrder = 3;
	private $countryRegions;
	private $citiesByRegion;
	private $numRegions;


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
			$regionSlug = $rowRegionInfo["randomData"]["region_slug"];
			$randomCity = $this->citiesByRegion[$regionSlug][rand(0, count($this->citiesByRegion[$regionSlug])-1)]["city"];
		} else if (!empty($rowCountryInfo)) {
			// pick a random region in this country
			$countrySlug = $rowCountryInfo["randomData"]["slug"];
			$countryRegions = $this->countryRegions[$countrySlug]["regions"];
			$numCountryRegions = $this->countryRegions[$countrySlug]["numRegions"];

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

		$return = array(
			"display" => $randomCity
		);
		return $return;
	}


	/**
	 * Called when the plugin is initialized during data generation.
	 *
	 * TODO. this doesn't look right. What about regions with the same slug?
	 */
	private function initCityList() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM {$prefix}cities
		");

		if ($response["success"]) {
			$cities = array();
			$citiesByRegion = array();
			while ($cityInfo = mysql_fetch_assoc($response["results"])) {
				if (!array_key_exists($cityInfo["region_slug"], $citiesByRegion)) {
					$citiesByRegion[$cityInfo["region_slug"]] = array();
				}

				$citiesByRegion[$cityInfo["region_slug"]][] = array(
					"city"    => $cityInfo["city"],
					"city_id" => $cityInfo["city_id"]
				);
			}
		}

		$this->citiesByRegion = $citiesByRegion;
		$this->numRegions = count($citiesByRegion);
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
