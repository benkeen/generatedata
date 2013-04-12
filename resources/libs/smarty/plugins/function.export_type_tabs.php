<?php

/**
 * Generates the list of available Export Types in tab format.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_export_type_tabs($params, &$smarty) {
	$defaultExportType = Core::getDefaultExportType();
	$exportTypes       = Core::$exportTypePlugins;

	echo "<ul>";
	foreach ($exportTypes as $exportType) {
		$name       = $exportType->getName();
		$exportTypeClass = get_class($exportType);
		$class = ($defaultExportType == $exportTypeClass) ? "gdSelected gdDefaultExportType" : "";
		$exportTargets = implode(",", $exportType->getCompatibleExportTargets());
		echo "<li data-export-type=\"$exportTypeClass\" data-compatible-export-targets=\"$exportTargets\" id=\"gdExportType_$exportTypeClass\" class=\"$class\">$name</li>";
	}
	echo "</ul>";
}