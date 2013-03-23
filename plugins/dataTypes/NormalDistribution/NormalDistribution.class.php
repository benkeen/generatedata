<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_NormalDistribution extends DataTypePlugin {

	/**#@+
     * @access protected
     */
	protected $isEnabled = false;
	protected $dataTypeName = "Standard Normal Distribution";
	protected $dataTypeFieldGroup = "math";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("NormalDistribution.js");
	protected $randMax = null;


	public function generate($generator, $generationContextData) {
		$mean  = (float) $generationContextData["generationOptions"]["mean"];
		$sigma = (float) $generationContextData["generationOptions"]["sigma"];
		$randNum = $this->getNormallyDistributedRandomNum();
		$num = ($randNum * $sigma) + $mean;

		return array(
			"display" => $num
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if ((empty($postdata["dtOptionMean_$colNum"]) && $postdata["dtOptionMean_$colNum"] !== "0") ||
			(empty($postdata["dtOptionSigma_$colNum"]) && $postdata["dtOptionSigma_$colNum"] !== "0")) {
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
				<input type="text" name="dtOptionMean_%ROW%" id="dtOptionMean_%ROW%" style="width: 30px" value="0" />
			<label for="dtOptionSigma_%ROW%">Standard Deviation</label>
				<input type="text" name="dtOptionSigma_%ROW%" id="dtOptionSigma_%ROW%" style="width: 30px" value="10" />
END;

		return $options;
	}


	// returns random number with normal distribution
	public function getNormallyDistributedRandomNum() {
		$num1 = $this->getRandomNum();
		$num2 = $this->getRandomNum();
		return sqrt(-2 * log($num1)) * cos(2 * pi() * $num2);
	}

	// returns a random float from 0 to 1
	public function getRandomNum() {
		return (float) rand() / $this->randMax;
	}
}