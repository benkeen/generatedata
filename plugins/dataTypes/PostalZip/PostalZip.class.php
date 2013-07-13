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

		// if we're in the process of generating data, populate the private vars with the first and last names
		// needed for data generation
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

		$randomZip = "";
		if (empty($rowCountryInfo) && empty($rowRegionInfo)) {
			$randCountry = $options[rand(0, count($options)-1)];
			$randomZip = $this->convert($randCountry);
		} else {
			// if this country is one of the formats that was selected, generate it in that format -
			// otherwise just generate a zip in any selected format
			if (!empty($rowCountryInfo)) {
				$countrySlug = $rowCountryInfo["randomData"]["slug"];
			} else {
				$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			}
			if (in_array($countrySlug, $options)) {
				$randomZip = $this->convert($countrySlug);
			} else {
				$randCountry = $options[rand(0, count($options)-1)];
				$randomZip = $this->convert($randCountry);
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
			$countrySlug = $countryInfo->getSlug();
			$zipFormat   = $countryInfo->getZipFormat();
			$zipFormatAdvanced = $countryInfo->isZipFormatAdvanced();
			$formats[$countrySlug] = array(
				"format"    => $zipFormat,
				"isAdvanced"=> $zipFormatAdvanced
			);
		}

		$this->zipFormats = $formats;
	}


	private function convert($randCountry) {
		$zipInfo = $this->zipFormats[$randCountry];

		$result = "";
		if ($zipInfo["isAdvanced"]) {
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
