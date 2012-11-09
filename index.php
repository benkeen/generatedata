<?php

require_once("library.php");

Core::init();

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

$pageParams = array();
if (isset($_POST) && !empty($_POST)) {
	list($success, $message) = Settings::updateSettings($_POST);
	$pageParams["success"] = $success;
	$pageParams["message"] = $message;
}

$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);
$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);

$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes);
$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes);
$cssIncludes = DataTypePluginHelper::getDataTypeCSSIncludes($dataTypes);

$pageParams["dataTypeJSModules"] = $dataTypeJSModules;
$pageParams["exportTypeJSModules"] = $exportTypeJSModules;
$pageParams["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;
$pageParams["settings"] = Settings::getSettings();
$pageParams["cssIncludes"] = $cssIncludes;

Templates::displayPage("resources/templates/index.tpl", $pageParams);