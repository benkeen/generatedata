<?php

require_once("library.php");

$params = array();
$params["random_password"] = Utils::generateRandomAlphanumericStr("CVxxCxV");
Utils::displayPage("templates/install.tpl", $params);