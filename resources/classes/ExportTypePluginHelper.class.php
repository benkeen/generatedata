<?php

/**
 * The ExportTypePlugin.abstract.class.php file defines the abstract class that all Export Types
 * need to extend in order to be registered within the system. This class contains a number of
 * helper methods for interacting with Export Types as a whole. It's used by the Core only.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class ExportTypePluginHelper {

	/**
	 * Returns an array of available, instantiated Export Type objects.
	 */
	public static function getExportTypePlugins($runtimeContext, $installedOnly = true) {
		$allowedExportTypes = array();
		if ($installedOnly) {
			$exportTypes = Settings::getSetting("installedExportTypes");
			$allowedExportTypes = explode(",", $exportTypes);
		}
		$exportTypesFolder = realpath(__DIR__ . "/../../plugins/exportTypes");
		$exportTypes = array();
		if ($handle = opendir($exportTypesFolder)) {
			while (false !== ($item = readdir($handle))) {
				if ($item == "." || $item == ".." || $item == ".svn") {
					continue;
				}
				if (!empty($allowedExportTypes) && !in_array($item, $allowedExportTypes)) {
					continue;
				}
				if (is_dir("$exportTypesFolder/$item")) {
					$obj = self::instantiateExportType($runtimeContext, $exportTypesFolder, $item);

					if ($obj != null) {
						$folders = explode(DIRECTORY_SEPARATOR, $exportTypesFolder . DIRECTORY_SEPARATOR . $item);
						$folders = array_reverse($folders);

						// interesting, this. This is extremely simple and makes access to these values really easy
						// ($class->path), but they're public so they can be overridden (bad!). But I still think
						// it's better than some verbose getter function like $obj->getPath();
						$obj->path = "{$folders[2]}/{$folders[1]}/{$folders[0]}";
						$obj->folder = $folders[0];

						$exportTypes[] = $obj;
					}
				}
			}
			closedir($handle);
		}

		return $exportTypes;
	}

	/**
	 * Instantiates and returns an Export Type object.
	 *
	 * @param $runtimeContext
	 * @param $baseFolder
	 * @param $exportTypeFolderName
	 * @return bool|ExportTypePlugin
	 */
	private function instantiateExportType($runtimeContext, $baseFolder, $exportTypeFolderName) {

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
			$instance = new $exportTypeFolderName($runtimeContext);
		} catch (Exception $e) {
			return false;
		}

		// enforce inheritance of the abstract DataType class
		if (!($instance instanceof ExportTypePlugin)) {
			return false;
		}

		// lastly, check the class is enabled
		if (!$instance->isEnabled()) {
			return false;
		}

		return $instance;
	}

	/**
	 * Used in the main page to generate a list of Export Type JS files. DREADFUL function.
	 * @param $exportTypes
	 * @param string $format
	 * @return array|string
	 */
	public static function getExportTypeJSResources($exportTypes, $format = "string", $pathRoot = "") {
		$files = array();
		foreach ($exportTypes as $exportType) {
			$jsModules = $exportType->getJSModules();
			$path      = $exportType->getPath();
			for ($i=0; $i<count($jsModules); $i++) {
				$files[] = "{$pathRoot}$path/{$jsModules[$i]}";
			}
		}

		$returnVal = "";
		if ($format == "string") {
			if (!empty($files)) {
				$returnVal = "\"" . implode("\",\n\"", $files) . "\"";
			}
		} else {
			$returnVal = $files;
		}

		return $returnVal;
	}

	/**
	 * Used in the main page to generate the tabset of additional settings for each Export Type.
	 * @return array
	 */
	public static function getExportTypeAdditionalSettingsHTML($exportTypes) {
		$additionalSettings = array();
		foreach ($exportTypes as $exportType) {
			$folderName = $exportType->getFolder();
			$settings = $exportType->getAdditionalSettingsHTML();
			if (!empty($settings)) {
				$additionalSettings[$folderName] = $settings;
			} else {
				$lang = Core::$language->getCurrentLanguageStrings();
				$additionalSettings[$folderName] = $lang["no_additional_export_type_settings"];
			}
		}

		return $additionalSettings;
	}

	/**
	 * Used in the main page to generate the Export Type CSS includes.
	 * @param array the export types
	 * @param string
	 */
	public static function getExportTypeCSSIncludes($exportTypes) {
		$files = array();
		foreach ($exportTypes as $exportType) {
			$cssFiles = $exportType->getCSSFiles();
			if (!empty($cssFiles)) {
				$path = $exportType->getPath();
				foreach ($cssFiles as $file) {
					$files[] = "$path/$file";
				}
			}
		}

		$cssIncludes = "";
		foreach ($files as $file) {
			$cssIncludes[] = "<link rel=\"stylesheet\" type=\"text/css\" href=\"$file\" />";
		}
		return implode("\n", $cssIncludes);
	}

	/**
	 * Returns a string of all <script> tags linking to the appropriate CodeMirror modes.
	 * @param array $exportTypes
	 * @return string
	 */
	public static function getExportTypeCodeMirrorModes($exportTypes) {
		$files = array();
		foreach ($exportTypes as $exportType) {
			$modes = $exportType->getCodeMirrorModes();
			foreach ($modes as $mode) {
				if (file_exists(realpath(__DIR__ . "/../libs/codemirror/mode/{$mode}/{$mode}.js"))) {
					$files[] = "resources/libs/codemirror/mode/{$mode}/{$mode}.js";
				}
			}
		}

		// remove duplicated
		$files = array_unique($files);

		$includes = "";
		foreach ($files as $file) {
			$includes[] = "<script src=\"$file\"></script>";
		}
		return implode("\n", $includes);
	}

}
