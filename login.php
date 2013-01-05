<?php

require_once("library.php");
Core::init();


$pageParams = array();
Templates::displayPage("resources/templates/login.tpl", $pageParams);