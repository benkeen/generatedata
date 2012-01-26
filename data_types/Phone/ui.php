<?php

// ------------------------------------------------------------------------------------------------
// MAIN SETTINGS


// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "Phone";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 20;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
  <select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
    <option value="">{$LANG["please_select"]}</option>
    <option value="1-Xxx-Xxx-xxxx">{$LANG["Phone_example_1"]}</option>
    <option value="(Xxx) Xxx-xxxx">{$LANG["Phone_example_2"]}</option>
    <option value="1 Xx Xxx Xxxx-xxxx">{$LANG["Phone_uk"]}</option>
    <option value="1-Xxx-Xxx-xxxx|Xxx-xxxx">{$LANG["Phone_different_formats"]}</option>
  </select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
  <input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 230px" />
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 450;
$help_html_content =<<<EOF
  <p>
    {$LANG["Phone_help_text1"]}
  </p>
  <p>
    {$LANG["Phone_help_text2"]}
  </p>
  <p>
    {$LANG["Phone_help_text3"]}
  </p>
EOF;

