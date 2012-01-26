<?php

// ??? Where should this really go?

/**
 * This returns all those countries in the database that have country-specific data, namely:
 * region info (province / state / county), postal code info AND a list of cities. These countries
 * have special functionality within the UI.
 *
 * @return array
 */
function gd_get_configurable_countries()
{
	global $g_table_prefix;

	$query = mysql_query("
		SELECT *
		FROM   {$g_table_prefix}countries
		WHERE  has_full_data_set = 'yes'
			");

	$results = array();
	while ($row = mysql_fetch_assoc($query))
	  $results[] = $row;

	return $results;
}
