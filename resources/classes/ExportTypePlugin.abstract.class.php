<?php


/**
 * Our base class for all Export Type plugins. All Export Types must define a class that extends this class.
 * This page documents and defines (where the language permits!) what's required, what's optional, and
 * what each method and member variable does.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 * @abstract
 */
abstract class ExportTypePlugin {

	// REQUIRED MEMBER VARS

	/**
	 * The name of the export type "HTML", "XML" etc. This is always in English; even in different languages,
	 * "JSON" is still "JSON", so having no translation is acceptable here.
	 * @var string
	 */
	protected $exportTypeName = "";


	// OPTIONAL MEMBER VARS

	/**
	 * Used during development. Only Export Types that have $isEnabled == true will get listed in the Data
	 * Generator for use.
	 * @var boolean
	 */
	protected $isEnabled = true;

	/**
	 * An array of JS modules that need to be included for this module. They should be requireJS-friendly
	 * modules.
	 * @var array
	 */
	protected $jsModules = array();

	/**
	 * An array of CSS files for any additional CSS needed for the module. It's up to the developer to properly
	 * name their CSS classes/IDs to prevent namespace collisions.
	 */
	protected $cssFiles = array();

	/**
	 * An array of whatever CodeMirror modes (the syntax highlighter) this Export Type needs. This ensures they're
	 * all loaded at runtime for use in the generator.
	 * @var array
	 */
	protected $codeMirrorModes = array();

	/**
	 * Needed for the "prompt for download" export option. This should contain the standard Content-Type header
	 * value (like "text/html") of the generated content, so the browser knows what to do with the downloaded file.
	 * @var string
	 */
	protected $contentTypeHeader;

	/**
	 * Export Types *should* be able to handle all three Export Targets available in the page (in-page, new window/tab, 
	 * prompt for download), but if they can't, they should specify this var. The system will automatically grey 
	 * out those options that aren't selectable as soon as the user selects the Export Type.
	 * @var string
	 */
	protected $compatibleExportTargets = array("inPage", "newTab", "promptDownload");

	/**
	 * Contains all strings for the current language. This is populated automatically on instantiation and
	 * contains the strings for the currently selected language.
	 * @var array
	 */
	public $L = array();



	// 1. REQUIRED METHODS

	/**
	 * This does the job of actually generating the data in the appropriate format. It's fed the instantiated
	 * Generator class, containing the various information the Export Type could need.
	 *
	 * @param Generator $generator
	 * @return array
	 */
	abstract function generate($generator);

	/**
	 * Used for the "prompt for download" option for all Export Types. This function needs to return the
	 * filename of the downloadable file. It can either be "clever" and construct a filename based on the
	 * current data being generated, or simple: the same filename each time. It doesn't matter: purely a
	 * matter of preference.
	 * @param Generator $generator
	 * @return string
	 */
	abstract function getDownloadFilename($generator);


	// 2. OPTIONALLY DEFINED FUNCTIONS

	/**
	 * Our default constructor. This populates $L for the instantiated class. Export Types
	 * are constructed when the main generator UI page loads; for actual code generation, their generate()
	 * function is called.
	 */
	public function __construct($runtimeContext) {

		// a little magic to find the current instantiated class's folder
		$currClass = new ReflectionClass(get_class($this));
		$currClassFolder = dirname($currClass->getFileName());

		$defaultLangFileStr = Core::getDefaultLanguageFile();
		$defaultLangFile = $currClassFolder . "/lang/" . $defaultLangFileStr . ".php";

		$currentLangFileStr = Core::$language->getCurrentLanguageFile();
		$currentLangFile = $currClassFolder . "/lang/" . $currentLangFileStr . ".php";

		if (file_exists($currentLangFile)) {
			require($currentLangFile);
		} else if (file_exists($defaultLangFile)) {
			require($defaultLangFile);
		}

		if (isset($L)) {
			$this->L = $L;
		}
	}

	/**
	 * This is called once during the initial installation of the script, or when the installation is reset (which is
	 * effectively a fresh install). It is called AFTER the Core tables are installed, and you can rely
	 * on Core::$db having been initialized and the database connection having been set up.
	 *
	 * @return array [0] success / Error
	 * 				 [1] the error message, if there was a problem
	 */
	static function install() {
		return array(true, "");
	}

	/**
	 * If the Export Type needs to display any additional settings in the UI (like XML, CSV or SQL does), it needs
	 * to define this function which return the markup. The hiding/showing of the appropriate section happens automatically.
	 * @return string
	 */
	public function getAdditionalSettingsHTML() {
		return "";
	}


	// 3. NON-OVERRIDABLE FUNCTIONS

	/**
	 * Returns the name of the Export Type in the current language.
	 * @return string
	 */
	public final function getName() {
		return (isset($this->L["EXPORT_TYPE_NAME"])) ? $this->L["EXPORT_TYPE_NAME"] : $this->exportTypeName;
	}

	/**
	 * Returns a list of all javascript modules for this Export Type.
	 * @return array
	 */
	public final function getJSModules() {
		return $this->jsModules;
	}

	/**
	 * Returns the CSS filename for this Data Type (if included).
	 * @return array
	 */
	public final function getCSSFiles() {
		return $this->cssFiles;
	}

	/**
	 * Returns the Export Type folder.
	 * @return string
	 */
	public final function getFolder() {
		return $this->folder;
	}

	/**
	 * Returns the path from the generatedata root folder. That value is automatically created
	 * for each module when it it instantiated.
	 * @return string
	 */
	public final function getPath() {
		return $this->path;
	}

	/**
	 * @return string
	 */
	public final function getContentTypeHeader() {
		return $this->contentTypeHeader;
	}

	/**
	 * @return array
	 */
	public final function getCodeMirrorModes() {
		return $this->codeMirrorModes;
	}

	/**
	 * @return array
	 */
	public final function getCompatibleExportTargets() {
		return $this->compatibleExportTargets;
	}

	/**
	 * Returns the isEnabled flag for this class.
	 * @return boolean
	 */
	public final function isEnabled() {
		return $this->isEnabled;
	}
}
