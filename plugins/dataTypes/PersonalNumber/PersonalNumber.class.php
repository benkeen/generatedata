<?php

/**
 * @package DataTypes
 */

class DataType_PersonalNumber extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "PersonalNumber";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 110;
	protected $jsModules = array("PersonalNumber.js");
	/*protected $processOrder = 2;
	protected $cssFiles = array("Region.css");
	private $countryRegionHash;*/
	private $generatedPersonnrs = array();
	// Separator in personal number
	// static $sep = "-";


	/**
	 * Generate a random personal number, and return the display string and additional meta data for use
	 * by any other Data Type.
	 */
	public function generate($generator, $generationContextData) {
		$generationOptions = $generationContextData["generationOptions"];
		
		//if (preg_match("/PersonalNumberWithHyphen/", $generationOptions))
			//$self->sep = "-";
		/*else if (preg_match("/PersonalNumberWithoutHyphen/", $generationOptions))
			$self->sep = "";
		else
			$self->sep = "-";		// Default*/

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
		$sum = 0;
		$rand = 0;
		$partSum = 0;
		$q = 0;
		$r = 0;
		
		// Default, 12 siffers + '-'
		// TODO: Option for 12 siffers without '-'
		// TODO: more options? (eg 10 siffers)
		$ccSeparator = self::getPersonalNumberSeparator($options["cc_separator"]);

		$cnt = 13;
		
		for ($i=0; $i<$cnt; $i++) {
			switch ($i) {
				case 2:
					$rand = mt_rand(0, 99);
					$q = (int)($rand / 10);
					$q *= 2;
					if($q >= 10)
						$q = (int)($q / 10) + ($q % 10);
					$r = $rand % 10;
					$partSum = $q + $r;
					$sum += $partSum;
					$new_str .= sprintf("%02d", $rand);
					break;
				case 4: 
					$rand = mt_rand(1, 12);
					$q = (int)($rand / 10);
					$q *= 2;
					if($q >= 10)
						$q = (int)($q / 10) + ($q % 10);
					$r = $rand % 10;
					$partSum = $q + $r;
					$sum += $partSum;
					$new_str .= sprintf("%02d", $rand);
					break;
				case 6:
					$rand = mt_rand(1, 30);
					$q = (int)($rand / 10);
					$q *= 2;
					if($q >= 10)
						$q = (int)($q / 10) + ($q % 10);
					$r = $rand % 10;
					$partSum = $q + $r;
					$sum += $partSum;
					$new_str .= sprintf("%02d", $rand);
					break;
				case 8: 
					//$new_str .= $self->sep;
					$new_str .= $ccSeparator;
					break;
				case 9: 
					$new_str .= "101";
					$sum += 4;
					break;
				case 12:
					$ctrl = (10 - ($sum % 10)) % 10;
					$new_str .= sprintf("%01d", $ctrl);
					break;
				default:
					break;
			}
		}

		return $new_str;
	}

	private static function getPersonalNumberSeparator($separators) {
		$separatorList = explode("|", $separators);
		$chosenSep = $separatorList[rand(0, count($separatorList)-1)];

		// if no separator was entered use '' as default
		if ($separators == "") {
			$chosenSep = "";
		}
		return $chosenSep;
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="PersonalNumberWithoutHyphen">{$this->L["example_PersonalNumberWithoutHyphen"]}</option>
		<option value="PersonalNumberWithHyphen">{$this->L["example_PersonalNumberWithHyphen"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
<span id="dtOptionPersonalNumberSeparator_%ROW%" style="display:inline;">
	{$this->L["separators"]}
	<input type="text" name="dtOptionPersonalNumber_sep_%ROW%" id="dtOptionPersonalNumber_sep_%ROW%" style="width: 78px" value=" " title="{$this->L["separator_help"]}" />
</span>
END;
		return $html;
//		return '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
	}

	/*public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}*/
	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		return array(
			"cc_separator"   => $postdata["dtOptionPersonalNumber_sep_$colNum"],
			"cc_format"      => $postdata["dtOption_$colNum"],
		);
	}

	public function getHelpHTML() {
		$content =<<<EOF
	<p>
		{$this->L["help_text"]}
	</p>

	<table cellpadding="0" cellspacing="1">
	<tr>
		<td width="100"><h4>PersonalNumberWithoutHyphen</h4></td>
		<td>{$this->L["type_PersonalNumberWithoutHyphen"]}</td>
	</tr>
	<tr>
		<td><h4>PersonalNumberWithHyphen</h4></td>
		<td>{$this->L["type_PersonalNumberWithHyphen"]}</td>
	</tr>
	</table>
EOF;

		return $content;
	}

	public function getDataTypeMetadata() {
		$len = 12 + strlen($self->sep);
		return array(
			"SQLField" => "varchar(" . $len . ") default NULL",
			"SQLField_Oracle" => "varchar2(" . $len . ") default NULL",
			"SQLField_MSSQL" => "VARCHAR(" . $len . ") NULL"
		);
	}

}
