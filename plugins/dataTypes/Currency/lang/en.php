<?php

$L = array();

$L["help_intro"] = "This data type generates random currency values, in whatever format and range you want. The example dropdown contains several options so you can get a sense of how it works, but here's what each of the options means.";
$L["format"] = "Format";
$L["format_desc"] = "The format field governs exactly how the money value should be formatted. <b>X</b>'s are converted into a number: all other values are left as-is.";
$L["range_from"] = "Range - From";
$L["range_from_desc"] = "Specifies the lower range of whatever values you want to generate. Note: this field should only contain numbers and (if you want) a decimal point and two following numbers to represent cents/pence/etc.";
$L["range_to"] = "Range - To";
$L["range_to_desc"] = "The upper range of the numbers to generate.";
$L["currency_symbol"] = "Currency Symbol";
$L["currency_symbol_desc"] = "Whatever currency symbol you want to use, e.g. <b>$</b>, <b>€</b>, etc.";
$L["prefix_suffix"] = "Prefix/Suffix";
$L["prefix_suffix_desc"] = "This determines where the currency symbol should appear.";

$L["no_cents"] = "no cents";
$L["no_thousand_delimiters"] = "no thousand delimiters";
$L["no_dollar_sign"] = "no dollar sign";
$L["range"] = "Range";
$L["to"] = "To";
$L["currency_symbol"] = "Currency Symbol";
$L["prefix"] = "prefix";
$L["suffix"] = "suffix";
$L["incomplete_fields"] = "The Currency data type needs to have the format entered. Please fix the following rows:";
$L["invalid_range_fields"] = "Please only enter numbers in the Currency range fields (0-9 and decimal point). Please fix the following rows: ";
$L["invalid_range"] = "Please check the range goes from small to large. Please fix the following rows: ";