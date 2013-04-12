<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Tree (parent row ID)";
$L["auto_increment_row_num"] = "Auto-increment row number:";
$L["help_1"] = "This data type lets you generate tree-like data in which every row is a child of another row - except the very first row, which is the trunk of the tree. This data type must be used in conjunction with the Auto-Increment data type: that ensures that every row has a unique numeric value, which this data type uses to reference the parent rows.";
$L["help_2"] = "The options let you specify which of your form fields is the appropriate auto-increment field and the maximum number of children a node may have.";
$L["invalid_parent"] = "[invalid parent]";
$L["max_num_sibling_nodes"] = "Max number of sibling nodes:";
$L["invalid_fields"] = "Please only numbers for the Tree Data Type field settings. Please fix rows: ";