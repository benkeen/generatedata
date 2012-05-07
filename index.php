<?php

require_once("library.php");

// if need be, redirect to the install instructions page
Utils::maybeShowInstallationPage();


/*
$_SESSION["account_id"] = 1;
$forms = gd_get_forms($_SESSION["account_id"]);
$data_types = gd_get_data_types();
*/

$params = array();
//$params["data_types"] = $data_types;

Utils::displayPage("templates/index.tpl", $params);
