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

		// TODO: support several countries?
		$personnr = $this->generateRandomSwedishPersonalNumber();

		// pretty sodding unlikely, but just in case!
		while (in_array($personnr, $this->generatedPersonnrs)) {
			$personnr = $this->generateRandomSwedishPersonalNumber();
		}
		$this->generatedPersonnrs[] = $personnr;
		return array(
			"display" => $personnr
		);
	}
	
	public static function generateRandomSwedishPersonalNumber() {

		$new_str = "16";
		$strlen = 13;	// Default, 12 siffers + '-'
		for ($i=0; $i<$strlen; $i++) {
			switch ($i) {
				/*case 0: $new_str .= "1";  break;
				case 1: $new_str .= "6";  break;*/
				case 2: $new_str .= sprintf("%02d", mt_rand(0, 99));  break;
				case 4: $new_str .= sprintf("%02d", mt_rand(1, 12));  break;
				case 6: $new_str .= sprintf("%02d", mt_rand(1, 30));  break;
				case 8: $new_str .= "-";  break;
				case 9: $new_str .= "1010";  break;
				default:
					break;
			}
		}

		return $new_str;
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
