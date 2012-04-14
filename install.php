<?php

session_start();
header("Cache-control: private");
require_once("library.php");


$params = array();
$params["random_password"] = gd_generate_random_alphanumeric_str("CVxxCxV");
gd_display_page("templates/install.tpl", $params);