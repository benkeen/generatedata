<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "AutoIncrement";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "other";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 10;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
  <select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="return AutoIncrement_ns.selectExample(this.value, \$ROW\$)">
    <option value="1,1,">1, 2, 3, 4, 5, 6...</option>
    <option value="100,1,">100, 101, 102, 103, 104...</option>
    <option value="0,2,">0, 2, 4, 6, 8, 10...</option>
    <option value="0,5,">0, 5, 10, 15, 20, 25...</option>
    <option value="1000,-1,">1000, 999, 998, 997...</option>
    <option value="0,-1,">0, -1, -2, -3, -4...</option>
    <option value="0,0.5,">0, 0.5, 1, 1.5, 2...</option>
    <option value="1,1,ROW-{ROW}">ROW-1, ROW-2, ROW-3,...</option>
    <option value="2,4,{ROW}i">2i, 4i, 6i, 8i...</option>
  </select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
&nbsp;{$LANG["AutoIncrement_start_at_c"]} <input type="text" name="autoIncrementStart_\$ROW\$" id="autoIncrementStart_\$ROW\$" style="width: 40px" value="1" />&nbsp;
&nbsp;{$LANG["AutoIncrement_increment_c"]} <input type="text" name="autoIncrementValue_\$ROW\$" id="autoIncrementValue_\$ROW\$" style="width: 40px" value="1" />
&nbsp;{$LANG["AutoIncrement_placeholder_str"]} <input type="text" name="autoIncrementPlaceholder_\$ROW\$" id="autoIncrementPlaceholder_\$ROW\$" style="width: 140px" />
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 480;
$help_html_content =<<<EOF
	<p>
	  {$LANG["AutoIncrement_help_intro"]}
	</p>
	<p>
	  {$LANG["AutoIncrement_help_para2"]}
	</p>

	<ul>
	  <li><b>ROW-{\$INCR}</b> -> ROW-1, ROW-2, ROW-3, ROW-4, ...</li>
	  <li><b>{\$INCR}F</b> -> 1F, 2F, 3F, 4F, ...</li>
	</ul>
EOF;

