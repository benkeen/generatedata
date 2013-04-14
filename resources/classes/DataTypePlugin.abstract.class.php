<?php


/**
 * Our base class for all Data Type plugins. All Data Types must define a class that extends this class.
 * This page documents and defines (where the language permits!) what's required, what's optional, and
 * what each method and member variable does.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 * @abstract
 */
abstract class DataTypePlugin {


	// REQUIRED MEMBER VARS
	protected $dataTypeName = "";
	protected $dataTypeFieldGroup; // string
	protected $dataTypeFieldGroupOrder; // int


	// OPTIONAL MEMBER VARS
	protected $isEnabled = true;
	protected $processOrder = 1; // int

	/**
	 * An array of JS modules that need to be included for this module. They should be requireJS-friendly
	 * modules.
	 * @var array
	 */
	protected $jsModules = array();

	/**
	 * A single CSS file for any additional CSS needed for the module. It's up to the developer to properly
	 * name their CSS classes/IDs to prevent namespace collisions.
	 */
	protected $cssFiles = array();

	/**
	 * Contains all strings for the current language. This is populated automatically on instantiation and
	 * contains the strings for the currently selected language.
	 * @var array
	 */
	public $L = array();


	// REQUIRED METHODS

	/**
	 * This is the main workhorse function: it does the work of actually generating a random data snippet.
	 *
	 * @param object $generator the Generator object, through which a Data Type can call the various
	 *     available public methods.
	 * @param array $generationContextData a hash of information relating to the generation context. Namely:
	 *     "rowNum"             => the row number in the generated content (indexed from 1)
	 *     "generationOptions"  => whatever options were passed for this particular row and data type; i.e.
	 *                             whatever information was returned by getRowGenerationOptions(). This data
	 *                             can be empty or contain anything needed - in whatever format. By default,
	 *                             this is set to null.
	 *     "existingRowData"    => data already generated for the row.
	 * @return array Data Types have to return a hash with at least one key: "display". They can also load up
	 *     the hash with whatever else they want, if they want to provide additional meta data to other Data
	 *     Types that are being generated on that row (e.g. Country, passing it's country_slug info to Region)
	 */
	abstract function generate($generator, $generationContextData);


	// 2. OPTIONALLY DEFINED FUNCTIONS

	/**
	 * The default constructor. Automatically populates the $L member var with whatever language is currently being
	 * used. If a Data Type uses its own constructor, it should always call the parent constructor as well, to ensure
	 * $L is populated. ( parent::__construct($runtimeContext); )
	 *
	 * @param string $content "ui" / "generation". Data Types are instantiated in one of two contexts: once when
	 *    the main UI page loads, so that the Data Type can be presented as an option for selection in the Data
	 *    Generator, and secondly when we're actually actually generating the results. It's sometimes beneficial
	 *    to only instantiate aspects of the class depending on the context.
	 */
	public function __construct($runtimeContext) {

		// a little magic to find the current instantiated class's folder
		$currClass = new ReflectionClass(get_class($this));
		$currClassFolder = dirname($currClass->getFileName());

		$defaultLangFileStr = Core::getDefaultLanguageFile();
		$currentLangFileStr = Core::$language->getCurrentLanguageFile();

		$currentLangFile = $currClassFolder . "/lang/" . $currentLangFileStr . ".php";
		$defaultLangFile = $currClassFolder . "/lang/" . $defaultLangFileStr . ".php";

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
	 * @return array [0] success / error
	 * 				 [1] the error message, if there was a problem
	 */
	static function install() {
		return array(true, "");
	}

	/**
	 * If the Data Type wants to include something in the Example column, it should return the raw HTML via this function.
	 * If this function isn't defined (or it returns an empty string), the string "No examples available." will be
	 * outputted in the cell. This is used for inserting static content into the appropriate spot in the table; if the
	 * Data Type needs something more dynamic, it should subscribe to the appropriate event.
	 */
	public function getExampleColumnHTML() {
		return "";
	}

	/**
	 * If the Data Type wants to include something in the Options column, it must return the HTML via this function.
	 * If this function isn't defined (or it returns an empty string), the string "No options available." will be
	 * outputted in the cell. This is used for inserting static content into the appropriate spot in the table; if the
	 * Data Type needs something more dynamic, it should subscribe to the appropriate event.
	 */
	public function getOptionsColumnHTML() {
		return "";
	}

	/**
	 * Returns the help content for this Data Type (HTML / string).
	 */
	public function getHelpHTML() {
		return "<p>No help available.</p>";
	}


	/**
	 * Called during data generation. This determines what options the user selected in the user interface; it's
	 * used to figure out what settings to pass to each Data Type to provide that function the information needed
	 * to generate that particular data item.
	 *
	 * Note: if this function determines that the values entered by the user in the options column are invalid
	 * (most likely just incomplete) the function can explicitly return false to tell the core script to ignore
	 * this row.
	 *
	 * @param object $generator the instance of the Generator object, containing assorted public methods
	 * @param array $post the entire contents of $_POST
	 * @param integer the column number (*row* in the UI...!) of the item
	 * @param integer the number of columns in the data set
	 * @return mixed
	 *        - false, if the Data Type doesn't have sufficient information to generate the row (i.e. things weren't
	 *        filled in in the UI and the Data Type didn't add proper validation)
	 *        - anything else. This can be any data structure needed by the Data Type. It'll be passed as-is
	 *        into the generateItem function as the second parameter.
	 */
	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		return null;
	}

	/**
	 * Used for providing additional metadata about the Data Type for use during generation. Right now this
	 * is only used to pass additional data to the SQL Export Type so it can intelligently create a CREATE TABLE
	 * statement with database column types and sizes that are appropriate to each field type.
	 * @return array
	 */
	public function getDataTypeMetadata() {
		return array();
	}

	/**
	 * For debugging and dev work.
	 */
	public function __toString() {
		echo $this->getName();
	}


	// 3. NON-OVERRIDABLE FUNCTIONS
	// - these are automatically inherited by all Data Types when they extend this abstract class.


	final public function getName() {
		return (isset($this->L["DATA_TYPE_NAME"])) ? $this->L["DATA_TYPE_NAME"] : $this->dataTypeName;
	}

	/**
	 * Returns an array of file names, which will be included ONCE in the main generator page.
	 *
	 * @return array
	 */
	final public function getIncludedFiles() {
		return $this->includedFiles;
	}

	/**
	 * This returns the field group that this Data Type should be listed in. See the Core::$dataTypeGroups for the
	 * available options.
	 *
	 * @return string
	 */
	final public function getDataTypeFieldGroup() {
		return $this->dataTypeFieldGroup;
	}

	/**
	 * Returns the order within the field group that this Data Type should appear.
	 *
	 * @return integer
	 */
	final public function getDataTypeFieldGroupOrder() {
		return $this->dataTypeFieldGroupOrder;
	}

	/**
	 * Returns the order in which this data type should be parsed. The generator does N number of passes for each
	 * row of data generated, each pass processes whatever data types are ...
	 *
	 * @return integer
	 */
	final public function getProcessOrder() {
		return $this->processOrder;
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
	 * Returns a list of all javascript modules for this Data Type (if included).
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
	 * Returns the isEnabled flag for this class.
	 * @return boolean
	 */
	public final function isEnabled() {
		return $this->isEnabled;
	}
}
