<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
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
					"help" => $dataType->getHelpHTML()
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
	public static function getDataTypeList($groupedDataTypes) {
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
	public static function getDataTypeHash($groupedDataTypes) {
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
	 * @param $dataTypes
	 * @param string $format
	 * @param string $pathRoot
	 * @return array|string
	 */
	public static function getDataTypeJSResources($dataTypes, $format = "string", $pathRoot = "") {
		$files = array();
		foreach ($dataTypes as $dataType) {
			$jsModules = $dataType->getJSModules();
			$path      = $dataType->getPath();
			for ($i=0; $i<count($jsModules); $i++) {
				$files[] = "{$pathRoot}$path/{$jsModules[$i]}";
			}
		}

		$returnVal = "";
		if ($format == "string") {
			if (!empty($files)) {
				$returnVal = "\"" . implode("\",\n\"", $files) . "\"";
			}
		} else {
			$returnVal = $files;
		}

		return $returnVal;
	}


	/**
	 * Used in the main page to generate the Data Type CSS includes.
	 * @param array the data types
	 * @param array
	 */
	public static function getDataTypeCSSIncludes($dataTypes) {
		$files = array();
		foreach ($dataTypes as $dataType) {
			$cssFiles = $dataType->getCSSFiles();
			if (!empty($cssFiles)) {
				$path = $dataType->getPath();
				foreach ($cssFiles as $file) {
					$files[] = "$path/$file";
				}
			}
		}

		$cssIncludes = "";
		foreach ($files as $file) {
			$cssIncludes[] = "<link rel=\"stylesheet\" type=\"text/css\" href=\"$file\" />";
		}
		return implode("\n", $cssIncludes);
	}

	/**
	 * Returns an array of available, grouped, instantiated Data Type objects.
	 * @param string
	 * @param boolean
	 * @return array
	 */
	public static function getDataTypePlugins($runtimeContext, $installedOnly = true) {
		$allowedDataTypes = array();
		if ($installedOnly) {
			$installedDataTypes = Settings::getSetting("installedDataTypes");
			$allowedDataTypes = explode(",", $installedDataTypes);
		}

		$dataTypesFolder = realpath(__DIR__ . "/../../plugins/dataTypes");
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
					if ($obj != null && $obj !== false) {
						$folders = explode(DIRECTORY_SEPARATOR, $dataTypesFolder . DIRECTORY_SEPARATOR . $item);
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
	 * @param $runtimeContext
	 * @param $baseFolder
	 * @param $dataTypeFolderName
	 * @internal param $string
	 * @internal param $string
	 * @internal param $string
	 * @return object
	 */
	private function instantiateDataType($runtimeContext, $baseFolder, $dataTypeFolderName) {

		$dataTypeClassFileName = "{$dataTypeFolderName}.class.php";
		if (!is_file("$baseFolder/$dataTypeFolderName/$dataTypeClassFileName")) {
			return false;
		}

		// now try to include and instantiate the class [bug...]
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

		// if the class enabled? If not, it's not ready for prime-time
		if (!$instance->isEnabled()) {
			return false;
		}

		return $instance;
	}
}
