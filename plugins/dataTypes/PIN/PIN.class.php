<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
 * @package DataTypes
 */
class DataType_PIN extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "PIN";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "credit_card_data";
	protected $dataTypeFieldGroupOrder = 20;


	public function generate($generator, $generationContextData) {
		return array(
			"display" => mt_rand(1111, 9999)
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
