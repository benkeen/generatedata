<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Phone_process_order = 1;


function Phone_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["option_$col"]))
    return false;

  return $postdata["option_$col"];
}

function Phone_generate_item($row, $options, $existing_row_data)
{
  $phone_str = gd_generate_random_num_str($options);

  // in case the user entered multiple | separated formats, pick one
  $formats = explode("|", $phone_str);
  $chosen_format = $formats[0];
  if (count($formats) > 1)
  	$chosen_format = $formats[rand(0, count($formats)-1)];

  return $chosen_format;
}

function Phone_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(100) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(100) default NULL";
  	  break;
  }

  return $info;
}
