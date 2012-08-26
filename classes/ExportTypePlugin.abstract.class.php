<?php


abstract class ExportTypePlugin {

	/**
	 * The name of the export type "HTML", "XML" etc. This is always in English; even in different languages,
	 * "JSON" is still "JSON", so having no translation is acceptable here.
	 * @var string
	 */
	protected $exportTypeName = "";

	/**
	 * This governs the label that should appear on the second column of the data generator table: the label
	 * for the row. e.g. for HTML, CSV is would be "Column Title", for SQL it would be "Table column" etc.
	 * This specifies the translation key for the label, found in the /plugins/exportTpypes/[export type]/lang/[lang].php
	 * file.
	 * @var string
	 */
	protected $rowLabelTranslationKey = "";

	/**
	 * An array of JS modules that need to be included for this module. They should be requireJS-friendly
	 * modules.
	 */
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
