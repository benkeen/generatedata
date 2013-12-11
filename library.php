<?php

/**
 * library.php
 * -----------
 *
 * The main settings & code for the script. All your custom environment settings like your database
 * connection info, are stored in a settings.php file in this same folder. That file is created
 * automatically by the installation script.
 */

// the script requires PHP 5.3+ (see resources/classes/Core.class.php), so this should be defined -
// but just so the user will see a nice error, define it anyway
(@__DIR__ == '__DIR__') && define('__DIR__', dirname(__FILE__));

require_once(__DIR__ . "/resources/classes/Account.class.php");
require_once(__DIR__ . "/resources/classes/AjaxRequest.class.php");
require_once(__DIR__ . "/resources/classes/Core.class.php");
require_once(__DIR__ . "/resources/classes/CountryPlugin.abstract.class.php");
require_once(__DIR__ . "/resources/classes/CountryPluginHelper.class.php");
require_once(__DIR__ . "/resources/classes/Database.class.php");
require_once(__DIR__ . "/resources/classes/DataGenerator.class.php");
require_once(__DIR__ . "/resources/classes/DataTypePlugin.abstract.class.php");
require_once(__DIR__ . "/resources/classes/DataTypePluginHelper.class.php");
require_once(__DIR__ . "/resources/classes/Emails.class.php");
require_once(__DIR__ . "/resources/classes/ErrorCodes.class.php");
require_once(__DIR__ . "/resources/classes/ExportTypePlugin.abstract.class.php");
require_once(__DIR__ . "/resources/classes/ExportTypePluginHelper.class.php");
require_once(__DIR__ . "/resources/classes/GeoData.class.php");
require_once(__DIR__ . "/resources/classes/Installation.class.php");
require_once(__DIR__ . "/resources/classes/Language.class.php");
require_once(__DIR__ . "/resources/classes/Minification.class.php");
require_once(__DIR__ . "/resources/classes/SessionManager.class.php");
require_once(__DIR__ . "/resources/classes/Settings.class.php");
require_once(__DIR__ . "/resources/classes/Templates.class.php");
require_once(__DIR__ . "/resources/classes/Translations.class.php");
require_once(__DIR__ . "/resources/classes/Utils.class.php");

// Smarty - use SecureSmarty!
require_once(__DIR__ . "/resources/libs/smarty/Smarty.class.php");
require_once(__DIR__ . "/resources/classes/SecureSmarty.class.php");


// handle magic quotes
if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
}
