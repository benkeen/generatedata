<?php

/**
 * This is used on the generate page to output raw markup into the page for use by the generator.
 *
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_data_type_resources($params, &$smarty) {

	$resources = DataTypePluginHelper::getDataTypeResources();

	for ($i=0; $i<count($resources); $i++) {

		$currDataTypeResource = $resources[$i];

		// examples HTML
		echo "<div id=\"dt_example_\">{$currDataTypeResource["example"]}</div>";

		// options HTML
		echo "<div id=\"dt_options_\">{$currDataTypeResource["options"]}</div>";

		// help popup
		echo "<div id=\"dt_help_\">{$currDataTypeResource["help"]}</div>";

									// settings for the help popup
	//								echo <<<EOF
//										<script>
	//									Generator.dataTypes["$dt_ns"] = {
		//									width: {$data_type_info["help_popup_width"]}
			//							}
				//						</script>
//EOF;
		//						}

	}

}
