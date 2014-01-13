<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_PAN extends DataTypePlugin {

	/**#@+
	 * @access protected
	 */
	protected $isEnabled = true;
	protected $dataTypeName = "PAN";
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("PAN.js");


	public function generate($generator, $generationContextData) {
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="mastercard">{$this->L["mastercard"]}</option>
		<option value="visa">{$this->L["visa"]}</option>
		<option value="visa_electron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carte_blanche">{$this->L["carte_blanche"]}</option>
		<option value="diners_club_international">{$this->L["diners_club_international"]}</option>
		<option value="enroute">{$this->L["enroute"]}</option>
		<option value="jcb">{$this->L["jcb"]}</option>
		<option value="maestro">{$this->L["maestro"]}</option>
		<option value="solo">{$this->L["solo"]}</option>
		<option value="switch">{$this->L["switch"]}</option>
		<option value="laser">{$this->L["laser"]}</option>
		<option value="rand_card">{$this->L["rand_card"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
<div id="Card_digit_\$ROW\$" style="display:inline;">
	{$this->L["digits"]}
	<input type="text" name="digit_\$ROW\$" id="digit_\$ROW\$" style="width: 60px" readonly="readonly"/>
</div>

<div id="Card_seperator_\$ROW\$" style="display:inline;">
	{$this->L["seperators"]}
	<input type="text" name="sep_\$ROW\$" id="sep_\$ROW\$" style="width: 78px" value="C|A|P|D|H|S" title="C : Colon (:)\nA : Asterik (*)\nP : Pipe (|)\nD : Dot (.)\nH : Hyphen (-)\nS : Space ( )"/>
</div>

<div id="Card_format_\$ROW\$">
	{$this->L["ccformats"]}
	<textarea name="option_\$ROW\$" id="option_\$ROW\$" title="{$this->L["format_title"]}" style="height: 100px; width: 260px"></textarea>
</div>

<div id="Card_rand_select_\$ROW\$" style="display:none;">
	{$this->L["ccrandom"]}
	<select multiple="multiple" name="option_mselect_\$ROW\$[]" id="option_mselect_\$ROW\$" title="{$this->L["rand_brand_title"]}" style="height: 100px; width: 260px">
		<option value="mastercard">{$this->L["mastercard"]}</option>
		<option value="visa">{$this->L["visa"]}</option>
		<option value="visa_electron">{$this->L["visa_electron"]}</option>
		<option value="amex">{$this->L["americanexpress"]}</option>
		<option value="discover">{$this->L["discover"]}</option>
		<option value="carte_blanche">{$this->L["carte_blanche"]}</option>
		<option value="diners_club_international">{$this->L["diners_club_international"]}</option>
		<option value="enroute">{$this->L["enroute"]}</option>
		<option value="jcb">{$this->L["jcb"]}</option>
		<option value="maestro">{$this->L["maestro"]}</option>
		<option value="solo">{$this->L["solo"]}</option>
		<option value="switch">{$this->L["switch"]}</option>
		<option value="laser">{$this->L["laser"]}</option>
	</select>
</div>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
	}

	public function getHelpHTML() {
		$html =<<<EOF
<p>
	{$this->L["pan_help_intro"]}
</p>

<table cellpadding="0" cellspacing="1">
<tr>
	<td>{$this->L["mastercard"]}</td>
	<td>{$this->L["visa13"]}</td>
</tr>
<tr>
	<td>{$this->L["visa16"]}</td>
	<td>{$this->L["americanexpress"]}</td>
</tr>
<tr>
	<td>{$this->L["discover"]}</td>
	<td>{$this->L["american_diners"]}</td>
</tr>
<tr>
	<td>{$this->L["carte_blanche"]}</td>
	<td>{$this->L["diners_club_international"]}</td>
</tr>
<tr>
	<td>{$this->L["enroute"]}</td>
	<td>{$this->L["jcb15"]}</td>
</tr>
<tr>
	<td>{$this->L["jcb16"]}</td>
	<td>{$this->L["maestro"]}</td>
</tr>
<tr>
	<td>{$this->L["solo"]}</td>
	<td></td>
</tr>
</table>
EOF;

		return $html;
	}
}