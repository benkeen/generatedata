<?php

$data_folder_name            = "Constant";
$data_type_field_group_index = "other";
$data_type_field_group_order = 80;

$data_type_example_html = $LANG["see_help_popup"];

$data_type_options_html =<<<EOF
<table cellspacing="0" cellpadding="0" width="260">
  <tr>
    <td>{$LANG["Constant_loop_count"]}</td>
    <td><input type="text" name="loop_count_\$ROW\$" id="loop_count_\$ROW\$" size="5" value="10" /></td>
  </tr>
  <tr>
    <td>{$LANG["Constant_values"]}</td>
    <td><input name="option_\$ROW\$" id="option_\$ROW\$" style="width: 100%" /></td>
  </tr>
</table>
EOF;

$help_popup_width = 460;
$help_html_content =<<<EOF
  <p>
    {$LANG["Constant_help_1"]}
  </p>
  <ul>
    <li>{$LANG["Constant_help_2"]}</li>
    <li>{$LANG["Constant_help_3"]}</li>
    <li>{$LANG["Constant_help_4"]}</li>
  </ul>
  <p>
    {$LANG["Constant_help_5"]}
  </p>

EOF;

