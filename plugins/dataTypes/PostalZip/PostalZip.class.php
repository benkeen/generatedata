<?php

/**
 * @package DataTypes
 */

class DataType_PostalZip extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Postal / Zip";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 30;
	protected $processOrder = 2;
	protected $jsModules = array("PostalZip.js");
	private $zipFormats;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		// IF we're in the process of generating data THEN
		//    Get all the initialize the private variable with the formats 
		//       of the selected country/region or all IF none are specified.
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
		
		// IF we have a region get the short code to use with the convert() function.
		// *** This only works if the REGION appears before the POSTAL/ZIP row in the data.
		$regionCode = '';
		reset($generationContextData["existingRowData"]);
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Region") {
				$regionCode = $info["randomData"]["region_short"];
				break;
			}
		}
		
		$randomZip = "";
		// IF there is no country AND no region, THEN
		//    get a random country and generate a random zip/postal code in that format.
		if (empty($rowCountryInfo) && empty($rowRegionInfo)) {
			$randCountry = $options[rand(0, count($options)-1)];
			$randomZip = $this->convert($randCountry, $regionCode);
		} else {
			// if this country is one of the formats that was selected, generate it in that format -
			// otherwise just generate a zip in any selected format
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
				"format"    => $countryInfo->getZipFormat(),
				"isAdvanced"=> $countryInfo->isZipFormatAdvanced(),
				"isRegional"=> $countryInfo->isZipFormatRegional()
			);
		}

		$this->zipFormats = $formats;
	}

	private function convert($countrySlug, $regionShort = '') {
		$zipInfo = $this->zipFormats[$countrySlug];
		$result = "";
		
		if (true == $zipInfo["isAdvanced"]) {
		
			// If we have regional postal/zip formats
			if (true == $zipInfo["isRegional"]) {
			
				$customFormat = "";
				$replacements = "";

				// Find the Regional postal/zip format
				foreach ($zipInfo["format"] as $format) {
					switch ($format["area"]) {
						case $countrySlug.'-'.$countrySlug:
							$customFormat = $format["format"];
							$replacements = $format["replacements"];
							if ('' == $regionShort) break 2;
							break;
						
						case $countrySlug.'-'.$regionShort:
							$customFormat = $format["format"];
							$replacements = $format["replacements"];
							break 2;
						
						default:
							// Do nothing.
					}
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
				// Otherwise, there is a single postal/zip format for the country.
				$customFormat = $zipInfo["format"]["format"];
				$replacements = $zipInfo["format"]["replacements"];

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
