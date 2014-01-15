<?php

/**
 * @package DataTypes
 */

class DataType_PostalZip extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Postal / Zip";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 30;
	protected $processOrder = 3;
	protected $jsModules = array("PostalZip.js");
	private $zipFormats;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		// if we're in the process of generating data then initialize a private var with the
		// zip formats of all countries registered the system
		if ($runtimeContext == "generation") {
			self::initZipFormats();
		}
	}

	// this kind of sucks! Way too dense logic - too high cyclomatic complexity.
	public function generate($generator, $generationContextData) {
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

		return array(
			"display" => $randomZip
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();
		$options = array();
		foreach ($countries as $slug) {
			if (isset($postdata["dtCountryIncludeZip_{$slug}_$colNum"])) {
				$options[] = $slug;
			}
		}
		return $options;
	}

	public function getOptionsColumnHTML() {
		$countryPlugins = Core::$countryPlugins;
		$html = "";
		foreach ($countryPlugins as $pluginInfo) {
			$slug       = $pluginInfo->getSlug();
			$regionName = $pluginInfo->getRegionNames();

			$html .= <<<EOF
<div class="dtCountry dtCountry_$slug">
	<input type="checkbox" name="dtCountryIncludeZip_{$slug}_%ROW%"
	id="dtCountryIncludeZip_{$slug}_%ROW%" checked="checked" data-country="{$slug}" /><label for="dtCountryIncludeZip_{$slug}_%ROW%">$regionName</label>
</div>
EOF;
		}
		$html .= '<div id="dtCountry_Complete%ROW%"></div>';

		return $html;
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help_text"]}</p>";
	}

	/**
	 * This is called when data generation starts. It does the work of generating a data structure containing all
	 * the info we need to intelligently generate a zip format for the country-region.
	 */
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
			for ($i=0; $i<strlen($customFormat); $i++) {
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
			if (count($formats) == 1) {
				$format = $formats[0];
			} else {
				$format = $formats[mt_rand(0, count($formats)-1)];
			}
			$result = Utils::generateRandomAlphanumericStr($format);
		}

		return $result;
	}


	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(10) default NULL",
			"SQLField_Oracle" => "varchar2(10) default NULL",
			"SQLField_MSSQL" => "VARCHAR(10) NULL"
		);
	}
}
