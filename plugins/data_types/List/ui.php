<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "List";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "other";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 40;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
	<select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
		<option value="">{$LANG["please_select"]}</option>
		<option value="1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49">{$LANG["List_example_1"]}</option>
		<option value="2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50">{$LANG["List_example_2"]}</option>
		<option value="1|2|3|4|5|6|7|8|9|10">1-10</option>
		<option value="{$LANG["List_one_to_ten"]}">{$LANG["List_example_3"]}</option>
		<option value="1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97">{$LANG["List_example_4"]}</option>
		<option value="{$LANG["List_colours"]}">{$LANG["List_example_5"]}</option>
		<option value="{$LANG["List_relationship_states"]}">{$LANG["List_example_6"]}</option>
		<option value="{$LANG["List_prefix"]}">{$LANG["List_example_7"]}</option>
		<option value="{$LANG["List_company_names"]}">{$LANG["List_example_8"]}</option>
		<option value="{$LANG["List_companies"]}">{$LANG["List_example_9"]}</option>
	</select>
  <div>
    &nbsp;{$LANG["List_separated_by_pipe"]}
  </div>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
	<table cellpadding="0" cellspacing="1">
	<tr>
		<td>
			<input type="radio" name="list_type_\$ROW\$" id="list_type1_\$ROW\$" value="Exactly" checked />
			<label for="list_type1_\$ROW\$">{$LANG["List_exactly"]}</label>
			<input type="text" size="2" name="exactly_\$ROW\$" id="exactly_\$ROW\$" value="1" />&nbsp;&nbsp;
			<input type="radio" name="list_type_\$ROW\$" id="list_type2_\$ROW\$" value="AtMost" />
			<label for="list_type2_\$ROW\$">{$LANG["List_at_most"]}</label>
			<input type="text" size="2" name="at_most_\$ROW\$" id="at_most_\$ROW\$" value="1" />
		</td>
	</tr>
	<tr>
		<td>
			<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 230px;" />
		</td>
	</tr>
	</table>
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width  = 360;
$help_html_content =<<<EOF
	<p>
		{$LANG["List_help"]}
	</p>
EOF;

