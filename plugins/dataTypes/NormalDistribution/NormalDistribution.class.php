<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_NormalDistribution extends DataTypePlugin {

	/**#@+
     * @access protected
     */
	protected $isEnabled = true;
	protected $dataTypeName = "Standard Normal Distribution";
	protected $dataTypeFieldGroup = "math";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("NormalDistribution.js");
	protected $randMax = null;


	public function generate($generator, $generationContextData) {
		$mean   = (float) $generationContextData["generationOptions"]["mean"];
		$stddev = (float) $generationContextData["generationOptions"]["stddev"];

		return array(
			"display" => $this->gauss_ms($mean, $stddev)
		);
	}


	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if ((empty($postdata["dtOptionMean_$colNum"]) && $postdata["dtOptionMean_$colNum"] !== "0") ||
			(empty($postdata["dtOptionSigma_$colNum"]) && $postdata["dtOptionSigma_$colNum"] !== "0")) {
			return false;
		}
		$this->randMax = (float) getrandmax();

		return array(
			"mean"   => $postdata["dtOptionMean_$colNum"],
			"stddev" => $postdata["dtOptionSigma_$colNum"]
		);
	}

	public function getOptionsColumnHTML() {
		$options =<<< END
			<label for="dtOptionMean_%ROW%">{$this->L["mean"]}</label>
				<input type="text" name="dtOptionMean_%ROW%" id="dtOptionMean_%ROW%" style="width: 30px" value="0" />
			<label for="dtOptionSigma_%ROW%">{$this->L["standard_deviation"]}</label>
				<input type="text" name="dtOptionSigma_%ROW%" id="dtOptionSigma_%ROW%" style="width: 30px" value="1" />
END;

		return $options;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100)"
		);
	}

	//  returns random number using mt_rand() with a flat distribution from -1 to 1 inclusive
	public function random_PN() {
		return (2.0 * $this->random_0_1()) - 1.0;
	}

	public function random_0_1() {
		return (float) mt_rand() / (float) mt_getrandmax() ;
	}

	public function gauss() {
		static $useExists = false;
		static $useValue;

		if ($useExists) {
			//  Use value from a previous call to this function
			$useExists = false;
			return $useValue;
		} else {
			//  Polar form of the Box-Muller transformation
			$w = 2.0 ;
			while (($w >= 1.0) || ($w == 0.0)) {
				$x = $this->random_PN();
				$y = $this->random_PN();
				$w = ($x * $x) + ($y * $y);
			}
			$w = sqrt((-2.0 * log($w)) / $w);

			//  Set value for next call to this function
			$useValue = $y * $w;
			$useExists = true;

			return $x * $w;
		}
	}

	public function gauss_ms($mean, $stddev) {
		//  Adjust our gaussian random to fit the mean and standard deviation
		//  The division by 4 is an arbitrary value to help fit the distribution
		//      within our required range, and gives a best fit for $stddev = 1.0
		return $this->gauss() * ($stddev / 4) + $mean;
	}
}