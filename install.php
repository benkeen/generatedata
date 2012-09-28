<?php

require_once("library.php");

Core::init();

// if the script is already installed, redirect them to the index page.
if (Core::checkIsInstalled()) {
	header("location: index.php");
	exit;
}

$currentPage = 1;
if (Core::checkSettingsFileExists()) {
	$currentPage = 3;
}

/*
('installationStepComplete_UserAccounts', 'no'),
('installationStepComplete_DataTypes', 'no'),
('installationStepComplete_ExportTypes', 'no'),
('installationStepComplete_CountryData', 'no'),
*/

$params = array();
$params["randomPassword"] = Utils::generateRandomAlphanumericStr("CVxxCxV");
$params["tablePrefix"]    = Core::getDbTablePrefix();
$params["currentPage"]    = $currentPage;

Utils::displayPage("templates/install.tpl", $params);