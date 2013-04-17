<?php

require_once("library.php");
Core::init();

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

if (!Core::checkIsLoggedIn()) {
	header("location: login.php#t1");
	exit;
}

$pageParams = array();
if (isset($_POST["updateSettings"])) {
	list($success, $message) = Settings::updateSettings($_POST);
	$pageParams["success"] = $success;
	$pageParams["message"] = $message;
}

$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);
$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);

$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes, "string", true);
$exportTypeCssIncludes = ExportTypePluginHelper::getExportTypeCSSIncludes($exportTypes);
$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes, "string", true);
$dataTypeCssIncludes = DataTypePluginHelper::getDataTypeCSSIncludes($dataTypes);
$cssIncludes = $exportTypeCssIncludes . "\n" . $dataTypeCssIncludes;

$pageParams["dataTypeJSModules"] = $dataTypeJSModules;
$pageParams["exportTypeJSModules"] = $exportTypeJSModules;
$pageParams["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;
$pageParams["settings"] = Settings::getSettings();
$pageParams["cssIncludes"] = $cssIncludes;
$pageParams["codeMirrorIncludes"] = ExportTypePluginHelper::getExportTypeCodeMirrorModes($exportTypes);
$pageParams["defaultExportType"] = Core::getDefaultExportType();
$pageParams["accountType"] = Core::$user->getAccountType();

Templates::displayPage("resources/templates/index.tpl", $pageParams);