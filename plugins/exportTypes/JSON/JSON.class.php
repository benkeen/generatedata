<?php


class JSON extends ExportTypePlugin {
	protected $exportTypeName = "JSON";
	protected $jsModules = array("JSON.js");
	public $L = array();

	function generator($numResults, $columns, $data) {

	}
}
