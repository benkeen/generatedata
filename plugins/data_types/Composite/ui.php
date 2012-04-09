<?php

$data_folder_name = "Composite";
$data_type_field_group_index = "other";
$data_type_field_group_order = 70;


$data_type_example_html = $LANG["see_help_popup"];

$data_type_options_html =<<<EOF
<textarea name="option_\$ROW\$" id="option_\$ROW\$" style="height: 70px; width: 260px"></textarea>
EOF;


$help_popup_width = 520;
$help_html_content =<<<EOF
  <p>
    {$LANG["Composite_help_1"]}
  </p>
  <p>
    {$LANG["Composite_help_2"]}
  </p>
  <p>
    {$LANG["Composite_help_3"]}
  </p>
  <ul>
    <li>{$LANG["Composite_help_4"]}</li>
    <li>{$LANG["Composite_help_5"]}
      <ul>
        <li><b>{\$ROW2-\$ROW1}</b> - {$LANG["Composite_subtraction"]}</li>
        <li><b>{\$ROW2*\$ROW1}</b> - {$LANG["Composite_multiplication"]}</li>
        <li><b>{\$ROW2/\$ROW1}</b> - {$LANG["Composite_division"]}</li>
      </ul>
    </li>
    <li>
      {$LANG["Composite_help_6"]}
      <b>{if \$ROW1 == 5}{$LANG["Composite_na"]}{else}{\$ROW1}{/if}</b>
    </li>
  </ul>
  <p>
    {$LANG["Composite_help_7"]}
  </p>

EOF;

