<?php

/**
 * The ExportTypePlugin.abstract.class.php file defines the abstract class that all Export Types
 * need to extend in order to be registered within the system. This class contains a number of
 * helper methods for interacting with Export Types as a whole. It's used by the Core only.
 */
class ExportTypePluginHelper {

	/**
	 * Returns an array of available, instantiated Export Type objects.
	 */
	function getExportTypePlugins() {
		$exportTypesFolder = realpath(dirname(__FILE__) . "/../plugins/exportTypes");
		$exportTypes = array();
		if ($handle = opendir($exportTypesFolder)) {
			while (false !== ($item = readdir($handle))) {
				if ($item == "." || $item == ".." || $item == ".svn") {
					continue;
				}
				if (is_dir("$exportTypesFolder/$item")) {
					$obj = self::instantiateExportType($exportTypesFolder, $item);

					if ($obj != null) {
						$exportTypes[] = $obj;
					}

					$folders = explode(DIRECTORY_SEPARATOR, "$exportTypesFolder/$item");
					$folders = array_reverse($folders);

					// interesting, this. This is extremely simple and makes access to these values really easy
					// ($class->path), but they're public so they can be overridden (bad!). But I still think
					// it's better than some verbose getter function like $obj->getPath();
					$obj->path = "{$folders[2]}/{$folders[1]}/{$folders[0]}";
					$obj->folder = $folders[0];
				}
			}
			closedir($handle);
		}
		return $exportTypes;
	}


	/**
	 * Instantiates and returns an Export Type object.
	 *
	 * @param string $baseFolder
	 * @param string $exportTypeFileName this is the name of the folder AND the class name
	 */
	private function instantiateExportType($baseFolder, $exportTypeFolderName) {

		$filename = "{$exportTypeFolderName}.class.php";
		if (!is_file("$baseFolder/$exportTypeFolderName/$filename")) {
			return false;
		}

		// now try to include and instantiate the class
		try {
			include("$baseFolder/$exportTypeFolderName/$filename");
		} catch (Exception $e) {
			return false;
		}

		if (!class_exists($exportTypeFolderName)) {
			return false;
		}

		$instance = null;
		try {
			$instance = new $exportTypeFolderName();
		} catch (Exception $e) {
			return false;
		}

		// enforce inheritance of the abstract DataType class
		if (!($instance instanceof ExportTypePlugin)) {
			return false;
		}

		return $instance;
	}

	/**
	 * Used in the main page to generate a list of
	 * @return array
	 */
	public function getExportTypeJSResources($exportTypes) {
		$files = array();
		foreach ($exportTypes as $exportType) {
			$jsModules = $exportType->getJSModules();
			$path      = $exportType->getPath();
			for ($i=0; $i<count($jsModules); $i++) {
				$files[] = "$path/{$jsModules[$i]}";
			}
		}

		return $files;
	}

	/**
	 * Used in the main page to generate a list of
	 * @return array
	 */
	public function getExportTypeAdditionalSettingsHTML($exportTypes) {
		$additionalSettings = array();
		foreach ($exportTypes as $exportType) {
			$name = $exportType->getName();
			$settings = $exportType->getAdditionalSettingsHTML();
			if (!empty($settings))
			{
				$additionalSettings[$name] = $settings;
			}
		}

		return $additionalSettings;
	}
}
