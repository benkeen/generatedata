<?php

require_once("library.php");
Core::init();

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

if (Core::checkIsLoggedIn()) {
	header("location: ./");
	exit;
}

$pageParams = array();
Templates::displayPage("resources/templates/login.tpl", $pageParams);