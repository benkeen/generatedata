import { DTMetadata, DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	console.log(data);
	
	/*
	$selectedCountrySlugs = $generationContextData["generationOptions"];

	// track the country info (this finds the FIRST country field listed)
	$rowCountryInfo = array();
	while (list($key, $info) = each($generationContextData["existingRowData"])) {
		if ($info["dataTypeFolder"] == "Country") {
			$rowCountryInfo = $info;
			break;
		}
	}

	// if there was no country, see if there's a region
	$rowRegionInfo = array();
	if (empty($rowCountryInfo)) {
		reset($generationContextData["existingRowData"]);
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Region") {
				$rowRegionInfo = $info;
				break;
			}
		}
	}

	// if we have a region, get the short code to use with the convert() function
	$regionCode = "";
	reset($generationContextData["existingRowData"]);
	while (list($key, $info) = each($generationContextData["existingRowData"])) {
		if ($info["dataTypeFolder"] == "Region") {
			$regionCode = $info["randomData"]["region_slug"];
			break;
		}
	}

	$randomZip = "";

	// if there's neither a country nor a region, get a random country and generate a random zip/postal code
	// in that format
	if (empty($rowCountryInfo) && empty($rowRegionInfo)) {
		if (empty($selectedCountrySlugs)) {
			$randCountrySlug = array_rand($this->zipFormats);
		} else {
			$randCountrySlug = $selectedCountrySlugs[mt_rand(0, count($selectedCountrySlugs)-1)];
		}
		$randomZip = $this->convert($randCountrySlug, "");
	} else {

		$countrySlug = "";
		if (!empty($rowCountryInfo) && is_array($rowCountryInfo["randomData"]) && array_key_exists("slug", $rowCountryInfo["randomData"])) {
			$countrySlug = $rowCountryInfo["randomData"]["slug"];
		} else {
			if (isset($rowRegionInfo["randomData"]) && is_array($rowRegionInfo["randomData"]) && array_key_exists("country_slug", $rowRegionInfo["randomData"])) {
				$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			}
		}

		if (!empty($countrySlug) && in_array($countrySlug, $selectedCountrySlugs)) {
			$randomZip = $this->convert($countrySlug, $regionCode);
		} else {
			$randCountrySlug = array_rand($this->zipFormats);
			$randomZip = $this->convert($randCountrySlug, $regionCode);
		}
	}
	*/

	return { display: '' }; // $randomZip
};


/*
	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();
		$options = array();
		foreach ($countries as $slug) {
			if (isset($postdata["dtCountryIncludeZip_{$slug}_$colNum"])) {
				$options[] = $slug;
			}
		}
		return $options;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$countries = $generator->getCountries();
		$options = array();
		foreach ($countries as $slug) {
			if (in_array($slug, $json->settings->countries)) {
				$options[] = $slug;
			}
		}

		return $options;
	}

	private function initZipFormats() {
		$countryPlugins = Core::$countryPlugins;
		$formats = array();
		foreach ($countryPlugins as $countryInfo) {
			$extendedData = $countryInfo->getExtendedData();

			if (!isset($extendedData["zipFormat"])) {
				continue;
			}

			$format = "";
			$isAdvanced = false;
			$replacements = array();
			if (is_string($extendedData["zipFormat"])) {
				$format = $extendedData["zipFormat"];
			} else if (array_key_exists("format", $extendedData["zipFormat"]) && is_string($extendedData["zipFormat"]["format"])) {
				$format = $extendedData["zipFormat"]["format"];
				$replacements = isset($extendedData["zipFormat"]["replacements"]) ? $extendedData["zipFormat"]["replacements"] : array(); // TODO double check empty array is valid
				$isAdvanced = true;
			}

			if (empty($format)) {
				continue;
			}

			$returnInfo = array(
				"format"       => $format,
				"replacements" => $replacements,
				"isAdvanced"   => $isAdvanced,
				"regionSpecificFormat" => array()
			);
			if ($isAdvanced) {
				$returnInfo["regionSpecificFormat"] = $countryInfo->getRegionalExtendedData("zipFormat");
			}
			$formats[$countryInfo->getSlug()] = $returnInfo;
		}
		$this->zipFormats = $formats;
	}


	private function convert($countrySlug, $regionShort = "") {
		$zipInfo = $this->zipFormats[$countrySlug];

		$result = "";
		if ($zipInfo["isAdvanced"]) {

			// if the country plugin defined a custom zip format for this region, use it
			if (!empty($regionShort) && !empty($zipInfo["regionSpecificFormat"]) && array_key_exists($regionShort, $zipInfo["regionSpecificFormat"])) {
				$customFormat = isset($zipInfo["regionSpecificFormat"][$regionShort]["format"]) ? $zipInfo["regionSpecificFormat"][$regionShort]["format"]: "";
				$replacements = isset($zipInfo["regionSpecificFormat"][$regionShort]["replacements"]) ? $zipInfo["regionSpecificFormat"][$regionShort]["replacements"] : "";
			}
			$customFormat = !empty($customFormat) ? $customFormat : $zipInfo["format"];
			$replacements = !empty($replacements) ? $replacements : $zipInfo["replacements"];

			// now iterate over $customFormat and do whatever replacements have been specified
			$customFormatLen = strlen($customFormat);
			for ($i=0; $i<$customFormatLen; $i++) {
				if (array_key_exists($customFormat[$i], $replacements)) {
					$replacementKey = $replacements[$customFormat[$i]];
					$randChar = $replacementKey[mt_rand(0, strlen($replacementKey)-1)];
					$result .= $randChar;
				} else {
					$result .= $customFormat[$i];
				}
			}
		} else {
			$formats = explode("|", $zipInfo["format"]);
			$numFormats = count($formats);
			if ($numFormats == 1) {
				$format = $formats[0];
			} else {
				$format = $formats[mt_rand(0, $numFormats-1)];
			}
			$result = Utils::generateRandomAlphanumericStr($format);
		}

		return $result;
	}
*/

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(10) default NULL',
		field_Oracle: 'varchar2(10) default NULL',
		field_MSSQL: 'VARCHAR(10) NULL'
	}
});
