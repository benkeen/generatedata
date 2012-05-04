<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Country_process_order = 1;
$g_countries           = "";


function Country_get_template_options($postdata, $col, $num_cols)
{
	global $g_countries;

	if (isset($postdata["option_$col"]))
	  $g_countries = Country_get_countries($postdata["countryChoice"]);
	else
	  $g_countries = Country_get_countries();

  return "";
}


/**
 * Should return a string or an hash. If it returns a string, that's what's displayed. If it returns
 * a hash, the "display" key is what should be displayed. The other information can be used to pass
 * to any dependent functions.
 *
 * ONLY non-dependent data types can return arrays from this function. Dependent ones have no reason
 * to do so.
 *
 * @param integer $row
 * @param array $options
 * @return mixed
 */
function Country_generate_item($row, $options, $existing_row_data)
{
  global $g_countries;

  $random_country = $g_countries[rand(0, count($g_countries)-1)];
  return array(
    "display" => $random_country["country"],
    "slug"    => $random_country["slug"],
    "id"      => $random_country["id"]
  );
}


function Country_get_export_type_info($export_type, $options)
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
 * Returns an array of countries
 */
function Country_get_countries($country_slugs = array())
{
  global $g_table_prefix;

  $where_clause = "";
  if (!empty($country_slugs))
  {
    $where_clause = "WHERE has_full_data_set = 'yes'";
    $slug_clauses = array();
    foreach ($country_slugs as $slug)
    	$slug_clauses[] = "country_slug = '$slug'";

    $slug_clause = "(" . implode(" OR ", $slug_clauses) . ")";
    $where_clause .= "AND $slug_clause";
  }

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}countries
    $where_clause
      ");

  $countries = array();
  while ($country_info = mysql_fetch_assoc($query))
  {
    $countries[] = array(
      "country" => $country_info['country'],
      "id"      => $country_info['id'],
      "slug"    => $country_info["country_slug"]
    );
  }

  return $countries;
}

function Country_get_regions($country_id)
{
	global $g_table_prefix;

	$query = mysql_query("SELECT * FROM {$g_table_prefix}regions WHERE country_id = $country_id");
	$region_info = array();
	while ($row = mysql_fetch_assoc($query))
	{
		$region_info[] = $row;
	}

	return $region_info;
}