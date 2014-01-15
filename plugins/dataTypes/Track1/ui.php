<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "track1";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "credit_card_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 40;


// ------------------------------------------------------------------------------------------------
// EXAMPLES


// ------------------------------------------------------------------------------------------------
// OPTIONS


// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 400;
$help_html_content =<<<EOF
<p>
	{$LANG["track1_help_intro"]}
</p>

EOF;
