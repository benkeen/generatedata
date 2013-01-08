<?php

require_once("library.php");
Core::init();

if (Core::checkIsLoggedIn()) {
	header("location: ./");
	exit;
}

$pageParams = array();
Templates::displayPage("resources/templates/login.tpl", $pageParams);