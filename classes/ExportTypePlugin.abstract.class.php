<?php


abstract class ExportTypePlugin {

	protected $exportTypeName = "";
	protected $jsModules = array();

	/**
	 * This does the job of actually generating the data in the appropriate format. It's fed all the information that
	 * the Export Type needs.
	 */
	abstract function generator($numResults, $columns, $data);

	/**
	 * Outputs any additional headers, prior to the generator() call.
	 *
	 * TODO rename
	 */
	public function outputHeaders() {
		return;
	}

	/**
	 * If the Export Type needs to display any additional settings in the UI (like XML, CSV or SQL does), it needs
	 * to define this function which return the markup. The hiding/showing of the appropriate section happens automatically.
	 * @return string
	 */
	public function getAdditionalSettingsHTML() {
		return "";
	}

	/**
	 * Returns a list of all javascript modules for this Export Type.
	 * @return array
	 */
	public final function getJSModules() {
		return $this->jsModules;
	}

	/**
	 * Returns the name of the Export Type in the current language.
	 * @return string
	 */
	public final function getName() {
		return $this->exportTypeName;
	}

	/**
	 * Returns the path from the generatedata root folder. That value is automatically created
	 * for each module when it it instantiated.
	 * @return string
	 */
	public final function getPath() {
		return $this->path;
	}
}
