<?php

/**
 * This handles all Ajax requests for the Data Generator Core.
 */
require_once("code/library.php");
header("Cache-Control: private, no-cache, must-revalidate");

try
{
  $ajaxRequest = new AjaxRequest(@$_POST["action"], $_POST);
  Utils::generateJSON($ajaxRequest->getResponse());
}
catch (Exception $e)
{
  Utils::generateJSON($e->message);
  exit;
}
