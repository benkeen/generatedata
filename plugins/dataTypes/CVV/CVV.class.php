<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 */
class DataType_CVV extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "CVV";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 30;


	public function generate($generator, $generationContextData) {
		return array(
			"display" => rand(111, 999)
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255)",
			"SQLField_Oracle" => "varchar2(255)",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}
}