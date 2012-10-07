<?php

/**
 * Our generator class. This does the work of interpreting the form data, passing the work off to the various
 * plugins and piecing the information together for returning to the client.
 */
class Generator {

	public function __construct($config) {

	}


	/**
	 * This function creates a "template" of the data set to be generated. It's an ordered array of hashes, with
	 * the hashes having the following values:
	 *
	 *     $title            - whatever string is being used for the column title / node name / etc.
	 *     $type             - the namespace (folder name) of the Data Type
	 *     $options          - whatever custom options
	 *     $has_dependencies - boolean true / false
	 *
	 * The first two values are found right in the $_POST values, but the third is determined by the data
	 * type itself. It's expected that the data type has a generate.php function with a
	 * [NAMESPACE]_get_template_options() function.
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

}
