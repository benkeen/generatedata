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


		//
		$countryCode    = '';
		$rowRegionInfo  = '';
		$regionCode     = '';


		$randomPhone = "";

		// if the row contained neither a country nor a region, pick a random country and generate a
		if (empty($rowCountryInfo) && empty($rowRegionInfo)) {

			$randomPhone = $formats[0];
			if (count($formats) > 1) {
				$randomPhone = $formats[rand(0, count($formats)-1)];
			}
		} else  {
			// if this country is one of the formats that was selected, generate it in that format -
			// otherwise just generate a zip in any selected format
			if (empty($rowCountryInfo)) {
				$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			}
							
			if (in_array($countrySlug, $options)) {
				//$randomPhone = $this->convert($countrySlug, $regionCode);
				$randomPhone  = "02";
			} else {
				//$randCountry = $options[rand(0, count($options)-1)];
				// Get the country code
				$randomPhone = $this->convert( $countrySlug, $regionCode );
			}
		}


		if( '' == $randomPhone )
		{
			$phoneStr = Utils::generateRandomAlphanumericStr($generationContextData["generationOptions"]);		
			$formats = explode("|", $phoneStr);
			$randomPhone = $formats[0];
			if (count($formats) > 1) {
				$randomPhone = $formats[rand(0, count($formats)-1)];
			}
		}
		else
		{
			$formatOutput = $generationContextData["generationOptions"];
			$indexPhone   = 0;
			$phoneNumber = '';
			for( $x=0; $x<strlen( $formatOutput ); $x++ )
			{
				$char = $formatOutput[$x];			
		
				if( 'x' == $char || 'X' == $char )
				{
					if( strlen( $randomPhone ) < $indexPhone )
					{
						$phoneNumber = $phoneNumber.$char;
					}
					else
					{
						$phoneNumber = $phoneNumber.substr( $randomPhone, $indexPhone, 1 );
					}
					$indexPhone = $indexPhone +1;
				}
				else
				{
					$phoneNumber = $phoneNumber.$char;
				}
			}
			$randomPhone = $phoneNumber;
		}
		
		return array(
			"display" => $randomPhone
		);
	}

	public function getRowGenerationOptions($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
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

	// added by Andre from PostalZip class
	private function initPhoneFormats() {
		$countryPlugins = Core::$countryPlugins;
		$formats = array();
		foreach ($countryPlugins as $countryInfo) {
			$formats[$countryInfo->getSlug()] = array(
				"format"     => $countryInfo->getPhoneFormat(),
				"isAdvanced" => $countryInfo->isPhoneFormatAdvanced(),
				"regionSpecificFormat" => $countryInfo->getCountryRegionSpecificPhoneFormats()
			);
		}
		$this->phoneFormats = $formats;
	}


	private function convert($countrySlug, $regionShort = '') 
	{
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
}
