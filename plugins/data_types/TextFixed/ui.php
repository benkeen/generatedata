<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "TextFixed";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "text";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 10;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
&nbsp;{$LANG["TextFixed_generate"]} #<input type="text" name="numWords_\$ROW\$" id="numWords_\$ROW\$" style="width: 30px" value="10" /> {$LANG["TextFixed_words"]}
EOF;


// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 320;
$help_html_content =<<<EOF
  <p>
    {$LANG["TextFixed_help"]}
  </p>
EOF;
