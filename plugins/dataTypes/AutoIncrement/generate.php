<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$AutoIncrement_process_order = 1;

function AutoIncrement_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["autoIncrementStart_$col"]) || empty($postdata["autoIncrementValue_$col"]))
	  return false;

	$options = array(
	  "start"       => $postdata["autoIncrementStart_$col"],
	  "increment"   => $postdata["autoIncrementValue_$col"],
	  "placeholder" => $postdata["autoIncrementPlaceholder_$col"]
	);

  return $options;
}


function AutoIncrement_generate_item($row, $options, $existing_row_data)
{
  $start       = $options["start"];
  $increment   = $options["increment"];
  $placeholder = $options["placeholder"];

  $val = ((($row-1) * $increment) + $start);

  if (!empty($placeholder))
  	$val = preg_replace('/\{\$INCR\}/', $val, $placeholder);

  return $val;
}


function AutoIncrement_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "mediumint";
      else if ($options == "Oracle")
        $info = "number default NULL";
  	  break;
  }

  return $info;
}
