<?php

/**
 * @package DataTypes
 */

class DataType_PhoneRegional extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Phone / Fax, Regional";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 25;
	protected $jsModules = array("PhoneRegional.js");
	protected $cssFiles = array("PhoneRegional.css");
	protected $processOrder = 3;
	private   $phoneFormats;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		// initialize the phone number formats needed for this Data Type
		if ($runtimeContext == "generation") {
			self::initPhoneFormats();
		}
	}

	public function generate($generator, $generationContextData) {

		// this contains the country-specific phone formats that the user selected in the UI
		$countryPhoneFormats = $generationContextData["generationOptions"];

		// see if this data set contains a country or a region
		$rowCountryField = $this->getRowCountryField($generationContextData);
		$rowRegionField  = $this->getRowRegionField($generationContextData);

		$desiredCountryPhoneFormat = "";
		$areaCodes = array();

		// Remaining: get the area codes

		if (empty($rowCountryField) && empty($rowRegionField)) {
			$countrySlug = array_rand($countryPhoneFormats);
			$desiredCountryPhoneFormat = $countryPhoneFormats[$countrySlug];
		} else if (!empty($rowRegionField)) {
			$countrySlug = $rowRegionField["randomData"]["country_slug"];
			$regionSlug  = $rowRegionField["randomData"]["region_slug"];
			if (array_key_exists($countrySlug, $this->phoneFormats) && array_key_exists($regionSlug, $this->phoneFormats[$countrySlug]["regionSpecificFormat"])) {
				$desiredCountryPhoneFormat = $this->phoneFormats[$countrySlug]["regionSpecificFormat"][$regionSlug];
			}
		} else {
			if (isset($rowCountryField["randomData"]["slug"]) && array_key_exists($rowCountryField["randomData"]["slug"], $countryPhoneFormats)) {
				$countrySlug = $rowCountryField["randomData"]["slug"];
			} else {
				$countrySlug = array_rand($countryPhoneFormats);
				$desiredCountryPhoneFormat = $countryPhoneFormats[$countrySlug];
			}
		}


		return array(
			"display" => $this->generatePhoneNumber($desiredCountryPhoneFormat, $areaCodes)
		);
	}

	public function getRowCountryField($generationContextData) {
		$rowCountryInfo = array();
		foreach ($generationContextData["existingRowData"] as $row) {
			if ($row["dataTypeFolder"] == "Country") {
				$rowCountryInfo = $row;
				break;
			}
		}
		return $rowCountryInfo;
	}

	public function getRowRegionField($generationContextData) {
		$rowRegionInfo = array();
		foreach ($generationContextData["existingRowData"] as $row) {
			if ($row["dataTypeFolder"] == "Region") {
				$rowRegionInfo = $row;
				break;
			}
		}
		return $rowRegionInfo;
	}

	public function getOptionsColumnHTML() {
		$countryPlugins = Core::$countryPlugins;

		$html = "";
		foreach ($countryPlugins as $pluginInfo) {
			$slug       = $pluginInfo->getSlug();
			$regionName = $pluginInfo->getRegionNames();
			$extendedData = $pluginInfo->getExtendedData();

			if (!isset($extendedData["phoneFormat"]) || !isset($extendedData["phoneFormat"]["displayFormats"])) {
				continue;
			}

			$options = $this->getDisplayFormatOptions($slug, $extendedData["phoneFormat"]["displayFormats"]);
			$html .= <<<EOF
<div class="dtPhoneRegionalCountry dtPhoneRegionalCountry_$slug">
	<label for="dtPhoneRegional_{$slug}_%ROW%">$regionName</label>
	$options
</div>
EOF;
		}
		$html .= '<div id="dtPhoneRegional_Complete%ROW%"></div>';

		return $html;
	}

	public function getDisplayFormatOptions($countrySlug, $displayFormats) {
		$options = "";
		$id = "dtPhoneRegional_{$countrySlug}_%ROW%";

		if (is_string($displayFormats)) {
			$options = "<input type=\"hidden\" name=\"$id\" id=\"$id\" value=\"$displayFormats\" />$displayFormats";
		} else {
			if (is_array($displayFormats) && count($displayFormats) == 1) {
				$options = "<input type=\"hidden\" name=\"$id\" id=\"$id\" value=\"{$displayFormats[0]}\" />{$displayFormats[0]}";
			} else {
				$options = "<select name=\"$id\" id=\"$id\">";
				for ($i=0; $i<count($displayFormats); $i++) {
					$options .= "<option value=\"{$displayFormats[$i]}\">{$displayFormats[$i]}</option>";
				}
				$options .= "</select>";
			}
		}

		return $options;
	}

	/**
	 * Loop through the formats returned by the client for the supported country plugins and make a note of the
	 * format chosen.
	 * @param object $generator
	 * @param $postdata
	 * @param $colNum
	 * @param $numCols
	 * @return array|mixed
	 */
	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();

		// if the user didn't select any Country plugins, they want ANY old region
		$countryPhoneFormats = array();
		foreach ($countries as $slug) {
			$key = "dtPhoneRegional_{$slug}_$colNum";
			if (array_key_exists($key, $postdata)) {
				$countryPhoneFormats[$slug] = $postdata[$key];
			}
		}

		return $countryPhoneFormats;
	}


	public function getHelpHTML() {
		$html =<<<END
	<p>
		{$this->L["help_text1"]}
	</p>
END;
	    return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100) default NULL",
			"SQLField_Oracle" => "varchar2(100) default NULL",
			"SQLField_MSSQL" => "VARCHAR(100) NULL"
		);
	}

	private function initPhoneFormats() {
		$countryPlugins = Core::$countryPlugins;
		$formats = array();
		foreach ($countryPlugins as $countryInfo) {
			$extendedData = $countryInfo->getExtendedData();
			if (!isset($extendedData["phoneFormat"]) || !isset($extendedData["phoneFormat"]["displayFormats"])) {
				continue;
			}

			$formats[$countryInfo->getSlug()] = array(
				"phoneFormat"=> $extendedData["phoneFormat"],
				"regionSpecificFormat" => $countryInfo->getRegionalExtendedData("phoneFormat")
			);
		}
		$this->phoneFormats = $formats;
	}


	private function generatePhoneNumber($format, $areaCodes) {

	}


