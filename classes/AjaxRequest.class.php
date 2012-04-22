<?php


/**
 * A generic class for handling all of the Core's Ajax requests. All requests are identified
 * through a unique "action" string, and (usually) arbitrary other info passed via POST
 */
class AjaxRequest
{
	private $action;
  private $response;


  /**
   * AjaxRequest objects are automatically processed when they are created, based on the unique $action
   * value. The result of the call is stored in $response to be handled however you need (e.g. output
   * as JSON, XML etc) - or an Exception is thrown if something went wrong. Exception are used SOLELY for
   * program errors: not for user-entry errors.
   */
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
        try
        {
          $assertions = array(
            "no_settings_file" => true,
            "post" => array(
              "required" => array("dbHostname", "dbName", "dbUsername", "employUserAccounts")
            )
          );
        	Utils::assert($assertions);
        }
        catch (Exception $e)
        {
        	return;
        }

echo "okay!";
exit;

			    list($success, $error) = gd_test_db_settings($request);
			    if (!$success)
			    {
			    	echo "{ \"success\": 0, \"error\": \"$error\" }";
			    	exit;
			    }


        //$this->response = Core::$user->loadConfiguration($post["form_id"]);


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

