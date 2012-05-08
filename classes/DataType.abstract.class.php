<?php

/**
 * Our base class for all Data Type plugins. All Data Types must define a class that extends this class. This
 * page documents and defines (where the language permits!) what's required, what's optional, and what each
 * method and member variable does.
 */
abstract class DataType {

	// MUST be defined by each Data Type
	protected $dataTypeName = "";
  protected $hasHelpDialog; // boolean
  protected $dataTypeFieldGroup; // string
  protected $dataTypeFieldGroupOrder; // int
  protected $processOrder = 1; // int

  // OPTIONALLY defined by data types
  protected $includedFiles = array();


  // REQUIRED METHODS

	/**
	 * This is the main workhorse function: it does the work of actually generating a random data snippet.
	 *
	 * @param integer $row the row number in the generated content (indexed from 1)
	 * @param mixed $options whatever options were passed for this Data Type, i.e. whatever information was returned
	 *   - and in whatever format - by getTemplateOptions(). By default, this is set to null.
	 * @param array $existingRowData depending on the Data Type's processOrder, this will contain all the data from
	 *   fields that have already been processed.
	 * @return string/int/primitive
	 */
	abstract function generateItem($row, $options, $existingRowData);

	/**
	 * @param string $export_type e.g. "sql"
	 * @param mixed $options e.g. "mysql" or "oracle"
	 * @return string
	 */
	abstract function getExportTypeInfo($exportType, $options);


	// 2. OPTIONALLY DEFINED FUNCTIONS

	/**
	 * This is called once during the initial installation of the script, or when the installation is reset (which is
	 * effectively a fresh install). It is called AFTER the Core tables are installed, and you can rely
	 * on Core::$db having been initialized and the database connection having been set up. For robustness,
	 * all Data Type modules should throw a GDException in the event of a problem during creation of database
	 * tables. If a problem occurs, all tables created are rolled back and an appropriate error message is displayed
	 * to the user. If no problems occur, this method should return and do nothing.
	 */
	static function install() {
		return;
	}

  /**
   * If the Data Type wants to include something in the Example column, it must return the HTML via this function.
   * If this function isn't defined (or it returns an empty string), the string "No examples available." will be
   * outputted in the cell.
   *
   * @param integer $row the row number. Note: the visible row number may not be the same number that is displayed
   *   in the page. This number is used purely to uniquely identify the row for coding purposes.
   */
	public function getExampleColumnHTML($row) {
		return "";
	}

  /**
   * If the Data Type wants to include something in the Options column, it must return the HTML via this function.
   * If this function isn't defined (or it returns an empty string), the string "No options available." will be
   * outputted in the cell.
   *
   * @param integer $row the row number. Note: the visible row number may not be the same number that is displayed
   *   in the page. This number is used purely to uniquely identify the row for coding purposes.
   */
	public function getOptionsColumnHTML($row) {
		return "";
	}

	/**
	 * Called during data generation. This determines what options the user selected in the user
	 * interface; it's used to figure out what settings to pass to each Data Type to provide that function the
	 * information needed to generate that particular data item.
	 *
	 * Note: if this function determines that the values entered by the user in the options column are invalid
	 * (most likely just incomplete) the function can explicitly return false to tell the core script to ignore
	 * this row.
	 *
	 * @param array $post the entire contents of $_POST
	 * @param integer the column number (well, *row* in the UI!) of the item
	 * @param integer the number of columns in the data set
	 * @return array a hash of ... [TODO...]
	 */
	public function getTemplateOptions($postdata, $column, $numCols) { // TODO the name sucks...
		return null;
	}

	/**
	 * Returns information about the help dialog for this Data Type. It returns a hash with two keys:
	 *    [dialogWidth]
	 *    [content]
	 *
	 * [shouldn't be required... just like install(), but I'd like to mention it in this file for documentation purposes]
	 *
	 */
  public function getHelpDialogInfo() {
		return;
	}

	/**
	 * For debugging and dev work.
	 */
	public function __toString() {
	  echo $this->getName();
	}


  // 3. NON-OVERRIDABLE FUNCTIONS
  // - these are automatically inherited by all Data Types when they extend this abstract class. These simply
  // act as getters for the required private vars defined above

	final public function getName() { // TODO should return in current language...
		return $this->dataTypeName;
	}

	/**
	 * Returns true if this Data Type has a help dialog.
	 *
	 * @return boolean
	 */
	final public function hasHelpDialog() {
		return $this->hasHelpDialog;
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
}
