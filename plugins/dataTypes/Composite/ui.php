<?php

$data_type_example_html = $L["see_help_popup"];

$data_type_options_html =<<<EOF
<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" style="height: 70px; width: 260px"></textarea>
EOF;


$help_popup_width = 520;
$help_html_content =<<<EOF
  <p>
    {$L["Composite_help_1"]}
  </p>
  <p>
    {$L["Composite_help_2"]}
  </p>
  <p>
    {$L["Composite_help_3"]}
  </p>
  <ul>
    <li>{$L["Composite_help_4"]}</li>
    <li>{$L["Composite_help_5"]}
      <ul>
        <li><b>{\$ROW2-\$ROW1}</b> - {$L["Composite_subtraction"]}</li>
        <li><b>{\$ROW2*\$ROW1}</b> - {$L["Composite_multiplication"]}</li>
        <li><b>{\$ROW2/\$ROW1}</b> - {$L["Composite_division"]}</li>
      </ul>
    </li>
    <li>
      {$L["Composite_help_6"]}
      <b>{if \$ROW1 == 5}{$L["Composite_na"]}{else}{\$ROW1}{/if}</b>
    </li>
  </ul>
  <p>
    {$L["Composite_help_7"]}
  </p>

EOF;

