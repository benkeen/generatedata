<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "NumberRange";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "other";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 30;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
&nbsp;{$LANG["NumberRange_between"]} <input type="text" name="numRangeMin_\$ROW\$" id="numRangeMin_\$ROW\$" style="width: 30px" value="1" />
{$LANG["NumberRange_and"]} <input type="text" name="numRangeMax_\$ROW\$" id="numRangeMax_\$ROW\$" style="width: 30px" value="10" />
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width  = 320;
$help_html_content =<<<EOF
	<p>
		{$LANG["NumberRange_help"]}
	</p>
EOF;
