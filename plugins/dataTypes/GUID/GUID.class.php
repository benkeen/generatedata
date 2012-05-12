<?php


class DataType_GUID extends DataTypePlugin {
  protected $dataTypeName = "GUID";
  protected $dataTypeFieldGroup = "numeric";
  protected $dataTypeFieldGroupOrder = 50;

  private $generatedGUIDs = array();
  private $helpDialogWidth = 460;


  public function generateItem($row, $options, $existingRowData) {
//		global $GUID_generated;

	  $guid = gd_generate_random_alphanumeric_str("HHHHHHHH-HHHH-HHHH-HHHH-HHHH-HHHHHHHH");

	  // pretty sodding unlikely, but just in case!
	  while (in_array($guid, $GUID_generated))
	    $guid = gd_generate_random_alphanumeric_str("HHHHHHHH-HHHH-HHHH-HHHH-HHHH-HHHHHHHH");

	  $GUID_generated[] = $guid;
	  return $guid;
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "varchar(36) NOT NULL";
	      else
	        $info = "varchar2(36) NOT NULL";
	  	  break;
	  }

	  return $info;
  }

  public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["GUID_help"]}</p>"
    );
  }
}