<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$City_process_order = 3;
$City_list          = City_get_cities();


function City_generate_item($row, $options, $existing_row_data)
{
  global $City_list;

  // see if this row has a region [N.B. This is something that could be calculated ONCE on the first row]
  $row_region_info = array();
  while (list($key, $info) = each($existing_row_data))
  {
    if ($info["data_type_folder"] == "StateProvince")
    {
      $row_region_info = $info;
      break;
    }
  }
  reset($existing_row_data);

  // see if this row has a country [N.B. This is something that could be calculated ONCE on the first row]
  if (empty($row_region_info))
  {
    $row_country_info = array();
    while (list($key, $info) = each($existing_row_data))
    {
      if ($info["data_type_folder"] == "Country")
      {
        $row_country_info = $info;
        break;
      }
    }
  }

  $random_city = "";
  if (!empty($row_region_info))
  {
    $region_id = $row_region_info["random_data"]["region_id"];
    $random_city = $City_list[$region_id][rand(0, count($City_list[$region_id])-1)]["city"];
  }
  else if (!empty($row_country_info))
  {
    // get all region IDs associated with this country
    $regions = Country_get_regions($row_country_info["random_data"]["id"]);
    $random_region_id = $regions[rand(0, count($regions)-1)]["region_id"];
    $random_city = $City_list[$random_region_id][rand(0, count($City_list[$random_region_id])-1)]["city"];
  }
  else
  {
    $rand_region_id = array_rand($City_list);
    $random_city = $City_list[$rand_region_id][rand(0, count($City_list[$rand_region_id])-1)]["city"];
  }

  return $random_city;
}


function City_get_export_type_info($export_type, $options)
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


// ------------------------------------------------------------------------------------------------


/**
 * Returns an array of cities, mapped to country
 */
function City_get_cities()
{
  global $g_table_prefix;

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}cities
      ");

  $cities = array();
  $cities_by_region = array();
  while ($city_info = mysql_fetch_assoc($query))
  {
    if (!array_key_exists($city_info["region_id"], $cities_by_region))
      $cities_by_region[$city_info["region_id"]] = array();

    $cities_by_region[$city_info["region_id"]][] = array(
      "city"    => $city_info["city"],
      "city_id" => $city_info["city_id"]
    );
  }

  return $cities_by_region;
}

