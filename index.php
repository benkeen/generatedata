<?php

require_once("library.php");

// if it's not marked as having been installed, display the install instructions page
if (!Core::$settingsFileExists)
{
	$query_string = (isset($_GET["source"]) && in_array($_GET["source"], array("fromerrorpage"))) ?
	  "?source={$_GET["source"]}" : "";

  header("location: install.php{$query_string}");
  exit;
}

$_SESSION["account_id"] = 1;
$forms = gd_get_forms($_SESSION["account_id"]);

$data_types = gd_get_data_types();


$params = array();
$params["data_types"] = $data_types;
Utils::displayPage($params, "templates/index.tpl");

// Page object?