<?php


class ExportTypeHelper {

  /**
   * Returns an array of available, instantiated Export Type objects.
   */
  function getExportTypes() {
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
    if (!($instance instanceof ExportType)) {
      return false;
    }

    return $instance;
  }

  public function getExportTypeSettings() {

  }
}


