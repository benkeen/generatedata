<?php


class DataType_Region extends DataTypePlugin {
	protected $dataTypeName = "Region";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	protected $processOrder = 2;
	protected $jsModules = array("Region.js");
	protected $cssFile = "Region.css";
	private $helpDialogWidth = 410;
	private $countryRegionHash;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);

		if ($runtimeContext == "generation") {
			// convert the country-region info into something more useful for us
			$countryRegions = Core::$geoData->getCountryRegions();
			$countryRegionHash = array();
			foreach ($countryRegions as $countryRegion) {
				$countrySlug = $countryRegion["country_slug"];

				$countryRegionHash[$countrySlug] = array(
					"numRegions" => count($countryRegion["regions"]),
					"regions"    => $countryRegion["regions"]
				);
			}

			$this->countryRegionHash = $countryRegionHash;
		}
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];

		// see if this row has a country [N.B. This is something that could be calculated ONCE on the first row]
		$rowCountryInfo = array();
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Country") {
				$rowCountryInfo = $info;
				break;
			}
		}

		$regionInfo = array();
		$keys = array("region", "region_short");

		// if the data set didn't include a Country, just generate any old region pulled from any of the
		// Country plugin data
		if (empty($rowCountryInfo) || $rowCountryInfo["generationOptions"] == "all") {
			$randCountrySlug = array_rand($options);
			$index = $this->getRandIndex($options, $randCountrySlug);
			if ($index === null) {
				return;
			}
			$randCountry = $this->countryRegionHash[$randCountrySlug];
			$regionInfo = $randCountry["regions"][rand(0, $randCountry["numRegions"]-1)];
			$regionInfo["display"] = $regionInfo[$keys[$index]];

		// here, there *was* a country Data Type chosen and the Country row is pulling from the subset of
		// Country plugins
		} else {
			$currRowCountrySlug = $rowCountryInfo["randomData"]["slug"];

			// here, we've gotten the slug of the country for this particular row, but the user may have unselected
			// it from the row's generation options. See if it's available and if so, use that; otherwise, display
			// any old region
			if (array_key_exists($currRowCountrySlug, $options)) {
				$regions = $this->countryRegionHash[$currRowCountrySlug];
				$regionInfo = $regions["regions"][rand(0, $regions["numRegions"]-1)];
				$index = $this->getRandIndex($options, $currRowCountrySlug);
				$regionInfo["display"] = $regionInfo[$keys[$index]];
			} else {
				$randCountrySlug = array_rand($options);
				$index = $this->getRandIndex($options, $randCountrySlug);
				$randCountry = $this->countryRegionHash[$randCountrySlug];
				$regionInfo = $randCountry["regions"][rand(0, $randCountry["numRegions"]-1)];
				$regionInfo["display"] = $regionInfo[$keys[$index]];
			}
		}

		return $regionInfo;
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$countries = $generator->getCountries();
		$generationOptions = array();
		foreach ($countries as $slug) {
			if (isset($postdata["dtIncludeRegion_{$slug}_$colNum"])) {
				$region_full  = (isset($postdata["dtIncludeRegion_{$slug}_Full_$colNum"])) ? true : false;
				$region_short = (isset($postdata["dtIncludeRegion_{$slug}_Short_$colNum"])) ? true : false;
				$generationOptions[$slug] = array(
					"full"  => $region_full,
					"short" => $region_short
				);
			}
		}

		// if there were no generation options for this row, the user didn't select anything: return
		// false to ensure the row won't appear in the generated data set
		if (empty($generationOptions)) {
			return false;
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
	<input type="checkbox" name="dtIncludeRegion_{$slug}_%ROW%" id="dtIncludeRegion_{$slug}_%ROW%" class="dtRegionCountry dtIncludeRegion_{$slug}"
		checked="checked" /><label for="dtIncludeRegion_{$slug}_%ROW%">$regionName</label>
	<span class="dtRegionFull">
		<input type="checkbox" name="dtIncludeRegion_{$slug}_Full_%ROW%" id="dtIncludeRegion_{$slug}_Full_%ROW%"
			checked="checked" /><label for="dtIncludeRegion_{$slug}_Full_%ROW%"
		id="dtIncludeRegion_{$slug}_FullLabel_%ROW%" class="dtRegionSuboptionActive">Full</label>
	</span>
	<span class="dtRegionShort">
		<input type="checkbox" name="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_Short_%ROW%" checked="checked"
			/><label for="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_ShortLabel_%ROW%"
		class="dtRegionSuboptionActive">Short</label>
	</span>
</div>
EOF;
		}
		return $html;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["help_text"]}</p>"
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "varchar(50) default NULL";
				} else if ($options == "Oracle") {
					$info = "varchar2(50) default NULL";
				}
				break;
		}

		return $info;
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

}
