<?php


/**
 * A generic class for handling all of the Core's Ajax requests. All requests are identified
 * through a unique "action" string, and (usually) arbitrary other info passed via POST
 */
class AjaxRequest
{
	private $action;
  private $response;

  public function __construct($action, $post = array())
  {
		if (empty($action))
		{
			throw new Exception("No action specified", "no_action_specified");
			return;
		}

    $this->action = $action;
    $post = Utils::cleanHash($post);

		switch ($this->action)
		{
			case "loadConfiguration":
        $assertions = array(
          "logged_in" => true,
          "post" => array(
            "required" => "form_id",
            "numeric"  => "form_id"
          )
        );
        Utils::assert($assertions);
        $this->response = Core::$user->loadConfiguration($post["form_id"]);
				break;

/*
        if (empty(Core::$user))
        {
					throw new Exception("Not logged in", "not_logged_in");
					return;
        }
        if (!isset($post["form_id"]) || empty($post["form_id"]))
        {
					throw new Exception("Not logged in", "not_logged_in");
					return;
        }
        if (!is_numeric($post["form_id"]))
        {
					throw new Exception("Invalid form ID.", "");
					return;
        }
*/

			case "saveConfiguration":
//				$account_id   = $_SESSION["account_id"];
//				$form_name    = addslashes($request["form_name"]);
//				$form_content = addslashes($request["form_content"]);
				//gd_save_form($account_id, $form_name, $form_content);

				$this->response = Core::$user->saveConfiguration($post["form_id"]);
				break;

			case "deleteConfiguration":
		    $form_id = $request["form_id"];
		    gd_delete_form($form_id);
		    $this->response = Core::$user->saveConfiguration($post["form_id"]);
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
  }
}

