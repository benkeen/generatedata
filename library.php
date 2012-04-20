<?php

/**
 * library.php
 * -----------
 *
 * The main settings & code for the script. All your custom environment settings like your database
 * connection info, are stored in a settings.php file in this same folder. That file is created
 * automatically by the installation script.
 */

require_once(dirname(__FILE__) . "/code/Account.class.php");
require_once(dirname(__FILE__) . "/code/AjaxRequest.class.php");
require_once(dirname(__FILE__) . "/code/Core.class.php");
require_once(dirname(__FILE__) . "/code/DataType.abstract.class.php");
require_once(dirname(__FILE__) . "/code/Database.class.php");
require_once(dirname(__FILE__) . "/code/DataTypes.class.php");
require_once(dirname(__FILE__) . "/code/ExportTypes.class.php");
require_once(dirname(__FILE__) . "/code/Installation.class.php");
require_once(dirname(__FILE__) . "/code/SessionManager.class.php");
require_once(dirname(__FILE__) . "/code/Translations.class.php");
require_once(dirname(__FILE__) . "/code/smarty/Smarty.class.php");
require_once(dirname(__FILE__) . "/code/Utils.class.php");

Core::init();