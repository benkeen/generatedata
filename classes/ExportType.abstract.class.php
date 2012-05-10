<?php


abstract class ExportType {

	protected $exportTypeName = "";


	/**
	 * This does the job of actually generating the data in the appropriate format. It's fed all the information that
	 * the Export Type needs.
	 */
	abstract function generator($numResults, $columns, $data);


	/**
	 * Outputs any additional headers, prior to the generator() call.
	 */
	public function outputHeaders() {
		return;
	}


  /**
   * If the export type needs to display any additional settings in the UI (like XML, CSV or SQL does), this function
   * should return.
   */
	public function getSettings() {
		return "";
	}


	/**
	 * Returns the name of the Export Type in the current language.
	 */
	public final function getName() {
		return $this->exportTypeName;
	}
}