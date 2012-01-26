<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$TextRandom_process_order = 1;


function TextRandom_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["numWordsMin_$col"]) || empty($postdata["numWordsMin_$col"]))
    return false;

  $options = array(
    "numWordsMin"      => $postdata["numWordsMin_$col"],
    "numWordsMax"      => $postdata["numWordsMax_$col"],
    "startsWithLipsum" => isset($postdata["startsWithLipsum_$col"]) ? true : false
  );

  return $options;
}


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