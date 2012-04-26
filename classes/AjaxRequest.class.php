<?php


/**
 * A generic class for handling all of the Core's Ajax requests. All requests are identified
 * through a unique "action" string, and (usually) arbitrary other info passed via POST
 */
class AjaxRequest {
  private $action;
  private $response;


  /**
   * AjaxRequest objects are automatically processed when they are created, based on the unique $action
   * value. The result of the call is stored in $response to be handled however you need (e.g. output
   * as JSON, XML etc) - or an Exception is thrown if something went wrong. Exceptions are used SOLELY for
   * program errors: not for user-entry errors.
   */
  public function __construct($action, $post = array()) {
    if (empty($action)) {
      throw new Exception("no_action_specified");
      return;
    }

    $this->action = $action;
    $post = Utils::cleanHash($post);

    switch ($this->action) {
      case "loadConfiguration":
/*        $assertions = array(
          "logged_in" => true,
          "post" => array(
            "required" => "form_id",
            "numeric"  => "form_id"
          )
        );
        Utils::assert($assertions);
        $this->response = Core::$user->loadConfiguration($post["form_id"]);
*/
        break;

      case "saveConfiguration":
//				$account_id   = $_SESSION["account_id"];
//				$form_name    = addslashes($request["form_name"]);
//				$form_content = addslashes($request["form_content"]);
        //gd_save_form($account_id, $form_name, $form_content);
        $this->response = Core::$user->saveConfiguration($post);
        break;

      case "deleteConfiguration":
        $form_id = $request["form_id"];
        gd_delete_form($form_id);
        break;

      case "install":
      	// check all preconditions
        try {
          $assertions = array("no_settings_file" => true);
          Utils::assert($assertions);
        } catch (GDException $e) {
        	$this->response = $e->getFormattedError();
          return;
        }

        list($success, $error) = Database::testDbSettings($post["dbHostname"], $post["dbName"], $post["dbUsername"], $post["dbPassword"]);
        if (!$success) {
        	$this->response["success"] = 0;
        	$this->response["error"] = $error;
        	return;
        }
        break;

      case "login":
        break;

      case "logout":
        break;
    }
  }

  public function getResponse() {
    return $this->response;
  }
}

