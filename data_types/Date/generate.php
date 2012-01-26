<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Date_process_order = 1;


function Date_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["fromDate_$col"]) || empty($postdata["toDate_$col"]) || empty($postdata["option_$col"]))
    return false;

  $options = array(
    "format_code" => $postdata["option_$col"],
    "from"        => $postdata["fromDate_$col"],
    "to"          => $postdata["toDate_$col"]
      );

  return $options;
}


function Date_generate_item($row, $options, $existing_row_data)
{
  // convert the From and To dates to datetimes
  list($month, $day, $year) = split("/", $options["from"]);
  $from_date = mktime(0, 0, 0, $month, $day, $year);
  list($month, $day, $year) = split("/", $options["to"]);
  $to_date = mktime(0, 0, 0, $month, $day, $year);

  // randomly pick a date between those dates
  $rand_date = mt_rand($from_date, $to_date);

  // display the new date in the value specified
  return date($options["format_code"], $rand_date);
}


function Date_get_export_type_info($export_type, $options)
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
