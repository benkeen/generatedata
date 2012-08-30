<?php


class DataType_Region extends DataTypePlugin {
	protected $dataTypeName = "State / Province / County";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	private $helpDialogWidth = 360;


	public function generateItem($row, $options, $existingRowData) {
	}

	public function getExportTypeInfo($exportType, $options) {
	}

	public function getTemplateOptions($postdata, $column, $numCols) {
	}

	public function getOptionsColumnHTML() {
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["help_text"]}</p>"
		);
	}

}
