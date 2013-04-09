<?php


/**
 * Used in the main generator page to display a list of country-specific data. This is used
 * for the Country, State/Province, Postal Code - and potentially other Data Types.
 */
function smarty_function_country_plugins() {
	$continents     = Core::getContinents();
	$defaultChecked = Core::getDefaultCountryPlugins();
	$countryPlugins = Core::$countryPlugins;
	$L = Core::$language->getCurrentLanguageStrings();

	echo "<select id=\"gdCountries\" name=\"gdCountries[]\" multiple style=\"width: 100%\" data-placeholder=\"{$L["all_countries"]}\">";
	foreach ($continents as $continent) {

		$countriesInCurrContinent = array();
		foreach ($countryPlugins as $obj) {
			//echo $obj->getContinent();
			if ($obj->getContinent() != $continent) {
				continue;
			}
			$countryName = $obj->getName();
			$slug        = $obj->getSlug();
			$selected    = (in_array($slug, $defaultChecked)) ? " selected=\"selected\"" : "";
			$countriesInCurrContinent[] = "<option value=\"$slug\"$selected>$countryName</option>";
		}

		if (!empty($countriesInCurrContinent)) {
			$continent = $L[$continent];
			echo "<optgroup label=\"$continent\">" . implode("\n", $countriesInCurrContinent) . "</optgroup>";
		}
	}
	echo "</select>";
}
