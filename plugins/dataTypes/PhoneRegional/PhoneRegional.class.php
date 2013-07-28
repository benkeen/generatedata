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
	protected $processOrder = 25;
	private   $phoneFormats;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		// IF we're in the process of generating data THEN
		//    Get all the initialize the private variable with the formats
		//       of the selected country/region or all IF none are specified.
		if ($runtimeContext == "generation") {
			self::initPhoneFormats();
		}
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		
		$rowCountryInfo = array();
		$countryCode    = '';
		$rowRegionInfo  = '';
		$regionCode     = '';
		foreach( $generationContextData["existingRowData"] as $info) {
			switch( $info["dataTypeFolder"] ) {

				case "Country":
					$rowCountryInfo = $info;
					$countrySlug    = $rowCountryInfo["randomData"]["slug"];
					break;

				case "Region":
					$rowRegionInfo = $info;
					$regionCode    = $info["randomData"]["region_short"];
					break;
			}
		}
		
		$randomPhone = "";

		// IF there is no country AND no region, THEN
		//    get a random country and generate a random zip/postal code in that format.
		if (empty($rowCountryInfo) && empty($rowRegionInfo))
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
			// if this country is one of the formats that was selected, generate it in that format -
			// otherwise just generate a zip in any selected format
			if (empty($rowCountryInfo)) {
				$countrySlug = $rowRegionInfo["randomData"]["country_slug"];
			}
							
			if (in_array($countrySlug, $options))
			{
				//$randomPhone = $this->convert($countrySlug, $regionCode);
				$randomPhone  = "02";
			}
			else
			{
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

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<<EOF
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="1-Xxx-Xxx-xxxx">{$this->L["example_1"]}</option>
		<option value="(Xxx) Xxx-xxxx">{$this->L["example_2"]}</option>
		<option value="1 Xx Xxx Xxxx-xxxx">{$this->L["uk"]}</option>
		<option value="0X xx xx xx xx">{$this->L["france"]}</option>
		<option value="(0X) xxxx xxxx">{$this->L["australia"]}</option>
		<option value="(0xx) xxxxxxxx|(0xxx) xxxxxxxx|(0xxxx) xxxxxxx|(03xxxx) xxxxxx">{$this->L["germany"]}</option>
		<option value="0xx-xxx-xxxx">{$this->L["japan"]}</option>
		<option value="1-Xxx-Xxx-xxxx|Xxx-xxxx">{$this->L["different_formats"]}</option>
	</select>
EOF;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html = '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
		return $html;
	}

	public function getHelpHTML() {
		$html =<<<END
	<p>
		{$this->L["help_text1"]}
	</p>
	<p>
		{$this->L["help_text2"]}
	</p>
	<p>
		{$this->L["help_text3"]}
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

	// Added by Andre from PostalZip class.
	private function initPhoneFormats() 
	{
		$countryPlugins = Core::$countryPlugins;
		$formats = array();
		foreach ( $countryPlugins as $countryInfo )
		{

			$formats[$countryInfo->getSlug()] = array(
				"format"    => $countryInfo->getPhoneFormat(),
				"isRegional"=> $countryInfo->isPhoneFormatRegional(),
				"isAdvanced"=> $countryInfo->isPhoneFormatAdvanced()
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
