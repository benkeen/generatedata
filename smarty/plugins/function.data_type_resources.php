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
		echo "<div id=\"gdDataTypeExamples_{$currDataTypeResource["folder"]}\">{$currDataTypeResource["examples"]}</div>";

		// options HTML
		echo "<div id=\"gdDataTypeOptions_{$currDataTypeResource["folder"]}\">{$currDataTypeResource["options"]}</div>";

		// help popup
		echo "<div id=\"gdDataTypeHelp\" data-dialog-height=\"{$currDataTypeResource["help"]["dialogWidth"]}\">{$currDataTypeResource["help"]["content"]}</div>";
	}
}
