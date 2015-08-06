<?php

/**
 * @package DataTypes
 */

class DataType_OrganisationNumber extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "OrganisationNumber";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 111;
	protected $jsModules = array("OrganisationNumber.js");
	private $generatedOrgNrs = array();
	// Separator in personal number
	// static $sep = "-";


	/**
	 * Generate a random personal number, and return the display string and additional meta data for use
	 * by any other Data Type.
	 */
	public function generate($generator, $generationContextData) {
		$generationOptions = $generationContextData["generationOptions"];
		
		// Default, 10 siffers + '-'
		// TODO: Option for 10 siffers without '-'
		// TODO: support several countries?
		$ccSeparator = '-'; //self::getOrganisationNumberSeparator($options["cc_separator"]);

		$orgnr = $this->generateRandomSwedishOrganisationNumber($ccSeparator);

		// pretty sodding unlikely, but just in case!
		while (in_array($orgnr, $this->generatedOrgNrs)) {
			$orgnr = $this->generateRandomSwedishOrganisationNumber($ccSeparator);
		}
		$this->generatedOrgNrs[] = $orgnr;
		return array(
			"display" => $orgnr
		);
	}
	
	// TODO: add support for separator
	// TODO: add support for organisation numbers
	private static function generateRandomSwedishOrganisationNumber($sep) {
		$new_str = "";
		$rand = 0;

		$cnt = 11;	// 10 siffers + 1 increment for separator
		
		for ($i=0; $i<$cnt; $i++) {
			switch ($i) {
				case 0:
					$rand = mt_rand(0, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 2: 
					$rand = mt_rand(20, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 4:
					$rand = mt_rand(0, 99);
					$new_str .= sprintf("%02d", $rand);
					break;
				case 6: 
					//$new_str .= $self->sep;
					$new_str .= $sep;
					break;
				case 7: 
					$rand = mt_rand(0, 999);
					$new_str .= sprintf("%03d", $rand);
					break;
				case 10:
					// Same calculation as for personal numbers
					// TODO: move to Utils??
					$ctrl = DataType_PersonalNumber::recalcCtrl($new_str . "0", "-");
					$new_str .= sprintf("%01d", $ctrl);
					break;
				default:
					break;
			}
		}

		return $new_str;
	}
	


	private static function getOrganisationNumberSeparator($separators) {
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
		<option value="OrganisationNumberWithoutHyphen">{$this->L["example_OrganisationNumberWithoutHyphen"]}</option>
		<option value="OrganisationNumberWithHyphen">{$this->L["example_OrganisationNumberWithHyphen"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
<span id="dtOptionOrganisationNumberSeparator_%ROW%" style="display:inline;">
	{$this->L["separators"]}
	<input type="text" name="dtOptionOrganisationNumber_sep_%ROW%" id="dtOptionOrganisationNumber_sep_%ROW%" style="width: 78px" value=" " title="{$this->L["separator_help"]}" />
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
			"cc_separator"   => $postdata["dtOptionOrganisationNumber_sep_$colNum"],
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
		<td width="100"><h4>OrganisationNumberWithoutHyphen</h4></td>
		<td>{$this->L["type_OrganisationNumberWithoutHyphen"]}</td>
	</tr>
	<tr>
		<td><h4>OrganisationNumberWithHyphen</h4></td>
		<td>{$this->L["type_OrganisationNumberWithHyphen"]}</td>
	</tr>
	</table>
EOF;

		return $content;
	}

	public function getDataTypeMetadata() {
		// TODO use selected separator
		//$len = 10 + strlen($self->sep);
		$len = 11;
		return array(
			"SQLField" => "varchar(" . $len . ") default NULL",
			"SQLField_Oracle" => "varchar2(" . $len . ") default NULL",
			"SQLField_MSSQL" => "VARCHAR(" . $len . ") NULL"
		);
	}

}
