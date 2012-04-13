<?php

session_start();
header("Cache-control: private");
require_once("library.php");


$params = array();
gd_display_page("templates/install.tpl", $params);