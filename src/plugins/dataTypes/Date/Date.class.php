<?php

/**
 * @package DataTypes
 */

class DataType_Date extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Date";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("Date.js");
	private static $useSafeDates = false;
	private $formatCode;


	public function __construct($runtimeContext) {
        parent::__construct($runtimeContext);
		$customPluginSettings = Core::getPluginSettings(Constants::PLUGIN_DATA_TYPE, "Date");
		if (isset($customPluginSettings["useSafeDates"]) && $customPluginSettings["useSafeDates"]) {
			self::$useSafeDates = true;
		}
	}

	/**
	 * This is verbose because some Windows systems don't properly generate dates before 1970 or after 2038. See:
	 * 		https://github.com/benkeen/generatedata/issues/246
	 * 		http://stackoverflow.com/questions/5879173/why-do-timestamps-have-a-limit-to-2038
	 * @param object $generator
	 * @param array $generationContextData
	 * @return array
	 */
	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		$displayValue = "";
		if (self::$useSafeDates) {
			$displayValue = $this->getSafeDate($options);
		} else {
			$displayValue = $this->getDate($options);
		}

		return array(
			"display" => $displayValue
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dtFromDate_$colNum"]) || empty($postdata["dtToDate_$colNum"]) || empty($postdata["dtOption_$colNum"])) {
			return false;
		}	
		$this->formatCode = $postdata["dtOption_$colNum"];
		$options = array(
			"formatCode" => $postdata["dtOption_$colNum"],
			"from"       => $postdata["dtFromDate_$colNum"],
			"to"         => $postdata["dtToDate_$colNum"]
		);

		return $options;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$this->formatCode = $json->settings->placeholder;
		$options = array(
			"formatCode" => $json->settings->placeholder,
			"from"       => $json->settings->fromDate,
			"to"         => $json->settings->toDate
		);
		return $options;
	}

	public function getDataTypeMetadata() {
		return array(
			"type" => "date",
			"formatCode" => $this->formatCode,
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255)"
		);
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<<END
			<select id="dtExample_%ROW%">
				<option value="">{$L["please_select"]}</option>
				<option value="M j, Y">Jan 1, 2012</option>
				<option value="F jS, Y">January 1st, 2012</option>
				<option value="D, M d">Mon, Jan 01</option>
				<option value="D, jS, Y">Mon, Jan 1st, 2012</option>
				<option value="m.d.y">03.25.06</option>
				<option value="m-d-y">03-25-06</option>
				<option value="m/d/y">03/25/06</option>
				<option value="m/d/Y">03/25/2012</option>
				<option value="d.m.y">25.03.06</option>
				<option value="d-m-y">25-03-06</option>
				<option value="d/m/y">25/03/06</option>
				<option value="d/m/Y">25/03/2012</option>
				<option value="Y-m-d H:i:s">MySQL datetime</option>
				<option value="U">UNIX timestamp</option>
				<option value="c">ISO 8601 date</option>
				<option value="r">RFC 2822 formatted date</option>
				<option value="T">A timezone</option>
			</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$nextYear = date("m/d/Y", mktime(0, 0, 0, date("m"), date("d"), date("Y")+1));
		$lastYear = date("m/d/Y", mktime(0, 0, 0, date("m"), date("d"), date("Y")-1));

		$html =<<< END
	{$this->L["from"]} <input type="text" name="dtFromDate_%ROW%" id="dtFromDate_%ROW%" size="10" value="$lastYear" readonly="readonly" />
	{$this->L["to"]} <input type="text" name="dtToDate_%ROW%" id="dtToDate_%ROW%" size="10" value="$nextYear" readonly="readonly" />
	<div>
		{$this->L["format_code"]}&nbsp;<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 160px" />
	</div>
