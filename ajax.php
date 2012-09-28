<?php

/**
 * This handles all Ajax requests for the Data Generator Core. Note that we only include the library.php
 * here, we don't Core::init(). Depending on the context (e.g. installation), that may not be desired.
 */
require_once(realpath(dirname(__FILE__) . "/library.php"));

// sessions needed here AFTER installation, to get access to $user [or should it be passed &
// validated with all requests?]
//header("Cache-Control: private, no-cache, must-revalidate");

$ajaxRequest = new AjaxRequest(@$_POST["action"], $_POST);
echo json_encode($ajaxRequest->getResponse());