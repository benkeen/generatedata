<?php

session_start();
header("Cache-Control: private, no-cache, must-revalidate");

$folder = dirname(__FILE__);
$library_path = realpath("$folder/../library.php");
require($library_path);

$request = array_merge($_POST, $_GET);
$request = gd_clean_hash($request);

$account_id   = $_SESSION["account_id"];
$form_name    = addslashes($request["form_name"]);
$form_content = addslashes($request["form_content"]);

gd_save_form($account_id, $form_name, $form_content);