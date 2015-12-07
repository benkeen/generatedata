<?php

require_once("library.php");
Core::init();

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

if (!Core::checkIsLoggedIn() && !Core::checkAllowMultiUserAnonymousUse()) {
	header("location: login.php#t1");
	exit;
}

// start piecing together all the various info we need to pass to the page
$pageParams = array();

$settings = Settings::getSettings();
$exportTypes = Core::$exportTypePlugins;
$exportTypeAdditionalSettings = ExportTypePluginHelper::getExportTypeAdditionalSettingsHTML($exportTypes);
$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes, "string");
$exportTypeCssIncludes = ExportTypePluginHelper::getExportTypeCSSIncludes($exportTypes);
$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes, "string");
$dataTypeCssIncludes = DataTypePluginHelper::getDataTypeCSSIncludes($dataTypes);
$cssIncludes = $exportTypeCssIncludes . "\n" . $dataTypeCssIncludes;

// used in the settings page
$pageParams["allCountryPlugins"] = Core::$countryPlugins;
$pageParams["allExportTypes"] = $exportTypes;
$pageParams["groupedDataTypes"] = Core::$dataTypePlugins;
$pageParams["allDataTypes"] = $dataTypes;
$pageParams["allTranslations"] = Core::$translations->getList();

$useMinifiedResources = Core::isUsingMinifiedResources();
$pageParams["useMinifiedResources"] = $useMinifiedResources;
if ($useMinifiedResources) {
	$pageParams["minifiedResourcePaths"] = Minification::getMinifiedResourcePaths();
}

$pageParams["dataTypeJSModules"] = $dataTypeJSModules;
$pageParams["exportTypeJSModules"] = $exportTypeJSModules;
$pageParams["exportTypeAdditionalSettings"] = $exportTypeAdditionalSettings;
$pageParams["settings"] = $settings;
$pageParams["cssIncludes"] = $cssIncludes;
$pageParams["codeMirrorIncludes"] = ExportTypePluginHelper::getExportTypeCodeMirrorModes($exportTypes);
$pageParams["defaultExportType"] = Core::$user->getDefaultExportType();
$pageParams["defaultNumRows"] = Core::getDefaultNumRows();

if (Core::checkIsLoggedIn()) {
	$pageParams["isLoggedIn"] = true;
	$pageParams["accountType"] = Core::$user->getAccountType();
    $pageParams["selectedDataTypes"] = Core::$user->getSelectedDataTypes();
    $pageParams["selectedExportTypes"] = Core::$user->getSelectedExportTypes();
    $pageParams["selectedCountries"] = Core::$user->getSelectedCountries();
	$pageParams["showSettingsTab"] = true;
	$pageParams["showDeveloperSettings"] = Core::$user->isAdmin() || Core::$user->isAnonymousAdmin();
} else {
	$pageParams["isLoggedIn"] = false;
	$pageParams["accountType"] = "";
	$pageParams["showDeveloperSettings"] = false;
	$pageParams["showSettingsTab"] = false;
}

Templates::displayPage("resources/templates/index.tpl", $pageParams);
