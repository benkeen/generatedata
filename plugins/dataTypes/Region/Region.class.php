<?php

/**
 * @package DataTypes
 */

class DataType_Region extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Region";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	protected $processOrder = 2;
	protected $jsModules = array("Region.js");
	protected $cssFiles = array("Region.css");
	private $helpDialogWidth = 410;
	private $countryRegionHash;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		if ($runtimeContext == "generation") {
			$this->countryRegionHash = Core::$geoData->getCountryRegionHash();
		}
	}

	/**
	 * Generate a random region, and return the display string and additional meta data for use
	 * by any other Data Type.
	 */
	public function generate($generator, $generationContextData) {
		$generationOptions = $generationContextData["generationOptions"];

		$regionInfo = array();
		$keys = array("region", "region_short");

		// if no country plugins were defined, we just randomly grab a region from what's available
		if ($generationOptions["resultType"] == "any") {

			$randRegionInfo = $this->getRandRegion($this->countryRegionHash);
			$index = rand(0, 1);
			$regionInfo["display"]      = $randRegionInfo[$keys[$index]];
			$regionInfo["country_slug"] = $randRegionInfo["countrySlug"];

		// here, one or more Country plugins were included
		// 	- if there's a country row, pick a region within it.
		// 	- if not, pick any region within the list of country plugins
		} else {

			// see if this row has a country [N.B. This is something that could be calculated ONCE on the first row]
			$rowCountryInfo = array();
			while (list($key, $info) = each($generationContextData["existingRowData"])) {
				if ($info["dataTypeFolder"] == "Country") {
					$rowCountryInfo = $info;
					break;
				}
			}

			// if the data set didn't include a Country, just generate any old region pulled from any of the
			// Country plugins selected
			if (empty($rowCountryInfo)) {
				$randRegionInfo = $this->getRandRegion($generationOptions["countries"]);
				$randCountrySlug = $randRegionInfo["countrySlug"];

				// pick a format (short / long) based on whatever the specified through the UI
				$formatIndex = $this->getRandIndex($generationOptions["countries"], $randCountrySlug);
				$regionInfo["display"]      = $randRegionInfo[$keys[$formatIndex]];
				$regionInfo["country_slug"] = $randCountrySlug;

			// here, there *was* a country Data Type chosen and the Country row is pulling from the subset of
			// Country plugins
			} else {
				$currRowCountrySlug = $rowCountryInfo["randomData"]["slug"];

				// here, we've gotten the slug of the country for this particular row, but the user may have unselected
				// it from the row's generation options. See if it's available and if so, use that; otherwise, display
				// any old region from the selected Country plugins
				if (array_key_exists($currRowCountrySlug, $generationOptions["countries"])) {
					$regions = $this->countryRegionHash[$currRowCountrySlug];
					$regionInfo = $regions["regions"][rand(0, $regions["numRegions"]-1)];
					$index = $this->getRandIndex($generationOptions["countries"], $currRowCountrySlug);
					$regionInfo["display"] = $regionInfo[$keys[$index]];
				} else {
					$randRegionInfo = $this->getRandRegion($generationOptions["countries"]);
					$randCountrySlug = $randRegionInfo["countrySlug"];
					$formatIndex = $this->getRandIndex($generationOptions["countries"], $randCountrySlug);
					$randCountry = $this->countryRegionHash[$randCountrySlug];
					$regionInfo = $randCountry["regions"][rand(0, $randCountry["numRegions"]-1)];
					$regionInfo["display"] = $regionInfo[$keys[$formatIndex]];
				}

				$regionInfo["country_slug"] = $currRowCountrySlug;
			}
		}

		return $regionInfo;
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();
		$generationOptions = array();

		// if the user didn't select any Country plugins, they want ANY old region
		if (empty($countries)) {
			$generationOptions["resultType"] = "any";
		} else {
			$generationOptions["resultType"] = "specificCountries";
			$generationOptions["countries"] = array();

			foreach ($countries as $slug) {
				if (isset($postdata["dtIncludeRegion_{$slug}_$colNum"])) {
					$region_full  = (isset($postdata["dtIncludeRegion_{$slug}_Full_$colNum"])) ? true : false;
					$region_short = (isset($postdata["dtIncludeRegion_{$slug}_Short_$colNum"])) ? true : false;
					$generationOptions["countries"][$slug] = array(
						"full"  => $region_full,
						"short" => $region_short
					);
				}
			}
		}

		return $generationOptions;
	}


	public function getOptionsColumnHTML() {
		$countryPlugins = Core::$countryPlugins;

		$html = "";
		foreach ($countryPlugins as $pluginInfo) {
			$slug       = $pluginInfo->getSlug();
			$regionName = $pluginInfo->getRegionNames();

			$html .= <<<EOF
<div class="dtRegionCountry dtRegionCountry_$slug">
	<input type="checkbox" name="dtIncludeRegion_{$slug}_%ROW%" id="dtIncludeRegion_{$slug}_%ROW%" class="dtIncludeRegion dtIncludeRegion_{$slug}"
		checked="checked" /><label for="dtIncludeRegion_{$slug}_%ROW%">$regionName</label>
	<span class="dtRegionFull">
		<input type="checkbox" name="dtIncludeRegion_{$slug}_Full_%ROW%" id="dtIncludeRegion_{$slug}_Full_%ROW%"
			checked="checked" /><label for="dtIncludeRegion_{$slug}_Full_%ROW%"
		id="dtIncludeRegion_{$slug}_FullLabel_%ROW%" class="dtRegionSuboptionActive">{$this->L["full"]}</label>
	</span>
	<span class="dtRegionShort">
		<input type="checkbox" name="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_Short_%ROW%" checked="checked"
			/><label for="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_ShortLabel_%ROW%"
		class="dtRegionSuboptionActive">{$this->L["short"]}</label>
	</span>
</div>
EOF;
		}
		$html .= '<div id="dtRegionCountry_Complete%ROW%"></div>';

		return $html;
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help_text"]}</p>";
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(50) default NULL",
			"SQLField_Oracle" => "varchar2(50) default NULL",
			"SQLField_MSSQL" => "VARCHAR(50) NULL"
		);
	}

	private function getRandIndex($options, $randCountrySlug) {
		$index = null;
		if ($options[$randCountrySlug]["full"] == 1 && $options[$randCountrySlug]["short"] == 1) {
			$index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
		} else if ($options[$randCountrySlug]["full"] == 1) {
			$index = 0;
		} else if ($options[$randCountrySlug]["short"] == 1) {
			$index = 1;
		}
		return $index;
	}

	private function getRandRegion($countries) {
		$randCountrySlug = array_rand($countries);
		$randCountry = $this->countryRegionHash[$randCountrySlug];
		$regionInfo = $randCountry["regions"][rand(0, $randCountry["numRegions"]-1)];
		$regionInfo["countrySlug"] = $randCountrySlug;
		return $regionInfo;
	}
}
