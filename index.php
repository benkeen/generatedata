<?php

require_once("library.php");

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();


/*
$_SESSION["account_id"] = 1;
$forms = gd_get_forms($_SESSION["account_id"]);
$data_types = gd_get_data_types();
*/

$jsModules = ExportTypePluginHelper::getExportTypeJSResources(Core::$exportTypePlugins);
$exportTypeJSModules = "";
if (!empty($jsModules)) {
	$exportTypeJSModules = "\"" . implode("\",\n\"", $jsModules) . "\"";
}

$params = array();
$params["exportTypeJSModules"] = $exportTypeJSModules;

Utils::displayPage("templates/index.tpl", $params);
