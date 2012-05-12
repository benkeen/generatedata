<?php


class DataType_Constant extends DataType {
  protected $dataTypeName = "Constant";
  protected $hasHelpDialog = true;
  protected $dataTypeFieldGroup = "other";
  protected $dataTypeFieldGroupOrder = 80;
  protected $includedFiles = array("Constant.js");
  protected $processOrder = 100;

  private $helpDialogWidth = 460;

  public function generateItem($row, $options, $existingRowData) {
	  $num_values = count($options["values"]);
	  if ($num_values == 1)
	    $value = $options["values"][0];
	  else
	  {
		$item_index = floor(($row-1) / $options["loop_count"]);

		if ($item_index > ($num_values - 1))
	      $item_index = ($item_index % $num_values);

		$value = $options["values"][$item_index];
	  }

	  return $value;
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($exportType)
	  {
	  	case "sql":
	      if ($options == "MySQL" || $options == "SQLite")
	        $info = "TEXT default NULL";
	      else if ($options == "Oracle")
	        $info = "BLOB default NULL";
	      break;
	  }

    return $info;
  }

  public function getTemplateOptions($postdata, $column, $numCols) {
	  if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"]))
		  return false;
	  if (!isset($postdata["loop_count_$col"]) || empty($postdata["loop_count_$col"]))
		  return false;
	  if (!is_numeric($postdata["loop_count_$col"]) || $postdata["loop_count_$col"] <= 0)
		  return false;

	  $options = array(
	    "loop_count" => $postdata["loop_count_$col"],
	    "values"     => explode("|", $postdata["option_$col"])
	  );

	  return $options;
  }

	public function getExampleColumnHTML($row) {
		return $L["see_help_popup"];
	}

	public function getOptionsColumnHTML($row) {
    $html =<<<EOF
<table cellspacing="0" cellpadding="0" width="260">
  <tr>
    <td>{$L["Constant_loop_count"]}</td>
    <td><input type="text" name="loop_count_$row" id="loop_count_$row" size="5" value="10" /></td>
  </tr>
  <tr>
    <td>{$L["Constant_values"]}</td>
    <td><input name="option_$row" id="option_$row" style="width: 100%" /></td>
  </tr>
</table>
EOF;
    return $html;
	}

	public function getHelpDialogInfo() {
		$html =<<< END
  <p>
    {$L["Constant_help_1"]}
  </p>
  <ul>
    <li>{$L["Constant_help_2"]}</li>
    <li>{$L["Constant_help_3"]}</li>
    <li>{$L["Constant_help_4"]}</li>
  </ul>
  <p>
    {$L["Constant_help_5"]}
  </p>
END;

    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => $html
    );
	}


}