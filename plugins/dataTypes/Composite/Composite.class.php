<?php


class DataType_Composite extends DataType {

  protected $dataTypeName = "Composite";
  protected $hasHelpDialog = true;
  protected $dataTypeFieldGroup = "other";
  protected $dataTypeFieldGroupOrder = 70;
  protected $includedFiles = array("Composite.js");
  protected $processOrder = 100;

  private $helpDialogWidth = 460;

  public function generateItem($row, $placeholderStr, $existingRowData) {
	  global $Composite_smarty;

	  $placeholders = array();
	  foreach ($existing_row_data as $row_info)
	  {
	  	$column_number = $row_info["column_num"];
	  	$random_data   = is_array($row_info["random_data"]) ? $row_info["random_data"]["display"] : $row_info["random_data"];
	  	$placeholders["ROW{$column_number}"] = $random_data;
	  }

	  $curr_folder = dirname(__FILE__);
	  $Composite_smarty->template_dir = realpath("$curr_folder/../../code/smarty");
	  $Composite_smarty->compile_dir  = realpath("$curr_folder/../../cache");
	  while (list($key, $value) = each($placeholders))
	  	$Composite_smarty->assign($key, $value);

	  $Composite_smarty->assign("eval_str", $options);
	  $output = $Composite_smarty->fetch("eval.tpl");

	  return $output;
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
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

  public function getTemplateOptions($postdata, $col, $num_cols) {
	  if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"])) {
		  return false;
	  }

	  return $postdata["option_$col"];
  }
}