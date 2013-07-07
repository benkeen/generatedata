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

		$rangeFrom = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeFrom"]);
		$rangeTo   = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeTo"]);
		$format    = $generationContextData["generationOptions"]["format"];

		$randString = (string) mt_rand($rangeFrom, $rangeTo);
		$randStringRev = strrev($randString);
		$randStringRevLength = strlen($randStringRev);
		$reversedFormat = strrev($format);

		$display = "";

		$randNumIndex = 0;
		for ($i=0; $i<strlen($reversedFormat); $i++) {
			if ($i > $randStringRevLength) {
				break;
			}
			if ($reversedFormat[$i] == "X") {
				$display .= $randStringRev[$randNumIndex];
				$randNumIndex++;
			} else {
				$display .= $reversedFormat[$i];
			}
		}

		$display = strrev($display);

		// if $display begins with a non-digit, we need to prefix it with a zero
		if (preg_match("/\D/", $display[0])) {
			$display = "0" . $display;
		}

		return array(
			"display" => "($randString) $display"
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$generationOptions = array(
			"format"         => $postdata["dtCurrencyFormat_$colNum"],
			"rangeFrom"      => $postdata["dtCurrencyRangeFrom_$colNum"],
			"rangeTo"        => $postdata["dtCurrencyRangeTo_$colNum"],
			"symbol"         => $postdata["dtCurrencySymbol_$colNum"],
			"symbolLocation" => $postdata["dtCurrencySymbolLocation_$colNum"]
		);

		return $generationOptions;
	}


	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%" style="width:98%">
		<option value="">{$L["please_select"]}</option>
		<option value="XXX.XX|0.00|100.00|$|prefix">$0.00 to $100.00</option>
		<option value="XX,XXX|5000|10000|$|prefix">$5,000 to $10,000 (no cents)</option>
		<option value="XXXXX.XX|1000.00|10000.00|$|prefix">$1000.00 to $10000.00 (no thousand delimiters)</option>
		<option value="XXX,XXX.XX|-100000.00|100000.00|$|prefix">-$100,000.00 to $100,000.00</option>
		<option value="X.XX|0.00|100.00||prefix">0.01 to 1.00</option>
		<option value="X.XXX.XXX,XX|100000.00|1000000.00|$|suffix">100.000,00 $ to 1.000.000,00 $</option>
		<option value="XXX XXX|10|100000||prefix">10 to 100 000</option>
	</select>
END;
		return $html;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<div>
	Format: <input type="text" id="dtCurrencyFormat_%ROW%" name="dtCurrencyFormat_%ROW%" style="width:160px" />
</div>
<div>
	Range <input type="text" id="dtCurrencyRangeFrom_%ROW%" name="dtCurrencyRangeFrom_%ROW%" style="width:80px" />
	to <input type="text" id="dtCurrencyRangeTo_%ROW%" name="dtCurrencyRangeTo_%ROW%" style="width:80px" />
</div>
<div>
	Currency symbol
	<input type="text" id="dtCurrencySymbol_%ROW%" name="dtCurrencySymbol_%ROW%" style="width: 20px" />
	<select id="dtCurrencySymbolLocation_%ROW%" name="dtCurrencySymbolLocation_%ROW%">
		<option value="prefix">prefix</option>
		<option value="suffix">suffix</option>
	</select>
</div>

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
