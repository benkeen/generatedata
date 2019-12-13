<?php

/**
 * @package DataTypes
 */

class DataType_CreditCard extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Credit Card Nums";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 110;
	protected $jsModules = array("CreditCard.js");
	protected $cssFiles = array("CreditCard.css");

	// custom member vars for this Data Type
	private $prefixes;
	private $numberLengths;
	private $weights;
	private $creditCardTypeCodes;
	private $creditCardTypes;
	private $totalWeight;


	/**
	 * @param string $runtimeContext "generation" or "ui"
	*/
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
	}

	public function generate($generator, $generationContextData) {
		$creditCardTypeCodes = implode(",",$generationContextData["generationOptions"]["creditCardTypeCodes"]);
		$creditCardTypeCodes = str_replace(",","','",$creditCardTypeCodes);

		self::initCreditCards($creditCardTypeCodes);

		$CCnumber = self::generateRandomCreditCardNumber();

		return array(
			"display" => $CCnumber
		);
	}


	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(16) default NULL",
			"SQLField_Oracle" => "varchar2(16) default NULL",
			"SQLField_MSSQL" => "VARCHAR(16) NULL"
		);
	}

	public function getCreditCards() {
		return $this->creditCards;
	}


	// -------- private member functions ---------

	/**
	 * Called when instantiating the plugin during data generation. Set the credit card types, prefix, number length, weighting.
	 */
	private function initCreditCards($creditCardTypeCodes = null) {
		$this->prefixes    		 		 = array();
		$this->numberLengths   		 = array();
		$this->weights   			 		 = array();
		$this->creditCardTypeCodes = array();
		$this->creditCardTypes 		 = array();
		$this->totalWeight     		 = 0.0;

		$prefix = Core::getDbTablePrefix();

		$query = "SELECT * FROM {$prefix}credit_cards";

		if (!empty($creditCardTypeCodes)) {
			$query .= " WHERE type_code IN ('" . $creditCardTypeCodes . "')";
		}
		$response = Core::$db->query($query);

		if ($response["success"]) {
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$this->creditCardTypeCodes[] = $row["type_code"];
				$this->creditCardTypes[] = $row["type"];
				$this->prefixes[] = $row["prefix"];
				$this->numberLengths[] = $row["number_length"];
				$this->weights[] = $row["weight"];
				$this->totalWeight += $row["weight"];
			}
		}
	}

	/**
	 * Called during data generation. Generates a random, realistic credit card number.
	 */
	private function generateRandomCreditCardNumber() {

		// picks card type, prefix, and number length, at random
		$weightedIndex = mt_rand (0, $this->totalWeight*10) / 10;

		$index = 0;
		$currWeight = $weightedIndex - $this->weights[$index];

		while ($currWeight > 0.0) {
			if ($currWeight <= 0.0) {
				break;
			}
			if ($index == count($this->weights) - 1) {
				break;
			} else {
				$currWeight -= $this->weights[$index];
			}
			$index += 1;
		}


		// generates next [card number length] - [card prefix length] - 1 digits
		$CCdigitsLeft = $this->numberLengths[$index] - strlen(trim($this->prefixes[$index])) - 1;
		$CCremainingDigitsPartial = rand(pow(10, $CCdigitsLeft-1), pow(10, $CCdigitsLeft)-1);
		$CCnumberPartial = $this->prefixes[$index] . $CCremainingDigitsPartial;
		$CCnumberPartialRev = strrev($CCnumberPartial);
		$CCnumberPartialRevArray = str_split($CCnumberPartialRev);

		//Generates last digit that ensures the card number passes Luhn algorithm validation
		$runningSum = 0;

		for ($i = 0; $i < count($CCnumberPartialRevArray); $i++) {
			$CCdigit = intval($CCnumberPartialRevArray[$i]);
			if ($i % 2 == 0) {
				$CCdigit *= 2;
				if ($CCdigit >= 10) {
					$CCdigit -= 9;
				}
			}
			$runningSum += $CCdigit;
		}

		$CClastDigit = strval($runningSum % 10);

		// final card number
		$CCnumber = $CCnumberPartial . $CClastDigit;

		return $CCnumber;
	}


	/**
	 * Called during installation. This creates and populates the cardit_cards DB tables.
	 *
	 * @return array [0] success / error (boolean)
	 *               [1] the error message, if there was an error
	 */
	public static function install() {
		$prefix = Core::getDbTablePrefix();

		// always clear out the previous tables, just in case
		$rollbackQueries = array();
		$rollbackQueries[] = "DROP TABLE {$prefix}credit_cards";
		Core::$db->query($rollbackQueries);

		$queries = array();
		$queries[] = "
			CREATE TABLE {$prefix}credit_cards (
				id mediumint(9) NOT NULL auto_increment,
				type_code char(2) NOT NULL,
				type varchar(20) NOT NULL,
				prefix varchar(6) NOT NULL,
				number_length int,
				weight float,
				PRIMARY KEY (id)
			)
		";
		$queries[] = "
			INSERT INTO {$prefix}credit_cards (type_code, type, prefix, number_length,weight)
			VALUES ('AX','American Express','34',15,0.5),		
			('AX','American Express','37',15,0.5),	
			('VI','Visa','4',16,1.0),	
			('MC','Mastercard','51',16,0.20),	
			('MC','Mastercard','52',16,0.20),					
			('MC','Mastercard','53',16,0.20),			
			('MC','Mastercard','54',16,0.20),	
			('MC','Mastercard','55',16,0.20)";

		$response = Core::$db->query($queries, $rollbackQueries);

		if ($response["success"]) {
			return array(true, "");
		} else {
			return array(false, $response["errorMessage"]);
		}
	}


	/**
	 * Called during getHelpHTML() and getOptionsColumnHTML(). Gets unique credit card types from credit_cards table.
	 */
	private function getDistinctCreditCardTypes() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("SELECT DISTINCT type_code, type FROM {$prefix}credit_cards");

		if ($response["success"]) {
			return $response["results"];
		}

		return false;
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$generationOptions = array(
			"creditCardTypeCodes" => $postdata["dtCreditCardType_$colNum"]
		);
		return $generationOptions;
	}

}
