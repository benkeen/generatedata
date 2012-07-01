<?php

require_once("library.php");

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();


$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);

$jsModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes);
$exportTypeJSModules = "";
if (!empty($jsModules)) {
	$exportTypeJSModules = "\"" . implode("\",\n\"", $jsModules) . "\"";
}

$params = array();
$params["dataTypeJSModules"] = ""; // TODO
$params["exportTypeJSModules"] = $exportTypeJSModules;
$params["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;

Utils::displayPage("templates/index.tpl", $params);
