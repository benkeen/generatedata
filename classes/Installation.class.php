<?php

class Installation
{
	/**
	 * Confirms that the database settings provided are valid.
	 *
	 * @param array $settings
	 * @return array [0] boolean true / false
	 *               [1] error message (if there was a problem. Empty string otherwise).
	 */
	function gd_test_db_settings($settings)
	{
		global $L;

	  $hostname = $settings["dbHostname"];
	  $db_name  = $settings["dbName"];
	  $username = $settings["dbUsername"];
	  $password = $settings["dbPassword"];

	  $db_connection_error = "";
	  $link = @mysql_connect($hostname, $username, $password) or $db_connection_error = mysql_error();

	  if ($db_connection_error)
	  {
	    $placeholders = array("db_connection_error" => $db_connection_error);
	    $error = gd_eval_smarty_string($L["install_invalid_db_info"], $placeholders);
	    return array(false, $error);
	  }
	  else
	  {
	    $db_select_error = "";
	    @mysql_select_db($db_name)
	      or $db_select_error = mysql_error();

	    if ($db_select_error)
	    {
	      $placeholders = array("db_select_error" => $db_select_error);
	      $error = ft_install_eval_smarty_string($L["install_no_db_connection"], $placeholders);
	      return array(false, $error);
	    }
	    else
	    {
	      @mysql_close($link);
	    }
	  }

	  return array(true, "");
	}


	function gd_create_database_tables()
	{
		$g_db_install_queries[] = "
			CREATE TABLE gd_user_accounts (
			  account_id mediumint(8) unsigned NOT NULL auto_increment,
			  date_created datetime NOT NULL,
			  last_updated datetime NOT NULL,
			  date_expires datetime default NULL,
			  first_name varchar(50) default NULL,
			  last_name varchar(50) default NULL,
			  email varchar(100) NOT NULL,
			  password varchar(20) NOT NULL,
			  password_recovery_question varchar(100) default NULL,
			  password_recovery_answer varchar(100) default NULL,
			  max_records mediumint(9) default NULL,
			  num_records_generated int(11) NOT NULL default '0',
			  PRIMARY KEY  (account_id)
			)
		";

		$g_db_install_queries[] = "
		  CREATE TABLE gd_settings (
		    setting_id mediumint(9) NOT NULL AUTO_INCREMENT,
		    setting_name varchar(100) NOT NULL,
		    setting_value text NOT NULL,
		    PRIMARY KEY (setting_id)
		  )
		";

		$g_db_install_queries[] = "
			CREATE TABLE gd_forms (
			  form_id mediumint(9) NOT NULL auto_increment,
			  account_id mediumint(9) NOT NULL,
			  form_name varchar(100) NOT NULL,
			  content mediumtext NOT NULL,
			  PRIMARY KEY  (form_id)
			) AUTO_INCREMENT=39
		";

	}


	function gd_create_settings_file()
	{

	}
}
