<?php

require_once(realpath(dirname(__FILE__) . "/library.php"));
header("Cache-Control: private, no-cache, must-revalidate");

$gen = new Generator($_POST);
$response = $gen->generate();
echo $response["content"];