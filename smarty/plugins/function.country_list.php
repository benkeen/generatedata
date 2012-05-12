<?php


/**
 * Used in the main generator page to display a list of country-specific data. This is used
 * for the Country, State/Province, Postal Code - and potentially other Data Types.
 */
function smarty_function_country_list()
{
	// N.B. Once more country plugins are added, this markup will be updated to use CSS3 columns
  $num_per_col = 3;

  $countryPlugins = Core::$countryPlugins;
  $defaultChecked = Core::getDefaultCountryPlugins();

  echo "<div class=\"gdCountryPluginCol\">";

  $row = 0;
  foreach ($countryPlugins as $obj) {
    $countryName = $obj->getName();
    $slug        = $obj->getSlug();

    if ($row > 0 && ($row % $num_per_col == 0)) {
      echo "</div><div class=\"gdCountryPluginCol\">";
    }

    $checked = (in_array($slug, $defaultChecked)) ? "checked" : "";
    echo <<<EOF
      <div>
        <input type="checkbox" name="countryChoice[]" value="$slug" id="$slug" $checked />
        <label for="$slug">$countryName</label>
      </div>
EOF;
    $row++;
  }

  echo "</div>";
}