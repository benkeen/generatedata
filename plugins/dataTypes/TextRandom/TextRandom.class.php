<?php

class DataType_TextRandom extends DataTypePlugin {
  protected $dataTypeName = "Random Number of Words";
  protected $dataTypeFieldGroup = "text";
  protected $dataTypeFieldGroupOrder = 20;

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