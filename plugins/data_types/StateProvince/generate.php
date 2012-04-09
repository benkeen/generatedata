<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$StateProvince_process_order = 2;

// initialized by StateProvince_get_template_options()
$StateProvince_regions          = array();
$StateProvince_region_countries = array();


function StateProvince_get_template_options($postdata, $col, $num_cols)
{
  global $StateProvince_regions;

  $country_choice = $postdata["countryChoice"];
  $options = array();

  foreach ($country_choice as $slug)
  {
    if (isset($postdata["includeRegion_{$slug}_$col"]))
    {
      $region_full  = (isset($postdata["includeRegion_{$slug}_Full_$col"])) ? true : false;
      $region_short = (isset($postdata["includeRegion_{$slug}_Short_$col"])) ? true : false;

      $options[$slug] = array(
        "full"  => $region_full,
        "short" => $region_short
      );
    }
  }

  if (empty($StateProvince_regions))
    $StateProvince_regions = gd_get_regions();

  return $options;
}


/**
 * This is pretty complicated and could be improved a LOT.
 *
 * @param $row
 * @param $options
 * @param $existing_row_data
 * @return unknown_type
 */
function StateProvince_generate_item($row, $options, $existing_row_data)
{
  global $StateProvince_regions, $StateProvince_region_countries;

  // if the user didn't select any options (i.e. regions), just return - nothing to display!
  if (empty($options))
    return;

  // see if this row has a country [N.B. This is something that could be calculated ONCE on the first row]
  $row_country_info = array();
  while (list($key, $info) = each($existing_row_data))
  {
    if ($info["data_type_folder"] == "Country")
    {
      $row_country_info = $info;
      break;
    }
  }

  // if it's not defined, just show a random region from the selected list of regions
  $region_info = array();
  $keys = array("region", "region_short");
  if (empty($row_country_info))
  {
    $rand_country_slug = array_rand($options);

    $index = "";
    if ($options[$rand_country_slug]["full"] == 1 && $options[$rand_country_slug]["short"] == 1)
      $index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
    else if ($options[$rand_country_slug]["full"] == 1)
      $index = 0;
    else if ($options[$rand_country_slug]["short"] == 1)
      $index = 1;

    if ($index === "")
      return;

    $region_info = $StateProvince_regions[$rand_country_slug][rand(0, count($StateProvince_regions[$rand_country_slug])-1)];
    $region_info["display"] = $region_info[$keys[$index]];
  }
  else
  {
    // if the random country generated for this row is a country that has mapped data (currently just 5),
    // then pick a region WITHIN that country
    $country_slug = $row_country_info["random_data"]["slug"];
    if (array_key_exists($country_slug, $options))
    {
      $index = "";
      if ($options[$country_slug]["full"] == 1 && $options[$country_slug]["short"] == 1)
        $index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
      else if ($options[$country_slug]["full"] == 1)
        $index = 0;
      else if ($options[$country_slug]["short"] == 1)
        $index = 1;

      if ($index === "")
        return;

      $region_info = $StateProvince_regions[$country_slug][rand(0, count($StateProvince_regions[$country_slug])-1)];
      $region_info["display"] = $region_info[$keys[$index]];
    }

    // otherwise just pick any region for one of the selected regions
    else
    {
      $rand_country_slug = array_rand($options);

      $index = "";
      if ($options[$rand_country_slug]["full"] == 1 && $options[$rand_country_slug]["short"] == 1)
        $index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
      else if ($options[$rand_country_slug]["full"] == 1)
        $index = 0;
      else if ($options[$rand_country_slug]["short"] == 1)
        $index = 1;

      if ($index === "")
        return;

      $region_info = $StateProvince_regions[$rand_country_slug][rand(0, count($StateProvince_regions[$rand_country_slug])-1)];
      $region_info["display"] = $region_info[$keys[$index]];
    }
  }

  return $region_info;
}


function StateProvince_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "varchar(50) default NULL";
      else if ($options == "Oracle")
        $info = "varchar2(50) default NULL";
  	  break;
  }

  return $info;
}

// ------------------------------------------------------------------------------------------------

/**
 * Returns an array of first names
 */
function gd_get_regions()
{
  global $g_table_prefix, $StateProvince_region_countries;

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}countries
    WHERE  has_full_data_set = 'yes'
      ");

  $regions = array();
  while ($row = mysql_fetch_assoc($query))
  {
    $country_id   = $row["id"];
    $country_slug = $row["country_slug"];
    $query2 = mysql_query("SELECT * FROM {$g_table_prefix}regions WHERE country_id = $country_id");

    $region_list = array();
    while ($row2 = mysql_fetch_assoc($query2))
    {
      $region_list[] = array(
        "region"       => $row2["region"],
        "region_id"    => $row2["region_id"],
        "region_short" => $row2["region_short"],
        "weight"       => $row2["weight"]
      );
    }
    $regions[$country_slug] = $region_list;
    $StateProvince_region_countries[] = $country_slug;
  }

  return $regions;
}
