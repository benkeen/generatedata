<?php

/**
 * @package DataTypes
 */


class DataType_Rut extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Rut";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 105;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {

		}
	}
	
	public function generate($generator, $generationContextData) {
	}
	
	public function getDataTypeMetadata() {
		return array(
				"SQLField" => "varchar(15) default NULL",
				"SQLField_Oracle" => "varchar2(15) default NULL",
				"SQLField_MSSQL" => "VARCHAR(15) NULL"
		);
	}
	
	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		
		$html =<<<EOF
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="xxxxxxxx-y">12345678-9 ({$this->L["rut_default"]})</option>
		<option value="xxxxxxxx">12345678 ({$this->L["only_number"]})</option>
		<option value="y">9 ({$this->L["only_digit"]})</option>
	</select>
EOF;
		return $html;
	}
	
	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$options = array(
				"thousep" => $json->settings->thousep,
				"upper" => $json->settings->upper
		);
		return $options;
	}
	
	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtThouSep_%ROW%" id="dtThouSep_%ROW%" />
	<label for="dtThouSep_%ROW%">{$this->L["thousands_separator"]}</label><br/>
<input type="checkbox" name="dtUpperDigit%ROW%" id="dtUpperDigit%ROW%" checked="checked" />
	<label for="dtUpperDigit%ROW%">{$this->L["digit_uppercase"]}</label><br/>
<input type="checkbox" name="dtRemoveDash%ROW%" id="dtRemoveDash%ROW%" />
	<label for="dtRemoveDash%ROW%">{$this->L["remove_dash"]}</label>
END;
		return $html;
	}
}
