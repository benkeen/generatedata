<?php

require_once("library.php");

if (isset($_POST["updateSettings"])) {
	Settings::updateSettings($_POST);
}

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);

$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);

$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes);
$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes);
$cssIncludes = DataTypePluginHelper::getDataTypeCSSIncludes($dataTypes);

$params = array();
$params["dataTypeJSModules"] = $dataTypeJSModules;
$params["exportTypeJSModules"] = $exportTypeJSModules;
$params["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;
$params["settings"] = Settings::getSettings();
$params["cssIncludes"] = $cssIncludes;

Utils::displayPage("templates/index.tpl", $params);