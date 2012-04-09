<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$List_process_order = 1;


function List_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["option_$col"]))
    return false;

  $list_type = $postdata["list_type_{$col}"]; // Exactly or AtMost
  $number    = ($list_type == "Exactly") ? $postdata["exactly_{$col}"] : $postdata["at_most_{$col}"];
  $options = array(
    "list_type" => $list_type,
    "number"    => $number,
    "values"    => $postdata["option_{$col}"]
  );

  return $options;
}


function List_generate_item($row, $options, $existing_row_data)
{
  $all_elements = explode("|", $options["values"]);

  $val = "";
  if ($options["list_type"] == "Exactly")
    $val = implode(", ", gd_return_random_subset($all_elements, $options["number"]));
  else
  {
    // at MOST. So randomly calculate a number up to the num specified:
    $num_items = rand(0, $options["number"]);
    $val = implode(", ", gd_return_random_subset($all_elements, $num_items));
  }

  return $val;
}


function List_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(255) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(255) default NULL";
  	  break;
  }

  return $info;
}