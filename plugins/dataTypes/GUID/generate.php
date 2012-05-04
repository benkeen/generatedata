<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$GUID_process_order = 1;
$GUID_generated = array();


function GUID_generate_item($row, $options, $existing_row_data)
{
	global $GUID_generated;

  $guid = gd_generate_random_alphanumeric_str("HHHHHHHH-HHHH-HHHH-HHHH-HHHH-HHHHHHHH");

  // pretty sodding unlikely, but just in case!
  while (in_array($guid, $GUID_generated))
    $guid = gd_generate_random_alphanumeric_str("HHHHHHHH-HHHH-HHHH-HHHH-HHHH-HHHHHHHH");

  $GUID_generated[] = $guid;
  return $guid;
}


function GUID_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(36) NOT NULL";
      else
        $info = "varchar2(36) NOT NULL";
  	  break;
  }

  return $info;
}