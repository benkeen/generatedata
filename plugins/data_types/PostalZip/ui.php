<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "PostalZip";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 60;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$g_countries = gd_get_configurable_countries();
foreach ($g_countries as $country_info)
{
	$slug        = $country_info["country_slug"];
	$region_name = $country_info["region_name"];

	$data_type_options_html .= <<<EOF
<div class="country_$slug">
	<input type="checkbox" name="includeZip_{$slug}_\$ROW\$" id="includeZip_{$slug}_\$ROW\$" checked />
	<label for="includeZip_{$slug}_\$ROW\$">$region_name</label>
</div>
EOF;
}


// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width  = 320;
$help_html_content =<<<EOF
	<p>
		{$LANG["PostalZip_help_text"]}
	</p>
EOF;
