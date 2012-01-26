<?php
session_start();
header("Cache-control: private");

$resultType = $_POST["resultType"];

// these have to be outputted FIRST to send the headers properly
if ($resultType == "Excel")
{
  header("Content-Type: application/vnd.ms-excel");
  header("Content-Disposition: attachment; filename=randomdata.xls");
  header("Cache-Control: public");
}

if ($resultType == "CSV")
{
  header("Content-Type: application/csv");
  header("Content-Disposition: attachment; filename=randomdata.csv");
  header("Cache-Control: public");
}

if ($resultType == "XML")
{
  header("Content-Type: application/xml; charset=ISO-8859-1");
  header("Last-Modified: ". gmdate("D, d M Y H:i:s") ." GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
}

require("library.php");

// if there's no incoming FORM values, just exit.
if (empty($_POST))
  exit;


// include all generate.php files for the data set. We have to include ALL data types because we don't
// know if one data type uses the functions of another
$data_types = array();
$folder = dirname(__FILE__);
$data_types_folder = realpath("data_types");

if ($handle = opendir($data_types_folder))
{
  while (false !== ($item = readdir($handle)))
  {
  	if ($item == "." || $item == ".." || $item == ".svn")
  	  continue;

  	// only include the data type generate.php once: users may be using the data type > 1 time in a data set
    if (is_dir("$data_types_folder/$item"))
    {
      include_once("$data_types_folder/$item/generate.php");
    }
  }
  closedir($handle);
}

// for use by any data type
$g_words = gd_get_lipsum();
$g_resultType = $_POST["resultType"];
$g_numCols    = $_POST["numCols"];
$g_numResults = $_POST["numResults"];


if (!empty($g_max_generated_rows) && $g_numResults > $g_max_generated_rows)
  $g_numResults = $g_max_generated_rows;

$g_template = gd_get_data_set_template($_POST, $g_numCols);

switch ($g_resultType)
{
  case "HTML":
    require_once("export_types/html.php");
    break;
  case "Excel":
    require_once("export_types/excel.php");
    break;
  case "XML":
    require_once("export_types/xml.php");
    break;
  case "CSV":
    require_once("export_types/csv.php");
    break;
  case "SQL":
    require_once("export_types/sql.php");
    break;}


