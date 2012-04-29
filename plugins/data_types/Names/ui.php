<?php


// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
	<select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
		<option value="">{$L["please_select"]}</option>
		<option value="MaleName">{$L["Names_example_MaleName"]}</option>
		<option value="FemaleName">{$L["Names_example_FemaleName"]}</option>
		<option value="Name">{$L["Names_example_Name"]}</option>
		<option value="MaleName Surname">{$L["Names_example_MaleName_Surname"]}</option>
		<option value="FemaleName Surname">{$L["Names_example_FemaleName_Surname"]}</option>
		<option value="Name Surname">{$L["Names_example_Name_Surname"]}</option>
		<option value="Name Initial. Surname">{$L["Names_example_Name_Initial_Surname"]}</option>
		<option value="Surname">{$L["Names_example_surname"]}</option>
		<option value="Surname, Name Initial.">{$L["Names_example_Surname_Name_Initial"]}</option>
		<option value="Name, Name, Name, Name">{$L["Names_example_Name4"]}</option>
		<option value="Name Surname|Name Initial. Surname">{$L["Names_example_fullnames"]}</option>
	</select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
	<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 230px" />
EOF;
