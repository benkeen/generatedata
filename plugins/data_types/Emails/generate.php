<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Emails_process_order = 1;


function Emails_generate_item($row, $options, $existing_row_data)
{
	global $g_words;

  // prefix
  $num_prefix_words = rand(1, 3);
  $offset = rand(0, count($g_words) - ($num_prefix_words + 1));
  $word_array = array_slice($g_words, $offset, $num_prefix_words);
  $word_array = preg_replace("/[,.]/", "", $word_array);
  $prefix = join(".", $word_array);

  // domain
  $num_domain_words = rand(1, 3);
  $offset = rand(0, count($g_words) - ($num_domain_words + 1));
  $word_array = array_slice($g_words, $offset, $num_domain_words);
  $word_array = preg_replace("/[,.]/", "", $word_array);
  $domain = join("", $word_array);

  // suffix
  $valid_suffixes = array("edu", "com", "org", "ca", "net", "co.uk");
  $suffix = $valid_suffixes[rand(0, count($valid_suffixes)-1)];

  $email = "$prefix@$domain.$suffix";

  return $email;
}


function Emails_get_export_type_info($export_type, $options)
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
