<?php


class Excel extends ExportTypePlugin {
	protected $exportTypeName = "Excel";
	protected $rowLabelTranslationKey = "row_label";
	protected $jsModules = array("Excel.js");

	function generator($numResults, $columns, $data) {

	}
}