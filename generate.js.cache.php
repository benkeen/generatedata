<?php

require_once("resources/libs/PHPClosure.php");
require_once("library.php");
Core::init();

// remove this line whenever you want to generate the JS cache files
exit;

// EXPORT TYPES
$exportTypes = Core::$exportTypePlugins;
$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes, "array");
$c1 = new PhpClosure();
foreach ($exportTypeJSModules as $module) {
    $c1->add("http://beta.generatedata.com/$module");
}
$exportTypeGroupFile = 'plugins/exportTypes/exportTypes.grouped.min.js';
unlink($exportTypeGroupFile);

ob_start();
$c1->whitespaceOnly()->write();
$js = ob_get_contents();
ob_end_clean();
$fp = fopen($exportTypeGroupFile, 'w');
fwrite($fp, $js);
fclose($fp);


// DATA TYPES
$dataTypes         = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes, "array");
$c2 = new PhpClosure();
foreach ($dataTypeJSModules as $module) {
    $c2->add("http://beta.generatedata.com/$module");
}
$dataTypeGroupFile = 'plugins/dataTypes/dataTypes.grouped.min.js';
unlink($dataTypeGroupFile);

ob_start();
$c2->whitespaceOnly()->write();
$js = ob_get_contents();
ob_end_clean();
$fp = fopen($dataTypeGroupFile, 'w');
fwrite($fp, $js);
fclose($fp);