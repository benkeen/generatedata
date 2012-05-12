<?php


class DataTypePluginHelper {

	/**
	 * [TODO re-write blurb.]
	 *
	 * This function creates a "template" of the data set to be generated. It's an ordered array of hashes, with
	 * the hashes having the following values:
	 *
	 *     $title            - whatever string is being used for the column title / node name / etc.
	 *     $type             - the namespace (folder name) of the data type
	 *     $options          - whatever custom options
	 *     $has_dependencies - boolean true / false.
	 *
	 * The first two values are found right in the $_POST values, but the third is determined by the data
	 * type itself. It's expected that the data type has a generate.php function with a
	 * [NAMESPACE]_get_template_options() function.
	 *
	 * Once this function has generated the data set template, the individual result type pages (HTML, CSV etc)
	 * do the job of calling the
	 *
	 * @param array $hash
	 * @param integer $numCols
	 * @return array
	 */
	private function getDataSetTemplate($hash, $num_cols) {
	  $row_order = $hash["rowOrder"];
	  $row_numbers = explode(",", $row_order);

	  // find out what the user wants to generate
	  $info = array();
	  $order = 1;
	  foreach ($row_numbers as $i) {
	    $title = $hash["title_$i"];
	    $type  = $hash["type_$i"];

	    // if there's no type, the field just wasn't filled in. Ignore the row
	    if (empty($type)) {
	      continue;
	    }

	    // make a note of the process order
	    $process_order = 1;
	    $process_order_varname = "{$type}_process_order";
	    global $$process_order_varname;
	    if (!empty($$process_order_varname)) {
	      $process_order = $$process_order_varname;
	    }

	    // this data type may or may not have options. If it does, it'll have a ..._get_template_options
	    // function defined to return them
	    $data_type_function = "{$type}_get_template_options";
	    $options = "";

	    if (function_exists($data_type_function)) {
	      $options = $data_type_function($hash, $i, $num_cols);
	    }

	    if ($options !== false) {
	      if (!array_key_exists("process_order$process_order", $info)) {
	        $info["process_order$process_order"] = array();
	      }
	      $info["process_order$process_order"][] = array(
	        "column_num"       => $order,
	        "title"            => $title,
	        "data_type_folder" => $type,
	        "options"          => $options
	      );
	    }
	    $order++;
	  }

	  // sort by process order and return
	  ksort($info);

	  return $info;
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
	 * Returns an array of available, instantiated Data Type objects.
	 */
	function getDataTypePlugins() {
	  $dataTypesFolder = realpath(dirname(__FILE__) . "/../plugins/dataTypes");
	  $dataTypes = array();
	  if ($handle = opendir($dataTypesFolder)) {
	    while (false !== ($item = readdir($handle))) {
	      if ($item == "." || $item == ".." || $item == ".svn") {
	        continue;
	      }
	      if (is_dir("$dataTypesFolder/$item")) {
	        $obj = self::instantiateDataType($dataTypesFolder, $item);
	        if ($obj != null) {
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
	private function instantiateDataType($baseFolder, $dataTypeFolderName) {

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
      $instance = new $className();
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
