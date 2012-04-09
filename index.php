<?php

session_start();
header("Cache-control: private");
require_once("library.php");

// if it's not marked as having been installed, display the install instructions page
if (!$settings_file_exists)
{
  header("location: install.php");
  exit;
}

$_SESSION["account_id"] = 1;
$forms = gd_get_forms($_SESSION["account_id"]);

$data_types = gd_get_data_types();


$params = array();
$params["data_types"] = $data_types;
gd_display_page($params, "templates/index.tpl");