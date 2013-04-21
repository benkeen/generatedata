<?php

require_once("library.php");
Core::init();

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();

$isLoggedIn = Core::checkIsLoggedIn();
if ($isLoggedIn || (!$isLoggedIn && Core::checkAllowMultiUserAnonymousUse())) {
	header("location: ./");
	exit;
}

$pageParams = array();
Templates::displayPage("resources/templates/login.tpl", $pageParams);