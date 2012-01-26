<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$AlphaNumeric_process_order = 1;


function AlphaNumeric_get_template_options($postdata, $col, $num_cols)
{
	if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"]))
	  return false;

  return $postdata["option_$col"];
}


function AlphaNumeric_generate_item($row, $options, $existing_row_data)
{
  $formats = explode("|", $options);
  $chosen_format = $formats[0];
  if (count($formats) > 1)
  	$chosen_format = $formats[rand(0, count($formats)-1)];

  return gd_generate_random_alphanumeric_str($chosen_format);
}


function AlphaNumeric_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
      $info = "varchar(255)";
  	  break;
  }

  return $info;
}