<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$TextRandom_process_order = 1;


function TextRandom_generate_item($row, $options, $existing_row_data)
{
  global $g_words;

  return gd_generate_random_text_str($g_words, $options["startsWithLipsum"], "range", $options["numWordsMin"], $options["numWordsMax"]);
}


function TextRandom_get_export_type_info($export_type, $options)
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