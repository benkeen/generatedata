<?php

/**
 * The Core automatically generates a [prefix]countries DB table, populated with a list of all countries
 * (at the time of writing!). These can be used by whatever Data Types need the info. An oft-requested
 * feature for the generator was for a single data row to have continuity between the random values, so
 * if the country was "US", the postal code and city would also be from the US. In order to do this,
 * we need to have specialized info for each country - hence the countries plugins (see /plugins/countries).
 *
 * This class handles integration with those plugins. It's not to be confused with the Country Data Type which
 * does nothing more than output a value from the Core table.
 *
 * Clear as mud?
 */

class CountryPluginHelper {

	/**
	 * This returns all those countries in the database that have country-specific data, namely:
	 * region info (province / state / county), postal code info AND a list of cities. These countries
	 * have special functionality within the UI.
	 *
	 * @return array
	 */
	public function getCountryPlugins() {
		$countryPluginsFolder = realpath(dirname(__FILE__) . "/../plugins/countries");
		$countryPlugins = array();

		if ($handle = opendir($countryPluginsFolder)) {
			while (false !== ($item = readdir($handle))) {
				if ($item == "." || $item == ".." || $item == ".svn") {
					continue;
				}

				if (is_dir("$countryPluginsFolder/$item")) {
					$obj = self::instantiateCountryPlugin($countryPluginsFolder, $item);
					if ($obj != null) {
						$countryPlugins[] = $obj;
					}
				}
			}
			closedir($handle);
		}

		return $countryPlugins;
	}

	private function instantiateCountryPlugin($baseFolder, $countryPluginFolder) {
		$countryPluginClassFileName = "{$countryPluginFolder}.class.php";
		if (!is_file("$baseFolder/$countryPluginFolder/$countryPluginClassFileName")) {
			return false;
		}

		try {
			include("$baseFolder/$countryPluginFolder/$countryPluginClassFileName");
		} catch (Exception $e) {
			return false;
		}

		$className = "Country_$countryPluginFolder";
		if (!class_exists($className)) {
			return false;
		}

		$instance = null;
		try {
			$instance = new $className();
		} catch (Exception $e) {
			return false;
		}

		// enforce inheritance of the abstract CountryPlugin class
		if (!($instance instanceof CountryPlugin)) {
			return false;
		}

		return $instance;
	}
}
