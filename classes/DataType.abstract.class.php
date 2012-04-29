<?php

/**
 * Our base class for all Data Type plugins. All Data Type plugins must define a class that
 * extends this class, to ensure all required functions and properties are in place. If the Data Type doesn't
 * extend the class, it won't be accepted.
 */
abstract class DataType {

	/**
	 * This is required, even if you don't have any installation code to perform. It's called once, during the
	 * initial installation of the script. It is called AFTER the Core tables are installed, and you can rely
	 * on Core::$db having been initialized, and the database connection having been set up. For robustness,
	 * all Data Type modules should throw a GDException in the event of a problem during creation of database
	 * tables. If a problem occurs, all tables created are rolled back and an appropriate error message is displayed
	 * to the user. If no problems occur, this method should return and do nothing.
	 */
	abstract static function install();

  /**
   * This returns the field group that this Data Type should be listed in. See the Core::$dataTypeGroups for the
   * available options.
   *
   * @return string
   */
	abstract function getDataTypeFieldGroup();

	/**
	 * Returns the order within the field group that this Data Type should appear.
	 *
	 * @return integer
	 */
	abstract function getDataTypeFieldGroupOrder();

	/**
	 * Returns the order in which this data type should be parsed. The generator does N number of passes for each
	 * row of data generated, each pass processes whatever data types are . This allows
	 */
  abstract function getProcessOrder();

	/**
	 * Called by process.php during data generation. This determines what options the user selected in the user
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
	 * @return array a hash of ... [TODO]
	 */
	abstract function getTemplateOptions($postdata, $column, $numCols);

	/**
	 * For this data type, row # and metadata aren't needed.
	 *
	 * @param integer $row the row number in the generated content
	 * @param mixed $options whatever options were passed for this Data Type. This could be any data type.
	 * @param array $metadata
	 * @return string
	 */
	abstract function generateItem($row, $options, $existingRowData);

	/**
	 * For this data type, row # and metadata aren't needed.
	 *
	 * @param string $export_type e.g. "sql"
	 * @param mixed $options e.g. "mysql" or "oracle"
	 * @return string
	 */
	abstract function getExportTypeInfo($exportType, $options);

	/**
	 * Returns true if this Data Type has a help dialog.
	 *
	 * @return boolean
	 */
	abstract function hasHelpDialog();

	/**
	 * Returns information about the help dialog for this Data Type. It returns a hash with two keys:
	 *    [dialogWidth]
	 *    [content]
	 *
	 * [shouldn't be required... just like install(), but I'd like to mention it in this file for documentation purposes]
	 *
	 */
  abstract function getHelpDialogInfo();

}
