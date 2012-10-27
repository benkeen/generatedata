<?php


/**
 * Used in the main generator page to display a list of country-specific data. This is used
 * for the Country, State/Province, Postal Code - and potentially other Data Types.
 */
function smarty_function_country_list()
{
	$countryPlugins = Core::$countryPlugins;
	$defaultChecked = Core::getDefaultCountryPlugins();

	echo "<select id=\"gdCountries\" multiple style=\"width: 100%\">";
	foreach ($countryPlugins as $obj) {
		$countryName = $obj->getName();
		$slug        = $obj->getSlug();
		$selected    = (in_array($slug, $defaultChecked)) ? " selected=\"selected\"" : "";
		echo "<option value=\"$slug\"$selected>$countryName</option>";
	}
	echo "</select>";
}
