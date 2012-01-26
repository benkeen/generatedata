<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "Tree";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "other";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 60;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
<div>{$LANG["Tree_auto_increment_row_num"]} <input type="text" id="tree_ai_row_num_\$ROW\$" name="tree_ai_row_num_\$ROW\$" value="1" size="3" maxlength="3" /></div>
<div>{$LANG["Tree_max_num_sibling_nodes"]} <input type="text" id="tree_max_siblings_\$ROW\$" name="tree_max_siblings_\$ROW\$" value="2" size="3" maxlength="3" /></div>
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 400;
$help_html_content =<<<EOF
  <p>
    {$LANG["Tree_help_1"]}
  </p>
  <p>
    {$LANG["Tree_help_2"]}
  </p>
EOF;
