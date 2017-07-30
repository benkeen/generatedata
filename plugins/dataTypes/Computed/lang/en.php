<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Computed",
    "DESC" => "Lets you programmatically access the values and metadata generated from other fields in the row and output whatever you want."
);

$L["see_help_dialog"] = "&nbsp;See help dialog.";
$L["help_para1"] = "The <b>Computed</b> Data Type gives you access to the metadata about fields in the row to let you generate whatever output you want based on that information. If you just need to access the <i>generated</i> string value from another field (i.e. what you see in the output), see the <b>Composite</b> Data Type. This field type gives you much more access to each field.";
$L["help_para2"] = "<b>{\$ROW1}</b>, <b>{\$ROW2}</b> etc. contain everything available about that particular row. The content changes based on the row's Data Type and what has been generated, but high-level it contains the following properties:";
$L["help_prop1"] = "<b>{\$ROW1.OPTIONS}</b> - whatever options were entered in the interface/API call for the row";
$L["help_prop2"] = "<b>{\$ROW1.COL_METADATA}</b> - any additional metadata returned for the Data Type";
$L["help_prop3"] = "<b>{\$ROW1.DATA}</b> - the actual generated random content for this field (always in a \"display\" property) plus any other information about the generated content";
$L["help_prop4"] = "<b>{\$ROW1.DEBUG}</b> - a handy JSON-serialization of everything in the row, so you can see what's available. Just run it through a JSON formatter.";
$L["example"] = "Example";
$L["example1"] = "<b>{\$ROW1.RANDOM_DATA.gender}</b> - will output the gender (\"male\", \"female\" or \"unknown\") of the generated content of a <b>Names</b> Data Type field (be sure to replace \"1\" with the right row number!). If you used <b>FemaleName</b> as the placeholder string this variable will return \"female\" every time. If you entered \"Name\", the value returned will depend on the generated string. If you entered a placeholder string with multiple formats, it will return \"unknown\" if it contained both genders, or no genders (e.g. a surname without a first name).";
