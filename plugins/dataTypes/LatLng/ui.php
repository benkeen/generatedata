<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "LatLng";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 90;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
<input type="checkbox" name="includeLat_\$ROW\$" id="includeLat_\$ROW\$" checked /><label for="includeLat_\$ROW\$">{$L["LatLng_latitude"]}</label>&nbsp;
<input type="checkbox" name="includeLng_\$ROW\$" id="includeLng_\$ROW\$" checked /><label for="includeLng_\$ROW\$">{$L["LatLng_longitude"]}</label>
EOF;


$help_popup_width = 360;
$help_html_content =<<<EOF
  <p>
    {$L["LatLng_help"]}
  </p>
EOF;

