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

	// meh. All this string manipulation code could be improved, I'm sure
	public function generate($generator, $generationContextData) {

		$rangeFrom    = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeFrom"]);
		$rangeTo      = preg_replace("/\D/", "", $generationContextData["generationOptions"]["rangeTo"]);
		$format       = $generationContextData["generationOptions"]["format"];
		$dollarSymbol = $generationContextData["generationOptions"]["symbol"];
		$dollarSymbolLocation = $generationContextData["generationOptions"]["symbolLocation"];

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

		// if it's under 1 dollar (or whatever) and has cents, we need to fix really small generated
		// nums. Pretty feeble logic here, and I'm not 100% sure this will work for all currency formats
		$hasCents = preg_match("/\D/", $format[strlen($format)-3]);
		$numChars = strlen($display);
		if ($hasCents && $numChars < 4) {
			$truncatedFormat = preg_replace("/X/", "0", substr($format, -4));

			if ($numChars === 0) {
				$display = $truncatedFormat;
			} else if ($numChars == 1) {
				$display = substr($truncatedFormat, 0, 3) . $display;
			} else if ($numChars == 2) {
				$display = substr($truncatedFormat, 0, 2) . $display;
			} else if ($numChars == 3) {
				$display = "0" . $display;
			}
		}

		// if $display begins with a non-digit, we need to prefix it with a zero
		if (preg_match("/\D/", $display[0])) {
			$display = "0" . $display;
		}

		// apply the dollar symbol
		if (!empty($dollarSymbol)) {
			if ($dollarSymbolLocation == "prefix") {
				$display = $dollarSymbol . $display;
			} else {
				$display = $display . $dollarSymbol;
			}
		}

		return array(
			"display" => $display
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
		<optgroup label="US/Canada">
			<option value="XXX.XX|0.00|100.00|$|prefix">$0.00 -> $100.00</option>
			<option value="XX,XXX|5000|10000|$|prefix">$5,000 -> $10,000 ({$this->L["no_cents"]})</option>
			<option value="XXXXX.XX|1000.00|10000.00|$|prefix">$1000.00 -> $10000.00 ({$this->L["no_thousand_delimiters"]})</option>
			<option value="XXX,XXX.XX|-100000.00|100000.00|$|prefix">-$100,000.00 -> $100,000.00</option>
			<option value="X.XX|0.00|100.00||prefix">0.01 -> 1.00 ({$this->L["no_dollar_sign"]})</option>
			<option value="X.XXX.XXX,XX|100.00|1000.00|$|suffix">100,00 $ -> 1.000,00 $ (French Canadian)</option>
			<option value="XXX XXX|10|100000||prefix">10 -> 100 000</option>
		</optgroup>
		<optgroup label="UK">
			<option value="XXX.XX|0.00|100.00|£|prefix">£0.00 -> £100.00</option
		</optgroup>
		<optgroup label="Euro">
			<option value="XXX,XXX|100000|200000|€|prefix">€100,000 -> €200,000</option
		</optgroup>
	</select>
END;
		return $html;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<div>
	{$this->L["format"]}: <input type="text" id="dtCurrencyFormat_%ROW%" name="dtCurrencyFormat_%ROW%" style="width:160px" />
</div>
<div>
	{$this->L["range"]} <input type="text" id="dtCurrencyRangeFrom_%ROW%" name="dtCurrencyRangeFrom_%ROW%" style="width:80px" />
	{$this->L["to"]} <input type="text" id="dtCurrencyRangeTo_%ROW%" name="dtCurrencyRangeTo_%ROW%" style="width:80px" />
</div>
<div>
	{$this->L["currency_symbol"]}
	<input type="text" id="dtCurrencySymbol_%ROW%" name="dtCurrencySymbol_%ROW%" style="width: 20px" />
	<select id="dtCurrencySymbolLocation_%ROW%" name="dtCurrencySymbolLocation_%ROW%">
		<option value="prefix">{$this->L["prefix"]}</option>
		<option value="suffix">{$this->L["suffix"]}</option>
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

	public function getHelpHTML() {
		$content =<<<EOF
	<p>
		{$this->L["help_intro"]}
	</p>

	<table cellpadding="0" cellspacing="1">
	<tr>
		<td width="120" valign="top"><h4>{$this->L["format"]}</h4></td>
		<td>{$this->L["format_desc"]}</td>
	</tr>
	<tr>
		<td valign="top"><h4>{$this->L["range_from"]}</h4></td>
		<td>{$this->L["range_from_desc"]}</td>
	</tr>
	<tr>
		<td valign="top"><h4>{$this->L["range_to"]}</h4></td>
		<td>{$this->L["range_to_desc"]}</td>
	</tr>
	<tr>
		<td valign="top"><h4>{$this->L["currency_symbol"]}</h4></td>
		<td>{$this->L["currency_symbol_desc"]}</td>
	</tr>
	<tr>
		<td valign="top"><h4>{$this->L["prefix_suffix"]}</h4></td>
		<td>{$this->L["prefix_suffix_desc"]}</td>
	</tr>
	</table>
EOF;

		return $content;
	}
}
