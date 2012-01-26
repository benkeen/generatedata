<?php

$Constant_process_order = 1;


function Constant_get_template_options($postdata, $col, $num_cols)
{
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


function Constant_generate_item($row, $options, $existing_row_data)
{
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


function Constant_get_export_type_info($export_type, $options)
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
