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
	protected $dataTypeName = "Normal Distribution";
	protected $dataTypeFieldGroup = "math";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("NormalDistribution.js");
	protected $randMax = null;


	public function generate($generator, $generationContextData) {
		$mean  = $generationContextData["mean"];
		$sigma = $generationContextData["sigma"];

		return array(
			"display" => $this->gauss($mean, $sigma)
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (!isset($postdata["dtOptionMean_$colNum"]) || empty($postdata["dtOptionMean_$colNum"]) ||
			!isset($postdata["dtOptionSigma_$colNum"]) || empty($postdata["dtOptionSigma_$colNum"])) {
			return false;
		}

		$this->randMax = (float) getrandmax();

		return array(
			"mean"  => $postdata["dtOptionMean_$colNum"],
			"sigma" => $postdata["dtOptionSigma_$colNum"]
		);
	}

	public function getOptionsColumnHTML() {
		$options =<<< END
			<label for="dtOptionMean_%ROW%">Mean</label>
				<input type="text" name="dtOptionMean_%ROW%" id="dtOptionMean_%ROW%" style="width: 30px" value="45" />
			<label for="dtOptionSigma_%ROW%">Sigma</label>
				<input type="text" name="dtOptionSigma_%ROW%" id="dtOptionSigma_%ROW%" style="width: 30px" value="10" />
END;

		return $options;
	}

	// N(m,s)
	// returns random number with normal distribution:
	//    mean=m
	//    std dev=s
	public function gauss_ms($m = 0.0, $s = 1.0) {
		return $this->gauss() * $s + $m;
	}

	public function gauss() {
		// N(0,1)
		// returns random number with normal distribution:
		//    mean = 0
		//    std dev = 1

		// auxilliary vars
		$x = $this->random_0_1();
		$y = $this->random_0_1();

		// two independent variables with normal distribution N(0,1)
		$u = sqrt(-2 * log($x)) * cos(2 * pi() * $y);
//		$v = sqrt(-2 * log($x)) * sin(2 * pi() * $y);

		// i will return only one, couse only one needed
		return $u;
	}

	// auxilliary function
	// returns random number with flat distribution from 0 to 1
	public function random_0_1() {
		return (float) rand() / $this->randMax;
	}
}