import { GenerationData } from '../../../../types/dataTypes';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = (data: GenerationData) => {

};

export const getMetadata = (): ExportTypeMetadata => ({
    sql: {
        field: 'varchar(30) default NULL',
        field_Oracle: 'varchar2(30) default NULL',
        field_MSSQL: 'VARCHAR(30) NULL'
    }
});


/*
	// $this->cachedMath = array();
	private $cachedMath;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			self::initVars();
		}
	}

    // Valid ranges:
    // Lat: -90 -> + 90
    // Lng: -180 -> +180
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

	public function getRowGenerationOptionsUI($generator, $postdata, $column, $numCols) {
		if (!isset($postdata["dtLatLng_Lat$column"]) && empty($postdata["dtLatLng_Lng$column"])) {
			return false;
		}
		$options = array(
			"lat" => isset($postdata["dtLatLng_Lat$column"]) ? true : false,
			"lng" => isset($postdata["dtLatLng_Lng$column"]) ? true : false
		);
		return $options;
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$options = array(
			"lat" => $json->settings->lat,
			"lng" => $json->settings->lng
		);
		return $options;
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
*/