END;

		return $html;
	}

	public function getHelpHTML() {
		$html =<<<END
			<p>
				{$this->L["help_intro"]}
			</p>

			<table cellpadding="0" cellspacing="1">
			<tr>
				<td width="50"><h2>{$this->L["char"]}</h2></td>
				<td width="300"><h2>{$this->L["description"]}</h2></td>
				<td><h2>{$this->L["example"]}</h2></td>
			</tr>
			</table>
			<hr size="1" />

			<h3 class="gdSubtitle">{$this->L["day"]}</h3>
			<hr size="1" />

			<table cellpadding="0" cellspacing="1">
			<tr>
				<td width="50"><h4>d</h4></td>
				<td width="300">{$this->L["help_d"]}</td>
				<td>{$this->L["help_d_example"]}</td>
			</tr>
			<tr>
				<td><h4>D</h4></td>
				<td>{$this->L["help_D"]}</td>
				<td>{$this->L["help_D_example"]}</td>
			</tr>
			<tr>
				<td><h4>j</h4></td>
				<td>{$this->L["help_j"]}</td>
				<td>{$this->L["help_j_example"]}</td>
			</tr>
			<tr>
				<td><h4>l</h4></td>
				<td>{$this->L["help_l"]}</td>
				<td>{$this->L["help_l_example"]}</td>
			</tr>
			<tr>
				<td valign="top"><h4>S</h4></td>
				<td>{$this->L["help_S"]}</td>
				<td valign="top">{$this->L["help_S_example"]}</td>
			</tr>
			<tr>
				<td valign="top"><h4>w</h4></td>
				<td valign="top">{$this->L["help_w"]}</td>
				<td valign="top">{$this->L["help_w_example"]}</td>
			</tr>
			<tr>
				<td><h4>z</h4></td>
				<td>{$this->L["help_z"]}</td>
				<td>{$this->L["help_z_example"]}</td>
			</tr>
			</table>

			<h3 class="gdSubtitle">{$this->L["week"]}</h3>
			<hr size="1" />

			<table cellpadding="0" cellspacing="1">
			<tr>
				<td width="50" valign="top"><h4>W</h4></td>
				<td width="300" valign="top">{$this->L["help_W"]}</td>
				<td valign="top">{$this->L["help_W_example"]}</td>
			</tr>
			</table>

			<h3 class="gdSubtitle">{$this->L["month"]}</h3>
			<hr size="1" />

			<table cellpadding="0" cellspacing="1">
			<tr>
				<td width="50" valign="top"><h4>F</h4></td>
				<td width="300">{$this->L["help_F"]}</td>
				<td valign="top">{$this->L["help_F_example"]}</td>
			</tr>
			<tr>
				<td><h4>m</h4></td>
				<td>{$this->L["help_m"]}</td>
				<td>{$this->L["help_m_example"]}</td>
			</tr>
			<tr>
				<td><h4>M</h4></td>
				<td>{$this->L["help_M"]}</td>
				<td>{$this->L["help_M_example"]}</td>
			</tr>
			<tr>
				<td valign="top"><h4>n</h4></td>
				<td>{$this->L["help_n"]}</td>
				<td valign="top">{$this->L["help_n_example"]}</td>
			</tr>
			<tr>
				<td><h4>t</h4></td>
				<td>{$this->L["help_t"]}</td>
				<td>{$this->L["help_t_example"]}</td>
			</tr>
			</table>


			<h3 class="gdSubtitle">{$this->L["year"]}</h3>
			<hr size="1" />

			<table cellpadding="0" cellspacing="1">
			<tr>
				<td width="50"><h4>L</h4></td>
				<td width="300">{$this->L["help_L"]}</td>
				<td>{$this->L["help_L_example"]}</td>
			</tr>
			<tr>
				<td><h4>Y</h4></td>
				<td>{$this->L["help_Y"]}</td>
				<td>{$this->L["help_Y_example"]}</td>
			</tr>
			<tr>
				<td><h4>y</h4></td>
				<td>{$this->L["help_y"]}</td>
				<td>{$this->L["help_y_example"]}</td>
			</tr>
			</table>

			<br />
END;

		return $html;
	}


	private function getSafeDate($options) {

		// convert the From and To dates to datetimes
		list($fromMonth, $fromDay, $fromYear) = explode("/", $options["from"]);
		list($toMonth, $toDay, $toYear) = explode("/", $options["to"]);

		$randYear = mt_rand($fromYear, $toYear);
		$randMonth = mt_rand(1, 12);

		// special handling if month is limited due to selected date
		if ($randYear == $fromYear || $randYear == $toYear) {
			if ($fromYear == $toYear) {
				$randMonth = mt_rand($fromMonth, $toMonth);
			} elseif ($randYear == $fromYear) {
				$randMonth = mt_rand($fromMonth, 12);
			} elseif ($randYear == $toYear) {
				$randMonth = mt_rand(1, $toMonth);
			}
		}

		// select date based on month
		$dayLow = 1;
		$dayHigh = 31;
		if ($randMonth == 2) {

			// accommodating leap years
			$dayHigh = 28;
			if ($randYear % 4 === 0) {
				if ($randYear % 100 !== 0) {
					$dayHigh = 29;
				} else {
					if ($randYear % 400 === 0) {
						$dayHigh = 29;
					}
				}
			}

		} else if (in_array($randMonth, array(2, 4, 6, 9, 11))) {
			$dayHigh = 30;
		}

		// special handling due to selected month
		if ($randMonth == $fromMonth) {
			$dayLow = $fromDay;
		};
		if ($randMonth == $toMonth) {
			$dayHigh = $toDay;
		}

		// day within the limits
		$randDay = mt_rand($dayLow, $dayHigh);

		$returnVal = "";
		if ($randYear >= 1970 and $randYear <= 2038) {
			$randDate = mktime(0, 0, 0, $randMonth, $randDay, $randYear);
			$date = date($options["formatCode"], $randDate);
			$returnVal = "{$date}";
		} else {
			if ($randDay <= 9) {
				$randDay = "0{$randDay}";
			}
			if ($randMonth <= 9) {
				$randMonth = "0{$randMonth}";
			}
			$returnVal = "{$randDay}/{$randMonth}/{$randYear}";
		}

		return $returnVal;
	}


	private function getDate($options) {
		list($month, $day, $year) = explode("/", $options["from"]);
		$fromDate = mktime(0, 0, 0, $month, $day, $year);
		list($month, $day, $year) = explode("/", $options["to"]);
		$toDate = mktime(23, 59, 59, $month, $day, $year);

		// randomly pick a date between those dates
		$randDate = mt_rand($fromDate, $toDate);

		// display the new date in the value specified
		return date($options["formatCode"], $randDate);
	}
}
