<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "StateProvince";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 70;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$g_countries = gd_get_configurable_countries();
foreach ($g_countries as $country_info)
{
  $slug        = $country_info["country_slug"];
  $region_name = $country_info["region_name"];

  $data_type_options_html .= <<<EOF
<div class="country_$slug" style="position: relative">
  <input type="checkbox" name="includeRegion_{$slug}_\$ROW\$" class="main" id="includeRegion_{$slug}_\$ROW\$"
    onclick="StateProvince_ns.hideShowStateProvCounty(\$ROW\$, this.checked, '$slug')" checked /><label for="includeRegion_{$slug}_\$ROW\$">$region_name</label>
  <span style="position: absolute; left: 125px; border-left: 1px solid #dddddd;"><input type="checkbox"
    name="includeRegion_{$slug}_Full_\$ROW\$" id="includeRegion_{$slug}_Full_\$ROW\$" checked /><label for="includeRegion_{$slug}_Full_\$ROW\$"
    id="includeRegion_{$slug}_FullLabel_\$ROW\$" class="suboptionActive">Full</label></span>
  <span style="position: absolute; left: 175px;"><input type="checkbox" name="includeRegion_{$slug}_Short_\$ROW\$"
    id="includeRegion_{$slug}_Short_\$ROW\$" checked /><label for="includeRegion_{$slug}_Short_\$ROW\$" id="includeRegion_{$slug}_ShortLabel_\$ROW\$"
    class="suboptionActive">Short</label></span>
</div>
EOF;
}


// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width  = 400;
$help_html_content =<<<EOF
  <p>
    {$LANG["StateProvince_help_text"]}
  </p>
EOF;