/*
	private function convert($countrySlug, $regionShort = "") {
		$phoneInfo = $this->phoneFormats[$countrySlug];
	
		$result = "";
		if (true == $phoneInfo["isAdvanced"]) {
		
			// If we have regional postal/zip formats
			if (true == $phoneInfo["isRegional"]) {
			
				$npaRange     = array();
				$customFormat = "";
				$replacements = "";

				// Find the Regional postal/zip format
				foreach ($phoneInfo["format"] as $format) {
					switch ($format["area"]) {
						case $countrySlug.'-'.$countrySlug:
							$npaRange     = $format["npa"];
							$customFormat = $format["format"];
							$replacements = $format["replacements"];
							if ('' == $regionShort) break 2;
							break;
						
						case $countrySlug.'-'.$regionShort:
							$npaRange     = $format["npa"];
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
				
				// pick a random NPA and add it to the front of the phone number.
				$maxNpa = count( $npaRange );
				$npa    = $npaRange[0];

				if ( $maxNpa > 1) {
					$index = rand(0, $maxNpa -1);
					$npa   = $npaRange[$index];
				}
				$result = $npa.$result;
				
			} else {
			
				$npaRange     = array();
				$customFormat = "";
				$replacements = "";

				// Find the Regional postal/zip format
				foreach ($phoneInfo["format"] as $format) {
					switch ($format["area"]) {
						case $countrySlug.'-'.$countrySlug:
							$npaRange     = $format["npa"];
							$customFormat = $format["format"];
							$replacements = $format["replacements"];
							if ('' == $regionShort) break 2;
							break;
							
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
		
				// pick a random NPA and add it to the front of the phone number.
				$maxNpa = count( $npaRange );
				$npa    = $npaRange[0];
				
				if ( $maxNpa > 1) {
					$index = rand(0, $maxNpa -1);
					$npa   = $npaRange[$index];
				}
				$result = $npa.$result;					
			}	
		} else {
			$result = '';
		}

		return $result;
	}
*/

}
