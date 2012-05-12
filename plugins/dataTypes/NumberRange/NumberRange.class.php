<?php

class DataType_NumberRange extends DataTypePlugin {
  protected $dataTypeName = "Number Range";
  protected $dataTypeFieldGroup = "numeric";
  protected $dataTypeFieldGroupOrder = 30;
  protected $includedFiles = array("NumberRange.js");

  private $helpDialogWidth = 320;


  public function generateItem($row, $options, $existingRowData) {
  	return rand($options["min"], $options["max"]);
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "mediumint default NULL";
	      else if ($options == "Oracle")
	        $info = "varchar2(50) default NULL";
	  	  break;
	  }

	  return $info;
  }

	public function getTemplateOptions($postdata, $column, $numCols) {
	  if ((empty($postdata["numRangeMin_$col"]) && $postdata["numRangeMin_$col"] !== "0") ||
	      (empty($postdata["numRangeMax_$col"]) && $postdata["numRangeMax_$col"] !== "0"))
		  return false;

	  if (!is_numeric($postdata["numRangeMin_$col"]) || !is_numeric($postdata["numRangeMax_$col"]))
	    return false;


	  $options = array(
	    "min" => $postdata["numRangeMin_$col"],
	    "max" => $postdata["numRangeMax_$col"]
	  );

	  return $options;
	}

	public function getOptionsColumnHTML($rowNum) {
    $html =<<<END
&nbsp;{$L["NumberRange_between"]} <input type="text" name="numRangeMin_\$ROW\$" id="numRangeMin_\$ROW\$" style="width: 30px" value="1" />
{$L["NumberRange_and"]} <input type="text" name="numRangeMax_\$ROW\$" id="numRangeMax_\$ROW\$" style="width: 30px" value="10" />
END;
    return $html;
	}

	public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["NumberRange_help"]}</p>"
    );
	}
}