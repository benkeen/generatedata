<?php


class DataType_Region extends DataTypePlugin {
	protected $dataTypeName = "State / Province / County";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("Region.js");
	private $helpDialogWidth = 360;


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
		<div class="country_$slug" style="position: relative">
			<input type="checkbox" name="includeRegion_{$slug}_%ROW%" class="main" id="includeRegion_{$slug}_%ROW%" checked="checked"
				/><label for="includeRegion_{$slug}_%ROW%">$regionName</label>
			<span style="position: absolute; left: 125px; border-left: 1px solid #dddddd;"><input type="checkbox"
				name="includeRegion_{$slug}_Full_%ROW%" id="includeRegion_{$slug}_Full_%ROW%" checked="checked" /><label for="includeRegion_{$slug}_Full_%ROW%"
				id="includeRegion_{$slug}_FullLabel_%ROW%" class="suboptionActive">Full</label></span>
			<span style="position: absolute; left: 175px;"><input type="checkbox" name="includeRegion_{$slug}_Short_%ROW%"
				id="includeRegion_{$slug}_Short_%ROW%" checked="checked" /><label for="includeRegion_{$slug}_Short_%ROW%" id="includeRegion_{$slug}_ShortLabel_%ROW%"
				class="suboptionActive">Short</label></span>
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
