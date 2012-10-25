<?php


class DataTypePluginHelper {

	/**
	 * Used in the main generator page to output raw HTML content into the page for use
	 * by the dynamic generator table to insert/update the appropriate row based on the selected
	 * Data Type.
	 *
	 * @return array
	 */
	public function getDataTypeResources() {
		$dataTypeGroups = Core::$dataTypePlugins;
		$resources = array();
		while (list($group, $dataTypes) = each($dataTypeGroups)) {
			foreach ($dataTypes as $dataType) {
				$resources[] = array(
					"folder" => $dataType->folder,
					"examples" => $dataType->getExampleColumnHTML(),
					"options" => $dataType->getOptionsColumnHTML(),
					"help" => $dataType->getHelpDialogInfo()
				);
			}
		}

		return $resources;
	}


	/**
	 * Helper function to convert the data types that are grouped in Core::$dataTypePlugins into
	 * a simple array, where order is not important.
	 * @param array $groupedDataTypes
	 * @return array
	 */
	public function getDataTypeList($groupedDataTypes) {
		$list = array();
		while (list($group_name, $dataTypes) = each($groupedDataTypes)) {
			foreach ($dataTypes as $dataType) {
				$list[] = $dataType;
			}
		}
		return $list;
	}

	/**
	 * A second helper function to convert the data types that are grouepd in Core::$dataTypePlugins
	 * into a hash of [Data Type Folder] => object
	 * @param array $groupedDataTypes
	 * @return array
	 */
	public function getDataTypeHash($groupedDataTypes) {
		$hash = array();
		while (list($group_name, $dataTypes) = each($groupedDataTypes)) {
			foreach ($dataTypes as $dataType) {
				$hash[$dataType->folder] = $dataType;
			}
		}
		return $hash;
	}


	/**
	 * Used in the main page to generate a list of Export Type JS files.
	 * @param array the data types
	 * @return array
	 */
	public function getDataTypeJSResources($dataTypes) {
		$files = array();
		foreach ($dataTypes as $dataType) {
			$jsModules = $dataType->getJSModules();
			$path      = $dataType->getPath();
			for ($i=0; $i<count($jsModules); $i++) {
				$files[] = "$path/{$jsModules[$i]}";
			}
		}

		$dataTypeJSModules = "";
		if (!empty($files)) {
			$dataTypeJSModules = "\"" . implode("\",\n\"", $files) . "\"";
		}

		return $dataTypeJSModules;
	}


	/**
	 * Used in the main page to generate the Data Type CSS includes.
	 * @param array the data types
	 * @param array
	 */
	public function getDataTypeCSSIncludes($dataTypes) {
		$files = array();
		foreach ($dataTypes as $dataType) {
			$cssFile = $dataType->getCSSFile();
			if (!empty($cssFile)) {
				$path = $dataType->getPath();
				$files[] = "$path/$cssFile";
			}
		}

		$cssIncludes = "";
		foreach ($files as $file) {
			$cssIncludes[] = "<link rel=\"stylesheet\" type=\"text/css\" href=\"$file\" />";
		}
		return implode("\n", $cssIncludes);
	}

	/**
	 * Used for sorting the data set template, created by gd_get_data_set_template().
	 *
	 * @param array $template
	function sortByColOrder($template) {
		$ordered = array();
		while (list($order, $data_types) = each($template)) {
			foreach ($data_types as $data_type) {
				$order = $data_type["column_num"];
				$ordered["order$order"] = $data_type;
			}
		}
		asort($ordered);
		return array_values($ordered);
	}
	*/

	/**
	 * Returns an array of available, grouped, instantiated Data Type objects.
	 * @return array
	 */
	function getDataTypePlugins($runtimeContext, $installedOnly = true) {
		$allowedDataTypes = array();
		if ($installedOnly) {
			$installedDataTypes = Settings::getSetting("installedDataTypes");
			$allowedDataTypes = explode(",", $installedDataTypes);
		}

		$dataTypesFolder = realpath(dirname(__FILE__) . "/../plugins/dataTypes");
		$dataTypes = array();
		if ($handle = opendir($dataTypesFolder)) {
			while (false !== ($item = readdir($handle))) {
				if ($item == "." || $item == ".." || $item == ".svn") {
					continue;
				}
				if (!empty($allowedDataTypes) && !in_array($item, $allowedDataTypes)) {
					continue;
				}
				if (is_dir("$dataTypesFolder/$item")) {
					$obj = self::instantiateDataType($runtimeContext, $dataTypesFolder, $item);
					if ($obj != null) {
						$folders = explode(DIRECTORY_SEPARATOR, "$dataTypesFolder/$item");
						$folders = array_reverse($folders);

						$obj->path = "{$folders[2]}/{$folders[1]}/{$folders[0]}";
						$obj->folder = $item;
						$dataTypes[] = $obj;
					}
				}
			}
			closedir($handle);
		}

		// now sort the data type information by field groups first and their order within those
		// field groups
		$dataTypeGroups = Core::getDataTypeGroups();
		$sortedDataTypes = array();
		foreach ($dataTypeGroups as $groupNameKey) {
			$groupTypes = array();
			foreach ($dataTypes as $currDataType) {
				$currFieldGroupKey   = $currDataType->getDataTypeFieldGroup();
				$currFieldGroupOrder = $currDataType->getDataTypeFieldGroupOrder();

				if ($currFieldGroupKey == $groupNameKey) {
					// TODO this prevents two DataTypes using the same order, which leads to accidental bugs
					$groupTypes[$currFieldGroupOrder] = $currDataType;
				}
			}
			ksort($groupTypes, SORT_NUMERIC);
			$sortedDataTypes[$groupNameKey] = array_values($groupTypes);
		}

		return $sortedDataTypes;
	}


	/**
	 * Instantiates and returns a Data Type object.
	 *
	 * @param string $baseFolder
	 * @param string $dataTypeFolderName
	 */
	private function instantiateDataType($runtimeContext, $baseFolder, $dataTypeFolderName) {

		$dataTypeClassFileName = "{$dataTypeFolderName}.class.php";
		if (!is_file("$baseFolder/$dataTypeFolderName/$dataTypeClassFileName")) {
			return false;
		}

		// now try to include and instantiate the class [bug...
		try {
			include("$baseFolder/$dataTypeFolderName/$dataTypeClassFileName");
		} catch (Exception $e) {
			return false;
		}

		$className = "DataType_$dataTypeFolderName";
		if (!class_exists($className)) {
			return false;
		}


		$instance = null;
		try {
			$instance = new $className($runtimeContext);
		} catch (Exception $e) {

			return false;
		}

		// enforce inheritance of the abstract DataType class
		if (!($instance instanceof DataTypePlugin)) {
			return false;
		}

		return $instance;
	}
}
