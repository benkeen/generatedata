<?php

/**
 * Used in the Settings tab to output a list of available dropdowns. This is enhanced client-side with
 * the Chosen plugin.
 */
function smarty_function_data_types_list($params, &$smarty) {
	$L = Core::$language->getCurrentLanguageStrings();
	$dataTypeGroups = Core::$dataTypePlugins;

	$html = "<ul>\n";
	while (list($group, $dataTypes) = each($dataTypeGroups)) {
		$groupName = $L[$group];
		$html .= "<li class=\"gdDataTypeHeader\">$groupName</li>";

		foreach ($dataTypes as $dataType) {
			$dataTypeName = $dataType->getName();
			$moduleID = "data-type-{$dataType->folder}";
			$html .= "<li data-module=\"$moduleID\"><a href=\"#\">$dataTypeName</a></li>\n";
		}
	}
	$html .= "</ul>";

	echo $html;
}