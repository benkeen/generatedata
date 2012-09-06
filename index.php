<?php

require_once("library.php");

if (isset($_POST["updateSettings"])) {
	Settings::updateSettings($_POST);
}

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);

$jsModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes);
$exportTypeJSModules = "";
if (!empty($jsModules)) {
	$exportTypeJSModules = "\"" . implode("\",\n\"", $jsModules) . "\"";
}

$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
$jsModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes);
$dataTypeJSModules = "";
if (!empty($jsModules)) {
	$dataTypeJSModules = "\"" . implode("\",\n\"", $jsModules) . "\"";
}

$params = array();
$params["dataTypeJSModules"] = $dataTypeJSModules;
$params["exportTypeJSModules"] = $exportTypeJSModules;
$params["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;
$params["settings"] = Settings::getSettings();

Utils::displayPage("templates/index.tpl", $params);