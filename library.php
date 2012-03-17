<?php

/**
 * library.php
 * -----------
 *
 * The main settings & code for the script. As of 3.0.0, DON'T edit this file: all your custom settings
 * like your database connection info, should be found in a settings.php file. This file is created
 * automatically by the installation script.
 */

$g_version = "3.0.0";

// these can be overwritten in settings.php if you want
$g_default_language = "en";
$g_max_generated_rows = 5000;
$g_show_save_panel = true;
$g_error_reporting = 2047;

$settings_file_exists = false;
if (file_exists(dirname(__FILE__) . "/code/settings"))
{
	$settings_file_exists = true;
  require_once(dirname(__FILE__) . "/code/settings.php");
}

$g_default_language = "en";

// ------------------------------------------------------------------------------------------------

error_reporting($g_error_reporting);

require_once(dirname(__FILE__) . "/code/accounts.php");
require_once(dirname(__FILE__) . "/code/countries.php");
require_once(dirname(__FILE__) . "/code/database.php");
require_once(dirname(__FILE__) . "/code/data_types.php");
require_once(dirname(__FILE__) . "/code/installation.php");
require_once(dirname(__FILE__) . "/code/general.php");
require_once(dirname(__FILE__) . "/code/generator.php");
require_once(dirname(__FILE__) . "/code/translations.php");
require_once(dirname(__FILE__) . "/code/smarty/Smarty.class.php");

// now sort out the language choice. This allows us to pass the chosen language via the query string. As
// such, we put in a few safeguards against hacking attempts
if (!isset($_SESSION["gd"]))
  $_SESSION["gd"] = array();

$g_language = (isset($_SESSION["gd"]["language"])) ? $_SESSION["gd"]["language"] : $g_default_language;
$g_translations = gd_get_translations();
if (isset($_GET["lang"]))
{
  $lang = strip_tags($_GET["lang"]);
  $lang = preg_replace("/\W/", "", $lang);
  $g_language = $lang;
}

$_SESSION["gd"]["language"] = $g_language;

if (!is_file(dirname(__FILE__) . "/lang/$g_language.php"))
  $g_language = $g_default_language;

require_once(dirname(__FILE__) . "/lang/$g_language.php");

// ordered!
$g_field_groups = array(
  "human_data",
  "text",
  "other"
);

if ($settings_file_exists)
{
  $link = gd_db_connect();
}