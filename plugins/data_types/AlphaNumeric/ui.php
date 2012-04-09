<?php


// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "AlphaNumeric";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "other";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 20;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
	<select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
		<option value="">{$LANG["please_select"]}</option>
		<option value="LxL xLx">V6M 4C1 {$LANG["AlphaNumeric_example_CanPostalCode"]}</option>
		<option value="xxxxx">90210 {$LANG["AlphaNumeric_example_USZipCode"]}</option>
		<option value="LLLxxLLLxLL">eZg29gdF5K1 {$DT["AlphaNumeric_example_Password"]}</option>
	</select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 230px" />
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 460;
$help_html_content =<<<EOF
	<p>
		{$LANG["AlphaNumeric_help_intro"]}
	</p>

	<table cellpadding="0" cellspacing="1" width="100%">
	<tr>
		<td class="heading_1" width="20">L</td>
		<td width="200">{$LANG["AlphaNumeric_help_1"]}</td>
		<td class="heading_1" width="20">V</td>
		<td>{$LANG["AlphaNumeric_help_2"]}</td>
	</tr>
	<tr>
		<td class="heading_1">l</td>
		<td>{$LANG["AlphaNumeric_help_3"]}</td>
		<td class="heading_1">v</td>
		<td>{$LANG["AlphaNumeric_help_4"]}</td>
	</tr>
	<tr>
		<td class="heading_1">D</td>
		<td>{$LANG["AlphaNumeric_help_5"]}</td>
		<td class="heading_1">F</td>
		<td>{$LANG["AlphaNumeric_help_6"]}</td>
	</tr>
	<tr>
		<td class="heading_1">C</td>
		<td>{$LANG["AlphaNumeric_help_7"]}</td>
		<td class="heading_1">x</td>
		<td>{$LANG["AlphaNumeric_help_8"]}</td>
	</tr>
	<tr>
		<td class="heading_1">c</td>
		<td>{$LANG["AlphaNumeric_help_9"]}</td>
		<td class="heading_1">X</td>
		<td>{$LANG["AlphaNumeric_help_10"]}</td>
	</tr>
	<tr>
		<td class="heading_1">E</td>
		<td>{$LANG["AlphaNumeric_help_11"]}</td>
		<td class="heading_1">H</td>
		<td>{$LANG["AlphaNumeric_help_12"]}</td>
	</tr>
	</table>
EOF;
