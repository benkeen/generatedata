<?php

/**
 * @package DataTypes
 *
 * @author Emil Moe <emil@moegroup.dk>
 */

class DataType_Boolean extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Boolean";
	protected $dataTypeFieldGroup = "math";
	protected $dataTypeFieldGroupOrder = 50;

	public function generate($generator, $generationContextData) {
		return ['display' => true];
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}

	public function getDataTypeMetadata() {
		return array(
			"type" => "boolean"
		);
	}
}