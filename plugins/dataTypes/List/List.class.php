<?php

class DataType_List extends DataTypePlugin {
  protected $dataTypeName = "Custom List";
  protected $dataTypeFieldGroup = "geo";
  protected $dataTypeFieldGroupOrder = 180;

  private $helpDialogWidth = 360;


  public function generateItem($row, $options, $existingRowData) {
  }

  public function getExportTypeInfo($exportType, $options) {
  }

	public function getTemplateOptions($postdata, $column, $numCols) {
	}

  public function getExampleColumnHTML($row) {
  }

	public function getOptionsColumnHTML($row) {
	}

	public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["LatLng_help"]}</p>"
    );
	}
}