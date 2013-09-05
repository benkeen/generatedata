<?php

/**
 * Added in 3.0.7 to help tie-in resource bundling, minification and MD5-renaming via Grunt. Up to this point
 * we didn't do any bundling/minification, but that obviously needed to be fixed. Here's how it works:
 *
 * - Grunt handles JS and CSS minification and bundling, and renaming of files to include their md5 hash (for
 *   cache-busting). It also generates a /cache/minifiedResourcePaths.php file every time it's run that contains
 *   a single var with the various path maps.
 * - To use the bundled resource, just add the following line to your config.php file:
 *        $useMinifiedResources = true
 * - To trigger re-bundling, you can either just type "grunt" in the command line, or click on the "Reset Plugins"
 *   option on the Settings page in the UI. Both require grunt to have been configured.
 * - for local usage / dev, you DON'T need to have configured Grunt. You can just NOT add $useMinifiedResources = true
 *   to your config. It will run slower but it will always include the latest files.
 */
class Minification {

	public function getMinifiedResourcePaths() {

	}

	// create a /cache/appStart-unminified.js file. Grunt will handle the renaming of the file and the generation
	// of the /cache/minifiedResourcePaths.php file
	public static function createAppStartFile() {
		$exportTypes = Core::$exportTypePlugins;
		$exportTypeJSModules = ExportTypePluginHelper::getExportTypeJSResources($exportTypes, "string");

		$dataTypes = DataTypePluginHelper::getDataTypeList(Core::$dataTypePlugins);
		$dataTypeJSModules = DataTypePluginHelper::getDataTypeJSResources($dataTypes, "string");

		$js = 'require(["manager","generator","accountManager",' . $exportTypeJSModules . "," . $dataTypeJSModules . ',"pageInit"], function(manager) {manager.start(); });';

		$file = realpath(dirname(__FILE__) . "../../cache/appStart.js");
		if (is_file($file)) {
			unlink($file);
		}
		file_put_contents($file, $js);
	}

}