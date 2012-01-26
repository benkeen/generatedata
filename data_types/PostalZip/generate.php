<?php

/**
 * This data type behaves similarly to the Region data type. It attempts to produce a zip/postal code
 * that is appropriate for the country of the row. If there is no country row or if it's one that doesn't
 * have mapped data, it just provides any value based on the options selected for the data type by the
 * user.
 */

$PostalZip_process_order = 2;
$PostalZip_formats       = PostalZip_get_country_zip_formats();

function PostalZip_get_template_options($postdata, $col, $num_cols)
{
  global $PostalZip_formats;

  $country_choice = $postdata["countryChoice"];
  $options = array();
  foreach ($country_choice as $slug)
  {
    if (isset($postdata["includeZip_{$slug}_$col"]))
      $options[] = $slug;
  }

  return $options;
}


function PostalZip_generate_item($row, $options, $existing_row_data)
{
  global $PostalZip_formats;

  // track the country info (this finds the FIRST country field listed)
  $PostalZip_row_country_info = array();
  while (list($key, $info) = each($existing_row_data))
  {
    if ($info["data_type_folder"] == "Country")
    {
      $PostalZip_row_country_info = $info;
      break;
    }
  }

  $random_zip = "";
  if (empty($PostalZip_row_country_info))
  {
    $rand_country = $options[rand(0, count($options)-1)];
    $random_zip = PostalZip_convert($PostalZip_formats[$rand_country]);
  }
  else
  {
    // if this country is one of the formats that was selected, generate it in that format -
    // otherwise just generate a zip in any selected format
    $country_slug = $PostalZip_row_country_info["random_data"]["slug"];

    if (in_array($country_slug, $options))
      $random_zip = PostalZip_convert($PostalZip_formats[$country_slug]);
    else
    {
      $rand_country = $options[rand(0, count($options)-1)];
      $random_zip = PostalZip_convert($PostalZip_formats[$rand_country]);
    }
  }

  return $random_zip;
}


function PostalZip_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(10) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(10) default NULL";
  	  break;
  }

  return $info;
}

// ------------------------------------------------------------------------------------------------


function PostalZip_get_country_zip_formats()
{
  global $g_table_prefix;

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}countries
    WHERE  has_full_data_set = 'yes'
      ");

  $formats = array();
  while ($row = mysql_fetch_assoc($query))
  {
    $formats[$row["country_slug"]] = $row["zip_format"];
  }

  return $formats;
}


function PostalZip_convert($str)
{
  $formats = explode("|", $str);

  if (count($formats) == 1)
    $format = $formats[0];
  else
    $format = $formats[rand(0, count($formats)-1)];

  return gd_generate_random_alphanumeric_str($format);
}
