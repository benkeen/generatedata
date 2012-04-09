<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "Country";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 80;


$data_type_options_html =<<<EOF
<input type="checkbox" name="option_\$ROW\$" value="" id="option_\$ROW\$" checked />
  <label for="option_\$ROW\$">{$LANG["Country_limit_results"]}</label>
EOF;
