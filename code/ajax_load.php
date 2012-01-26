<?php

session_start();
header("Cache-Control: private, no-cache, must-revalidate");

$folder = dirname(__FILE__);
$library_path = realpath("$folder/../library.php");
require($library_path);

$request = array_merge($_POST, $_GET);
$form_id = $request["form_id"];

gd_load_form($form_id);
