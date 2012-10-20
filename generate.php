<?php

require_once("library.php");
Core::init();

$_POST = array(
    "gdNumResults" => 100,
	"gdNumCols" => "5",
    "gdRowOrder" => "1,2,3,4,5",
    "gdExportType" => "HTML",
    "gdBatchSize" => 100,
    "gdCurrentBatchNum" => 1,
    "gdNumRowsToGenerate" => 100,
    "gdCountryChoice" => array(
        "canada",
        "united_states"
    ),
    "csv_delimiter" => "|",
    "csv_line_endings" => "Windows",
    "sql_table_name" => "myTable",
    "sql_database" => "MySQL",
    "sql_create_table" => "on",
    "sql_drop_table" => "on",
    "enclose_with_backquotes" => "on",
    "sql_statement_type" => "insert",
    "sql_primary_key" => "default",
    "etXML_rootNodeName" => "records",
    "etXML_recordNodeName" => "record",
    "gdTitle_1" => "nm",
    "gdDataType_1" => "data-type-Names",
    "dtExample_1" => "MaleName",
    "dtOption_1" => "MaleName",
    "gdTitle_2" => "",
    "gdDataType_2" => "",
    "gdTitle_3" => "",
    "gdDataType_3" => "",
    "gdTitle_4" => "",
    "gdDataType_4" => "",
    "gdTitle_5" => "",
    "gdDataType_5" => ""
);

$data = new Generator($_POST);
