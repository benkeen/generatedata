<?php

/**
 * Generates the list of available Export Types in tab format.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_export_type_tabs($params, &$smarty) {
	$defaultExportType = Core::getDefaultExportType();
	$exportTypes       = Core::$user->getExportTypePlugins();

	// if the default export type isn't selected for this particular user, select the first in the list. Assumption
	// if that there's always at least one Export Type
	$found = false;
	foreach ($exportTypes as $exportType) {
		$exportTypeClass = get_class($exportType);
		if ($exportTypeClass == $defaultExportType) {
			$found = true;
			break;
		}
	}
	if (!$found) {
		$defaultExportType = get_class($exportTypes[0]);
	}

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
