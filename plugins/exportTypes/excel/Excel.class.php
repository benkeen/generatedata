<?php


class Excel extends ExportTypePlugin {
	protected $exportTypeName = "Excel";
	protected $jsModules = array("Excel.js");

	function generator($numResults, $columns, $data) {

	}
}