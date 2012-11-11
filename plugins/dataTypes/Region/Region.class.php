<?php


class DataType_Region extends DataTypePlugin {
	protected $dataTypeName = "Region";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	protected $processOrder = 2;
	protected $jsModules = array("Region.js");
	protected $cssFile = "Region.css";
	private $helpDialogWidth = 410;
	private $regions;


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->regions = $this->getRegions();
		}
	}

	public function generate($generator, $generationContextData) {
		global $StateProvince_regions, $StateProvince_region_countries;

		// if the user didn't select any options (i.e. regions), just return - nothing to display!
		if (empty($options)) {
			return;
		}

		// see if this row has a country [N.B. This is something that could be calculated ONCE on the first row]
		$rowCountryInfo = array();
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Country") {
				$rowCountryInfo = $info;
				break;
			}
		}

		// if it's not defined, just show a random region from the selected list of regions
		$region_info = array();
		$keys = array("region", "region_short");
		if (empty($row_country_info)) {
			$rand_country_slug = array_rand($options);

			$index = "";
			if ($options[$rand_country_slug]["full"] == 1 && $options[$rand_country_slug]["short"] == 1)
				$index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
			else if ($options[$rand_country_slug]["full"] == 1)
				$index = 0;
			else if ($options[$rand_country_slug]["short"] == 1)
				$index = 1;

			if ($index === "")
				return;

			$region_info = $StateProvince_regions[$rand_country_slug][rand(0, count($StateProvince_regions[$rand_country_slug])-1)];
			$region_info["display"] = $region_info[$keys[$index]];
		}
		else
		{
			// if the random country generated for this row is a country that has mapped data (currently just 5),
			// then pick a region WITHIN that country
			$country_slug = $row_country_info["random_data"]["slug"];
			if (array_key_exists($country_slug, $options))
			{
				$index = "";
				if ($options[$country_slug]["full"] == 1 && $options[$country_slug]["short"] == 1)
					$index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
				else if ($options[$country_slug]["full"] == 1)
					$index = 0;
				else if ($options[$country_slug]["short"] == 1)
					$index = 1;

				if ($index === "")
					return;

				$region_info = $StateProvince_regions[$country_slug][rand(0, count($StateProvince_regions[$country_slug])-1)];
				$region_info["display"] = $region_info[$keys[$index]];
			}

			// otherwise just pick any region for one of the selected regions
			else
			{
				$rand_country_slug = array_rand($options);

				$index = "";
				if ($options[$rand_country_slug]["full"] == 1 && $options[$rand_country_slug]["short"] == 1)
					$index = rand(0, 1); // weird, rand()&1 doesn't work - always returns 1 0 1 0 1 0...
				else if ($options[$rand_country_slug]["full"] == 1)
					$index = 0;
				else if ($options[$rand_country_slug]["short"] == 1)
					$index = 1;

				if ($index === "")
					return;

				$region_info = $StateProvince_regions[$rand_country_slug][rand(0, count($StateProvince_regions[$rand_country_slug])-1)];
				$region_info["display"] = $region_info[$keys[$index]];
			}
		}

		return $region_info;
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
//		global $StateProvince_regions;
		$countries = $generator->getCountries();
		$options = array();

		foreach ($countries as $slug) {
			if (isset($postdata["includeRegion_{$slug}_$colNum"])) {
				$region_full  = (isset($postdata["includeRegion_{$slug}_Full_$colNum"])) ? true : false;
				$region_short = (isset($postdata["includeRegion_{$slug}_Short_$colNum"])) ? true : false;
				$options[$slug] = array(
					"full"  => $region_full,
					"short" => $region_short
				);
			}
		}

		return $options;
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

	public function getRegions() {
		$countryPlugins = Core::$countryPlugins;

		$regions = array();
		foreach ($countryPlugins as $countryPlugin) {


			/*
			$country_id   = $row["id"];
			$country_slug = $row["country_slug"];
			$query2 = mysql_query("SELECT * FROM {$g_table_prefix}regions WHERE country_id = $country_id");

			$region_list = array();
			while ($row2 = mysql_fetch_assoc($query2))
			{
				$region_list[] = array(
					"region"       => $row2["region"],
					"region_id"    => $row2["region_id"],
					"region_short" => $row2["region_short"],
					"weight"       => $row2["weight"]
				);
			}
			$regions[$country_slug] = $region_list;
			$StateProvince_region_countries[] = $country_slug;
			*/
		}

		return $regions;
	}

}
