<?php

/*------------------------------------------------------------------------------------------------*\

  library.php
  -----------
  The main settings & code for the script.

\*------------------------------------------------------------------------------------------------*/

$g_default_language = "en";

// MySQL database settings
$g_table_prefix = "gd_"; // if you change this, you'll need to update the database tables too
$g_db_hostname = "";
$g_db_username = "";
$g_db_password = "";
$g_db_name     = "";

$g_show_save_panel = true;
$g_version = "2.3.9";
$g_max_generated_rows = 200;

// ------------------------------------------------------------------------------------------------

error_reporting(2047);

$folder = dirname(__FILE__);
require_once("$folder/code/accounts.php");
require_once("$folder/code/countries.php");
require_once("$folder/code/database.php");
require_once("$folder/code/data_types.php");
require_once("$folder/code/general.php");
require_once("$folder/code/generator.php");
require_once("$folder/code/translations.php");
require_once("$folder/code/smarty/Smarty.class.php");

// now sort out the language choice. This allows us to pass the chosen language via the query string. As
// such, we put in a few safeguards against hacking attempts
if (!isset($_SESSION["gd"]))
  $_SESSION["gd"] = array();

$g_language = (isset($_SESSION["gd"]["language"])) ? $_SESSION["gd"]["language"] : $g_default_language;
if (isset($_GET["lang"]))
{
  $lang = strip_tags($_GET["lang"]);
  $lang = preg_replace("/\W/", "", $lang);
  $g_language = $lang;
}

$_SESSION["gd"]["language"] = $g_language;

if (!is_file("$folder/lang/$g_language.php"))
  $g_language = $g_default_language;

require_once("$folder/lang/$g_language.php");

// ordered!
$g_field_groups = array(
  "human_data",
  "text",
  "other"
);

$link = gd_db_connect();