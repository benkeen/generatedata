<?php


class DataType_Region extends DataTypePlugin {
	protected $dataTypeName = "State / Province / County";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("Region.js");
	protected $cssFile = "Region.css";
	private $helpDialogWidth = 360;


	static function install() {
		/*
		$queries[] = "
			CREATE TABLE {$prefix}regions (
				region_id mediumint(9) NOT NULL AUTO_INCREMENT,
				country_slug varchar(100) NOT NULL,
				region varchar(35) CHARACTER SET utf8 NOT NULL,
				region_short char(2) CHARACTER SET utf8 DEFAULT NULL,
				region_slug varchar(100) NOT NULL,
				weight smallint(3) NOT NULL,
				PRIMARY KEY (region_id)
			)
		";
		*/
	}

	public function generateItem($row, $options, $existingRowData) {
	}

	public function getExportTypeInfo($exportType, $options) {
	}

	public function getTemplateOptions($postdata, $column, $numCols) {
	}

	public function getOptionsColumnHTML() {
		$countryPlugins = Core::$countryPlugins;

		$html = "";
		foreach ($countryPlugins as $pluginInfo) {
			$slug       = $pluginInfo->getSlug();
			$regionName = $pluginInfo->getRegionNames();

			// onclick="StateProvince_ns.hideShowStateProvCounty(%ROW%, this.checked, '$slug')"

			$html .= <<<EOF
<div class="dtRegionCountry dtRegionCountry_$slug">
	<input type="checkbox" name="dtIncludeRegion_{$slug}_%ROW%" id="dtIncludeRegion_{$slug}_%ROW%" class="dtRegionCountry"
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
}
