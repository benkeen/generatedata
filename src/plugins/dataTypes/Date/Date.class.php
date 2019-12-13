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
