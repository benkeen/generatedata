<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "Names";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 10;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
	<select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
		<option value="">{$LANG["please_select"]}</option>
		<option value="MaleName">{$LANG["Names_example_MaleName"]}</option>
		<option value="FemaleName">{$LANG["Names_example_FemaleName"]}</option>
		<option value="Name">{$LANG["Names_example_Name"]}</option>
		<option value="MaleName Surname">{$LANG["Names_example_MaleName_Surname"]}</option>
		<option value="FemaleName Surname">{$LANG["Names_example_FemaleName_Surname"]}</option>
		<option value="Name Surname">{$LANG["Names_example_Name_Surname"]}</option>
		<option value="Name Initial. Surname">{$LANG["Names_example_Name_Initial_Surname"]}</option>
		<option value="Surname">{$LANG["Names_example_surname"]}</option>
		<option value="Surname, Name Initial.">{$LANG["Names_example_Surname_Name_Initial"]}</option>
		<option value="Name, Name, Name, Name">{$LANG["Names_example_Name4"]}</option>
		<option value="Name Surname|Name Initial. Surname">{$LANG["Names_example_fullnames"]}</option>
	</select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
	<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 230px" />
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 380;
$help_html_content =<<<EOF
<p>
	{$LANG["Names_help_intro"]}
</p>

<table cellpadding="0" cellspacing="1">
<tr>
	<td class="heading_1" width="100">Name</td>
	<td>{$LANG["Names_type_Name"]}</td>
</tr>
<tr>
	<td class="heading_1">MaleName</td>
	<td>{$LANG["Names_type_MaleName"]}</td>
</tr>
<tr>
	<td class="heading_1">FemaleName</td>
	<td>{$LANG["Names_type_FemaleName"]}</td>
</tr>
<tr>
	<td class="heading_1">Initial</td>
	<td>{$LANG["Names_type_Initial"]}</td>
</tr>
<tr>
	<td class="heading_1">Surname</td>
	<td>{$LANG["Names_type_Surname"]}</td>
</tr>
</table>
EOF;

