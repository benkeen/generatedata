<?php


/**
 * Returns all information about a user account.
 *
 * @param integer $account_id
 * @return array
 */
function get_account($account_id)
{
  global $g_table_prefix;

  $link = db_connect();

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}user_accounts
    WHERE  account_id = $account_id
      ");
  $user_info = mysql_fetch_assoc($query);

  $form_count_query = mysql_query("
    SELECT count(*)
    FROM   {$g_table_prefix}forms
    WHERE  account_id = $account_id
      ");
  $form_count = mysql_fetch_array($form_count_query);
  db_disconnect($link);

  $user_info["num_forms_saved"] = $form_count[0];

  return $user_info;
}


/**
 * Saves a form.
 *
 * @param integer $account_id
 * @param string $form_name
 * @param string $form_content
 */
function gd_save_form($account_id, $form_name, $form_content)
{
  global $g_table_prefix, $L;

  // find out if there's already a form with this name for this user
  $count_query = mysql_query("
    SELECT count(*)
    FROM   {$g_table_prefix}forms
    WHERE  account_id = $account_id
    AND    form_name = '$form_name'
      ");

  $result = mysql_fetch_row($count_query);
  $form_already_exists = ($result[0] == 0) ? false : true;

  if ($form_already_exists)
	{
	  $query = mysql_query("
		  UPDATE {$g_table_prefix}forms
			SET    content = '$form_content'
			WHERE  account_id = $account_id AND
			       form_name = '$form_name'
						   ");
    echo '{ "success": "true",  "message": "Your form has been updated.", "form_name": "' . $form_name . '" }';
	}
	else
	{
	  $query = mysql_query("
		  INSERT INTO {$g_table_prefix}forms (account_id, form_name, content)
      VALUES ($account_id, '$form_name', '$form_content')
						   ");
    $form_id = mysql_insert_id();
    echo '{ "success": "true",  "message": "Your form has been saved.", "form_id": "' . $form_id . '", "form_name": "' . $form_name . '" }';
	}
}


function gd_load_form($form_id)
{
  global $g_table_prefix;

  if (!isset($_SESSION["account_id"]))
    return;

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}forms
    WHERE  form_id = $form_id
      ");

  if (!$query || mysql_num_rows($query) == 0)
  {
    echo '{ "success": "false", "message": "Sorry, this form isn\'t found. You might want to try logging out then logging back in." }';
    return;
  }

  $result = mysql_fetch_assoc($query);
  if ($result["account_id"] != $_SESSION["account_id"])
  {
    echo '{ "success": "false", "message": "Sorry, you don\'t have permission to view this form. Please re-login in and try again." }';
    return;
  }

  // escape all double quotes
//  $clean_str = preg_replace("/^\{/", "", $result["content"]);
//  $clean_str = preg_replace("/\}$/", "", $clean_str);
  $clean_str = addslashes($result["content"]);

  echo '{ "success": "true", "form_content": ' . $result["content"] . ' }';
}


function gd_delete_form($form_id)
{
  global $g_table_prefix;

  if (!isset($_SESSION["account_id"]))
    return;

  $query = mysql_query("
    SELECT *
    FROM   {$g_table_prefix}forms
    WHERE  form_id = $form_id
      ");

  if (mysql_num_rows($query) == 0)
  {
    echo '{ "success": "false",  "message": "Sorry, this form isn\'t found. You might want to try logging out then logging back in." }';
    return;
  }

  $result = mysql_fetch_assoc($query);
  if ($result["account_id"] != $_SESSION["account_id"])
  {
    echo '{ "success": "false", "message": "Sorry, you don\'t have permission to delete this form. Please re-login in and try again." }';
    return;
  }

	mysql_query("
	  DELETE FROM {$g_table_prefix}forms
		WHERE  form_id = $form_id
		  ");

  echo "{ \"success\": \"true\", \"form_id\": $form_id  }";
}


function gd_get_forms($account_id)
{
  global $g_table_prefix;

  $query = mysql_query("
    SELECT form_id, form_name
    FROM   {$g_table_prefix}forms
    WHERE  account_id = $account_id
    ORDER BY form_name
      ") or die(mysql_error());

  $forms = array();
  while ($result = mysql_fetch_assoc($query))
    $forms[] = array($result["form_id"], $result["form_name"]);

  return $forms;
}


/*------------------------------------------------------------------------------------------------*\
  Function:    update_total_row_count
\*------------------------------------------------------------------------------------------------*/
function update_total_row_count($account_id, $num_rows)
{
  global $g_table_prefix;

  $link = db_connect();

  // Ben, surely there's a way to do this in a single query...
  $select_query = mysql_query("
    SELECT num_records_generated
    FROM   {$g_table_prefix}user_accounts
    WHERE  account_id = $account_id
      ");

  $result = mysql_fetch_assoc($select_query);
  $num_generated = $result["num_records_generated"];

  $new_total = $num_generated + $num_rows;

  mysql_query("
    UPDATE {$g_table_prefix}user_accounts
    SET    num_records_generated = $new_total
    WHERE  account_id = $account_id
      ");

  db_disconnect($link);
}
