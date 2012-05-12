<?php


class DataType_Region extends DataType {

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

	public function getOptionsColumnHTML($row) {
	}

	public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["LatLng_help"]}</p>"
    );
	}

}