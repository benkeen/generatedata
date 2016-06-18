<?php

/**
 * @package DataTypes
 */

class DataType_SocialSecurityNumber extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "SocialSecurityNumber";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 130;
	private $generatedSSNs = array();


	/**
	 * Generates a random social security number and returns it.
	 */
	public function generate($generator, $generationContextData) {
		$ssn = "";
		while ($ssn === "" || array_key_exists($ssn, $this->generatedSSNs)) {
			$ssn = str_pad(mt_rand(1, 899), 3, "0", STR_PAD_LEFT) . "-" .
					   str_pad(mt_rand(1, 99), 2, "0", STR_PAD_LEFT) . "-" .
				     str_pad(mt_rand(1, 998), 4, "0", STR_PAD_LEFT);
		}
		$this->generatedSSNs[$ssn] = true;

		return array(
			"display" => $ssn
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(9) default NULL",
			"SQLField_Oracle" => "varchar2(9) default NULL",
			"SQLField_MSSQL" => "VARCHAR(9) NULL"
		);
	}

}
