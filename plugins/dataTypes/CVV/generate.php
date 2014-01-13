<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$cvv_process_order = 1;


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param integer $row the row number in the generated content
 * @param mixed $options whatever options were passed for this function (string in this case)
 * @param array $metadata
 * @return string
 */

function cvv_generate_item($row, $str, $existing_row_data){
	$cvv=rand(111, 999);
  return $cvv;
}


/**
 * --- Required function! ---
 *
 * For this data type, row # and metadata aren't needed.
 *
 * @param string $export_type e.g. "sql"
 * @param mixed $options e.g. "mysql" or "oracle"
 * @return string
 */
function cvv_get_export_type_info($export_type, $options)
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

// ------------------------------------------------------------------------------------------------


