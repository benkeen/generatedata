<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_Currency extends DataTypePlugin {
	protected $dataTypeName = "Currency";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 60;
	protected $jsModules = array("Currency.js");

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {

		}
	}

	public function generate($generator, $generationContextData) {
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%" style="width:100%">
		<option value="">{$L["please_select"]}</option>
		<option value="XXX.XX|0.00|100.00|$|prefix">$100.00 - between $0.00 to $100.00</option>
		<option value="">$1000 - between $50 to $1000 (no cents)</option>
		<option value="">$1,000.00 - between $100.00 to $1,000.00</option>
		<option value="">$100,000.00 - between -$1,000.00 to $100,000.00</option>
		<option value="">1.00 - between -$0.01 to $1.00 (no dollar sign)</option>
		<option value="">1.00 - between -$0.01 to $1.00 (no dollar sign)</option>
	</select>
END;
		return $html;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<div>Format: [xxx,xxx,xxx,xxx.xx]</div>
<div>Range: [xxx] to [xxx]</div>
<duv>Currency symbol [$] ( ) prefix ( ) suffix</div>

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
}
