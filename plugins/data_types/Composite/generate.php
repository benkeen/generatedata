<?php

$Composite_process_order = 100;
$Composite_smarty        = new Smarty();


function Composite_get_template_options($postdata, $col, $num_cols)
{
  if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"]))
	return false;

  return $postdata["option_$col"];
}


function Composite_generate_item($row, $options, $existing_row_data)
{
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


function Composite_get_export_type_info($export_type, $options)
{
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