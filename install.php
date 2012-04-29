<?php

require_once("library.php");

$params = array();
$params["randomPassword"] = Utils::generateRandomAlphanumericStr("CVxxCxV");
$params["tablePrefix"]    = Core::getDbTablePrefix();

Utils::displayPage("templates/install.tpl", $params);