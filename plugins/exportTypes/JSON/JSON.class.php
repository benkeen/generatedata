<?php


class JSON extends ExportTypePlugin {
	protected $exportTypeName = "JSON";
	protected $jsModules = array("JSON.js");
	public $L = array();

	function generate($generator) {

	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.json";
	}
}
