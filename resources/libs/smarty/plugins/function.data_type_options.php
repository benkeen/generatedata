<?php

/**
 * This is used on the generate page to output raw markup into the page for use by the generator.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_data_type_options($params, &$smarty) {
	$resources = DataTypePluginHelper::getDataTypeResources();
	for ($i=0; $i<count($resources); $i++) {
		$currDataTypeResource = $resources[$i];
		echo "<div id=\"gdDataTypeOptions_data-type-{$currDataTypeResource["folder"]}\">{$currDataTypeResource["options"]}</div>";
	}
}
