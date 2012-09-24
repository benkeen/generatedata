<?php

require_once("library.php");

// if the script is already installed, redirect them to the index page.
if (Core::checkIsInstalled()) {
	header("location: index.php");
	exit;
}
$params = array();
$params["randomPassword"] = Utils::generateRandomAlphanumericStr("CVxxCxV");
$params["tablePrefix"]    = Core::getDbTablePrefix();

Utils::displayPage("templates/install.tpl", $params);