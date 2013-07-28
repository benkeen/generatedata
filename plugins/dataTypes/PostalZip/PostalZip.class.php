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

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		
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
		$regionCode = '';
		reset($generationContextData["existingRowData"]);
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Region") {
				$regionCode = $info["randomData"]["region_short"];
				break;
			}
		}
		
		$randomZip = "";

		// if there's neither a country nor a region, get a random country and generate a
		// random zip/postal code in that format
		if (empty($rowCountryInfo) && empty($rowRegionInfo)) {
			$randCountry = $options[rand(0, count($options)-1)];
			$randomZip = $this->convert($randCountry, $regionCode);
		} else {
			if (!empty($rowCountryInfo)) {
				$countrySlug = $rowCountryInfo["randomData"]["slug"];
			} else {
				$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			}
			if (in_array($countrySlug, $options)) {
				$randomZip = $this->convert($countrySlug, $regionCode);
			} else {
				$randCountry = $options[rand(0, count($options)-1)];
				$randomZip = $this->convert($randCountry, $regionCode);
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
	<input type="checkbox" name="dtCountryIncludeZip_{$slug}_%ROW%" id="dtCountryIncludeZip_{$slug}_%ROW%" checked="checked" data-country="{$slug}" />
	<label for="dtCountryIncludeZip_{$slug}_%ROW%">$regionName</label>
</div>
EOF;
		}
		$html .= '<div id="dtCountry_Complete%ROW%"></div>';

		return $html;
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help_text"]}</p>";
	}

	private function initZipFormats() {
		$countryPlugins = Core::$countryPlugins;
		$formats = array();
		foreach ($countryPlugins as $countryInfo) {
			$formats[$countryInfo->getSlug()] = array(
				"format"     => $countryInfo->getZipFormat(),
				"isAdvanced" => $countryInfo->isZipFormatAdvanced(),
				"isRegional" => $countryInfo->isZipFormatRegional()
			);
		}
		$this->zipFormats = $formats;
	}

	private function convert($countrySlug, $regionShort = "") {
		$zipInfo = $this->zipFormats[$countrySlug];
		$result = "";

		$countryFormatKey = $countrySlug . "-" . $countrySlug;
		$regionFormatKey  = $countrySlug . "-" . $regionShort;

		if ($zipInfo["isAdvanced"]) {
			$customFormat = "";
			$replacements = "";

			// if we have regional postal/zip formats
			if ($zipInfo["isRegional"]) {

				// TODO - not terribly happy with the overall logic here
				// 1. depends on order of the zipFormat data structure (e.g. CA-CA needed to be defined first otherwise
				// it may override the region-specific value)
				// 2. "CA-BC" format to map a zip format to a region seems kludgy; should just specify the region, not
				//    repeat the country. Plus the zipFormat data structure is now containing similar, but different
				//    data.
				// The grouping of all country-specific data should probably all be in one place. We already have a data
				// structure that contains the region info in the country install() functions. That should be where
				// we lump ALL region-specific info - zip, phone included.

				foreach ($zipInfo["format"] as $format) {
					if ($format["area"] == $countryFormatKey) {
						$customFormat = $format["format"];
						$replacements = $format["replacements"];

						// if
						if (!empty($regionShort)) {
							break;
						}

					} else if ($format["area"] == $regionFormatKey) {
						$customFormat = $format["format"];
						$replacements = $format["replacements"];
						break;
					}
				}

			} else {
				// here, there is a single postal/zip format for the country
				$customFormat = $zipInfo["format"]["format"];
				$replacements = $zipInfo["format"]["replacements"];
			}

			// now iterate over $customFormat and do whatever replacements have been specified
			for ($i=0; $i<strlen($customFormat); $i++) {
				if (array_key_exists($customFormat[$i], $replacements)) {
					$replacementKey = $replacements[$customFormat[$i]];
					$randChar = $replacementKey[rand(0, strlen($replacementKey)-1)];
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
				$format = $formats[rand(0, count($formats)-1)];
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
