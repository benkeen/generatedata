<?php

session_start();
header("Cache-Control: private, no-cache, must-revalidate");

require_once(realpath(dirname(__FILE__) . "/../library.php"));
$request = array_merge($_POST, $_GET);
$form_id = $request["form_id"];

gd_delete_form($form_id);