<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Auto-increment",
    "DESC" => "Provides many variations on an standard auto-increment field: custom start value, customizable step sizes, arbitrary string inclusion, increment or decrement and more. "
);

$L["help_intro"] = "Generates a column that contains a unique number on each row, incrementing by whatever value you enter. This option can be helpful for inserting the data into a database field with an auto-increment primary key.";
$L["help_para2"] = "The optional placeholder string lets you embed the generated increment value within a string, via the <b>{\$INCR}</b> placeholder. For example:";
$L["increment_c"] = "Increment:";
$L["placeholder_str"] = "Placeholder string:";
$L["start_at_c"] = "Start at:";
$L["incomplete_fields"] = "Please enter the Start At and Increment fields for all Auto-increment rows:";
