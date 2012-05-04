<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$NumberRange_process_order = 1;

function NumberRange_get_template_options($postdata, $col, $num_cols)
{
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


function NumberRange_generate_item($row, $options, $existing_row_data)
{
  return rand($options["min"], $options["max"]);
}


function NumberRange_get_export_type_info($export_type, $options)
{
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