<?php

/**
 * @package DataTypes
 */

class DataType_LatLng extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Latitude / Longitude";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 100;
	protected $jsModules = array("LatLng.js");

	// $this->cachedMath = array();
	private $helpDialogWidth = 410;
	private $cachedMath;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			self::initVars();
		}
	}

	/**
	 * Valid ranges:
	 *   Lat: -90 -> + 90
	 *   Lng: -180 -> +180
	 */
	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		$info = array();
		if ($options["lat"] && $options["lng"]) {
			$info[] = (mt_rand($this->cachedMath["minLatCalc"], $this->cachedMath["maxLatCalc"]) / $this->cachedMath["divisor"]);
			$info[] = (mt_rand($this->cachedMath["minLngCalc"], $this->cachedMath["maxLngCalc"]) / $this->cachedMath["divisor"]);
		} else if ($options["lat"]) {
			$info[] = (mt_rand($this->cachedMath["minLatCalc"], $this->cachedMath["maxLatCalc"]) / $this->cachedMath["divisor"]);
		} else if ($options["lng"]) {
			$info[] = (mt_rand($this->cachedMath["minLngCalc"], $this->cachedMath["maxLngCalc"]) / $this->cachedMath["divisor"]);
		}

		return array(
			"display" => join(", ", $info)
		);
	}


	public function getRowGenerationOptions($generator, $postdata, $column, $numCols) {
		if (!isset($postdata["dtLatLng_Lat$column"]) && empty($postdata["dtLatLng_Lng$column"])) {
			return false;
		}
		$options = array(
			"lat" => isset($postdata["dtLatLng_Lat$column"]) ? true : false,
			"lng" => isset($postdata["dtLatLng_Lng$column"]) ? true : false
		);
		return $options;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtLatLng_Lat%ROW%" id="dtLatLng_Lat%ROW%" checked="checked" />
	<label for="dtLatLng_Lat%ROW%">{$this->L["latitude"]}</label>&nbsp;
<input type="checkbox" name="dtLatLng_Lng%ROW%" id="dtLatLng_Lng%ROW%" checked="checked" />
	<label for="dtLatLng_Lng%ROW%">{$this->L["longitude"]}</label>
END;
		return $html;
	}


	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(30) default NULL",
			"SQLField_Oracle" => "varchar2(30) default NULL",
			"SQLField_MSSQL" => "VARCHAR(30) NULL"
		);
	}

	private function initVars() {
		// to 5 D.P. Arbitrary - should be configurable, but it should be good enough for most cases
		$decimalPlaces = 5;
		$this->cachedMath = array(
			"minLatCalc" => -90 * (pow(10, $decimalPlaces)),
			"maxLatCalc" => 90 * (pow(10, $decimalPlaces)),
			"minLngCalc" => -180 * (pow(10, $decimalPlaces)),
			"maxLngCalc" => 180 * (pow(10, $decimalPlaces)),
			"divisor"    => pow(10, $decimalPlaces)
		);
	}
}
