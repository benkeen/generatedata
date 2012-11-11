<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$StateProvince_process_order = 2;

// initialized by StateProvince_get_template_options()
$StateProvince_regions          = array();
$StateProvince_region_countries = array();


function StateProvince_get_template_options($postdata, $col, $num_cols)
{
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
