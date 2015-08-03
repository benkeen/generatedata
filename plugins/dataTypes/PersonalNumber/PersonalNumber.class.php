<?php

/**
 * @package DataTypes
 */

class DataType_PersonalNumber extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "PersonalNumber";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 110;
	/*protected $processOrder = 2;
	protected $jsModules = array("Region.js");
	protected $cssFiles = array("Region.css");
	private $countryRegionHash;*/
	private $generatedPersonnrs = array();


	/**
	 * Generate a random personal number, and return the display string and additional meta data for use
	 * by any other Data Type.
	 */
	public function generate($generator, $generationContextData) {
		$generationOptions = $generationContextData["generationOptions"];

		$placeholderStr = "Xxxxxxxx-xxxx";
		$personnr = Utils::generateRandomAlphanumericStr($placeholderStr);

		// pretty sodding unlikely, but just in case!
		while (in_array($personnr, $this->generatedPersonnrs)) {
			$personnr = Utils::generateRandomAlphanumericStr($placeholderStr);
		}
		$this->generatedPersonnrs[] = $personnr;
		return array(
			"display" => $personnr
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();
		$generationOptions = array();

		// if the user didn't select any Country plugins, they want ANY old region
		if (empty($countries)) {
			$generationOptions["resultType"] = "any";
		} else {
			$generationOptions["resultType"] = "specificCountries";
			$generationOptions["countries"] = array();

			foreach ($countries as $slug) {
				if (isset($postdata["dtIncludeRegion_{$slug}_$colNum"])) {
					$region_full  = (isset($postdata["dtIncludeRegion_{$slug}_Full_$colNum"])) ? true : false;
					$region_short = (isset($postdata["dtIncludeRegion_{$slug}_Short_$colNum"])) ? true : false;
					$generationOptions["countries"][$slug] = array(
						"full"  => $region_full,
						"short" => $region_short
					);
				}
			}
		}

		return $generationOptions;
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help_text"]}</p>";
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(13) default NULL",
			"SQLField_Oracle" => "varchar2(13) default NULL",
			"SQLField_MSSQL" => "VARCHAR(13) NULL"
		);
	}

}
