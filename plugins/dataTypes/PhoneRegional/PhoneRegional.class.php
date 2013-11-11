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
	private   $unknownCountryPhoneFormat = "(Xxx) Xxx-xxxx";


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		// initialize the phone number formats needed for this Data Type
		if ($runtimeContext == "generation") {
			self::initPhoneFormats();
		}
	}

	public function generate($generator, $generationContextData) {

		// this contains all the country-specific phone formats that the user selected in the UI
		$countryPhoneFormats = $generationContextData["generationOptions"];

		// 1. check the existing row data to see if this data set contains a country or a region
		$rowCountryField = $this->getRowCountryField($generationContextData);
		$rowRegionField  = $this->getRowRegionField($generationContextData);

		// 2. again check the existing data set to get a (maybe) random country and a (maybe) region-specific phone format
		list($countrySlug, $regionSlug, $customRegionalFormat) = $this->getCountryAndRegionalFormat($countryPhoneFormats, $rowCountryField, $rowRegionField);

		// 3. see if this country-region has any area codes to mess with. Returns an empty array if there are no area codes
		$areaCodes = $this->getAreaCodes($countrySlug, $regionSlug);

		// 4. now get the desired phone format entered in the UI
		$desiredFormat = $this->getDesiredPhoneFormat($countrySlug, $countryPhoneFormats);

		// now generate a phone number
		$phoneNumber = $this->generatePhoneNumber($desiredFormat, $customRegionalFormat, $areaCodes);

		return array(
			"display" => $phoneNumber
		);
	}


	/**
	 * Returns three things based on the data passed:
	 *  - a random country slug
	 *  - a region slug
	 *  - the phone number format for the country-region. If one isn't defined, it returns an empty string.
	 */
	private function getCountryAndRegionalFormat($countryPhoneFormats, $rowCountryField, $rowRegionField) {
		$customRegionalFormat = "";
		$countrySlug = "";
		$regionSlug = "";

		// now get the most specific format we have for this country-region
		if (empty($rowCountryField) && empty($rowRegionField)) {
			$countrySlug = array_rand($countryPhoneFormats);
		} else if (!empty($rowRegionField)) {
			$countrySlug = $rowRegionField["randomData"]["country_slug"];
			$regionSlug  = $rowRegionField["randomData"]["region_slug"];

			// if there's a custom format for this region, use it. Otherwise use the default format for the country
			if (array_key_exists($countrySlug, $this->phoneFormats)) {
				if (array_key_exists($regionSlug, $this->phoneFormats[$countrySlug]["regionSpecificFormat"])) {
					if (array_key_exists("format", $this->phoneFormats[$countrySlug]["regionSpecificFormat"][$regionSlug])) {
						$customRegionalFormat = $this->phoneFormats[$countrySlug]["regionSpecificFormat"][$regionSlug]["format"];
					}
				}
			}
		} else {
			if (isset($rowCountryField["randomData"]["slug"]) && array_key_exists($rowCountryField["randomData"]["slug"], $countryPhoneFormats)) {
				$countrySlug = $rowCountryField["randomData"]["slug"];
			} else {
				$countrySlug = array_rand($countryPhoneFormats);
			}
		}

		return array($countrySlug, $regionSlug, $customRegionalFormat);
	}

	private function getDesiredPhoneFormat($countrySlug, $countryPhoneFormats) {
		$phoneFormat = "";

		if (array_key_exists($countrySlug, $countryPhoneFormats)) {
			$phoneFormat = $countryPhoneFormats[$countrySlug];
		} else {
			// here we're generating a row for a country whose format we have NO idea. The whole purpose of the regional phone
			// Data Type is for countries that we do, so in this case we simple
			$phoneFormat = $this->unknownCountryPhoneFormat;
		}

		return $phoneFormat;
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

	// it blows my mind how awful this method is
	private function getAreaCodes($countrySlug, $regionSlug) {
		if (!array_key_exists($countrySlug, $this->phoneFormats)) {
			return array();
		}
		if (!array_key_exists("phoneFormat", $this->phoneFormats[$countrySlug])) {
			return array();
		}
		if (!array_key_exists("areaCodes", $this->phoneFormats[$countrySlug]["phoneFormat"])) {
			return array();
		}
		$areaCodes = $this->phoneFormats[$countrySlug]["phoneFormat"]["areaCodes"];

		if (array_key_exists($regionSlug, $this->phoneFormats[$countrySlug]["regionSpecificFormat"])) {
			if (array_key_exists("areaCodes", $this->phoneFormats[$countrySlug]["regionSpecificFormat"][$regionSlug])) {
				$areaCodes = $this->phoneFormats[$countrySlug]["regionSpecificFormat"][$regionSlug]["areaCodes"];
			}
		}

		return $areaCodes;
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
		{$this->L["help_text"]}
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


	private function generatePhoneNumber($desiredFormat, $customRegionFormat, $areaCodes) {

		// first off, replace any area code in the desired format
		$phoneNumber = $this->replaceRandomAreaCode($desiredFormat, $areaCodes);

		// if there isn't a custom region format, no problem - just switch out the X's and x's
		if (empty($customRegionFormat)) {
			$phoneNumber = Utils::generateRandomAlphanumericStr($phoneNumber);
		} else {
			// there IS a custom format. This is more complicated. We need to now merge $customRegionFormat (e.g. 123xxxx)
			// with the $desiredFormat (e.g. 1 (604) xxx-xxxx). The assumption here is that area codes always come first.
			$replacementChars = Utils::generateRandomAlphanumericStr($customRegionFormat);

			$phoneNumberRev      = strrev($phoneNumber);
			$replacementCharsRev = strrev($replacementChars);
			$xIndex = 0;
			$newPhoneNumber = "";
			for ($i=0; $i<strlen($phoneNumberRev); $i++) {
				$currChar = $phoneNumberRev[$i];
				if ($currChar === "x") {
					$newPhoneNumber .= $replacementCharsRev[$xIndex];
					$xIndex++;
				} else {
					$newPhoneNumber .= $currChar;
				}
			}
			$phoneNumber = strrev($newPhoneNumber);
		}

		return $phoneNumber;
	}

	/**
	 * Assumption: the area code is in a single block of A's.
	 * @param $desiredFormat
	 * @param $areaCodes
	 * @return mixed|string
	 */
	private function replaceRandomAreaCode($desiredFormat, $areaCodes) {

		// if the desired format doesn't contain an area code, shut down the party
		if (!strstr($desiredFormat, "A")) {
			return $desiredFormat;
		}

		$str = "";
		if (!empty($areaCodes)) {
			$areaCode = $areaCodes[mt_rand(0, count($areaCodes)-1)];
			$str = preg_replace("/A+/", $areaCode, $desiredFormat);
		} else {
			preg_match("/A+/", $desiredFormat, $matches);
			$areaCodeLength = strlen($matches[0]);
			$replacement = substr("Xxxxxxxxxxxxxxxx", 0, $areaCodeLength);
			$str = preg_replace("/A+/", Utils::generateRandomAlphanumericStr($replacement), $desiredFormat);
		}
		return $str;
	}

}
