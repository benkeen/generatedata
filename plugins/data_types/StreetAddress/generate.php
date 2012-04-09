<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$StreetAddress_process_order = 1;




function StreetAddress_generate_item($row, $options, $existing_row_data)
{
  global $g_words, $LANG;

  $street_address = "";
  $street_name = ucwords(gd_generate_random_text_str($g_words, false, "fixed", 1));
  $valid_street_types = explode(",", $LANG["StreetAddress_street_types"]);
  $street_type = $valid_street_types[rand(0, count($valid_street_types)-1)];

  $format = rand(1, 4);

  switch($format)
  {
    case "1":
      $street_address = $LANG["StreetAddress_po_box"] . " " . rand(100, 999) . ", " . rand(100, 9999) . " $street_name " . $street_type;
      break;
    case "2":
      $street_address = rand(100, 999) . "-" . rand(100, 9999) . " $street_name " . $street_type;
      break;
    case "3":
      $street_address = $LANG["StreetAddress_ap_num"] . rand(100, 999) . "-" . rand(100, 9999) . " $street_name " . $street_type;
      break;
    case "4":
      $street_address = rand(100, 9999) . " $street_name " . $street_type;
      break;
  }

  return $street_address;
}


function StreetAddress_get_export_type_info($export_type, $options)
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
