<?php

/**
 * This handles all Ajax requests for the Data Generator Core.
 */
require_once(realpath(dirname(__FILE__) . "/../library.php"));
header("Cache-Control: private, no-cache, must-revalidate");


$request = array_merge($_POST, $_GET);
$request = gd_clean_hash($request);

if (!isset($request["action"]))
{
	echo '{ "error_type": "no_action_specified" }';
	exit;
}


// TODO write generic assert() statement to confirm all params

switch ($request["action"])
{
	case "load_form":
    $form_id = $request["form_id"];
    gd_load_form($form_id);
		break;

	case "save_form":
		$account_id   = $_SESSION["account_id"]; // TODO
		$form_name    = addslashes($request["form_name"]);
		$form_content = addslashes($request["form_content"]);
		gd_save_form($account_id, $form_name, $form_content);
		break;

	case "delete_form":
    $form_id = $request["form_id"];
    gd_delete_form($form_id);
    break;

	case "install":
		// first, test the DB information
    list($success, $error) = gd_test_db_settings($request);
    if (!$success)
    {
    	echo "{ \"success\": 0, \"error\": \"$error\" }";
    	exit;
    }

    // second, populate the database with the Core + any modules

    // third, create the settings.php file

		break;

	case "login":
		break;

	case "logout":
		break;
}
