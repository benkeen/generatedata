<?php

// MAIN SETTINGS

// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "Date";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "human_data";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 100;


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
	<select id="dt_\$ROW\$" onchange="$('#option_\$ROW\$').val(this.value)">
		<option value="">{$LANG["please_select"]}</option>
		<option value="M j, Y">Jan 1, 2006</option>
		<option value="F jS, Y">January 1st, 2006</option>
		<option value="D, M d">Mon, Jan 01</option>
		<option value="D, jS, Y">Mon, Jan 1st, 2006</option>
		<option value="m.d.y">03.25.06</option>
		<option value="m-d-y">03-25-06</option>
		<option value="m/d/y">03/25/06</option>
		<option value="m/d/Y">03/25/2006</option>
		<option value="d.m.y">25.03.06</option>
		<option value="d-m-y">25-03-06</option>
		<option value="d/m/y">25/03/06</option>
		<option value="d/m/Y">25/03/2006</option>
		<option value="Y-m-d H:i:s">MySQL datetime</option>
		<option value="U">UNIX timestamp</option>
		<option value="c">ISO 8601 date</option>
		<option value="r">RFC 2822 formatted date</option>
		<option value="T">A timezone</option>
	</select>
EOF;

// ------------------------------------------------------------------------------------------------
// OPTIONS

$next_year = mktime(0, 0, 0, date("m"),  date("d"),  date("Y")+1);
$next_year = date("m/d/Y", $next_year);
$last_year = mktime(0, 0, 0, date("m"),  date("d"),  date("Y")-1);
$last_year = date("m/d/Y", $last_year);

$data_type_options_html =<<<EOF
	{$LANG["Date_from"]}
	<input type="text" name="fromDate_\$ROW\$" id="fromDate_\$ROW\$" size="10" value="$last_year" />
	<script>
	$(function() {
		$("#fromDate_\$ROW\$").datepicker({
			showOn:          'button',
			buttonImage:     'images/calendar_icon.gif',
			buttonImageOnly: true
		});
	});
	</script>

	{$LANG["Date_to"]}
	<input type="text" name="toDate_\$ROW\$" id="toDate_\$ROW\$" size="10" value="$next_year" />
	<script>
	$(function() {
		$("#toDate_\$ROW\$").datepicker({
			showOn:          'button',
			buttonImage:     'images/calendar_icon.gif',
			buttonImageOnly: true
		});
	});
	</script>
	<div>
		{$LANG["Date_format_code"]}&nbsp;<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 160px;" />
	</div>
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width  = 860;
$help_html_content =<<<EOF
	<p>
    {$LANG["Date_help_intro"]}
	</p>

	<table cellpadding="0" cellspacing="1">
	<tr>
		<td class="heading_1" width="50">{$LANG["Date_char"]}</td>
		<td class="heading_1">{$LANG["Date_description"]}</td>
		<td class="heading_1">{$LANG["Date_example"]}</td>
	</tr>
	<tr>
		<td class="heading_3" colspan="3">{$LANG["Date_day"]}</td>
	</tr>
	<tr>
		<td class="heading_1">d</td>
		<td>{$LANG["Date_help_d"]}</td>
		<td>{$LANG["Date_help_d_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">D</td>
		<td>{$LANG["Date_help_D"]}</td>
		<td>{$LANG["Date_help_D_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">j</td>
		<td>{$LANG["Date_help_j"]}</td>
		<td>{$LANG["Date_help_j_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">l</td>
		<td>{$LANG["Date_help_l"]}</td>
		<td>{$LANG["Date_help_l_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">S</td>
		<td>{$LANG["Date_help_S"]}</td>
		<td>{$LANG["Date_help_S_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">w</td>
		<td>{$LANG["Date_help_w"]}</td>
		<td>{$LANG["Date_help_w_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">z</td>
		<td>{$LANG["Date_help_z"]}</td>
		<td>{$LANG["Date_help_z_example"]}</td>
	</tr>
	<tr>
		<td class="heading_3" colspan="3">{$LANG["Date_week"]}</td>
	</tr>
	<tr>
		<td class="heading_1">W</td>
		<td>{$LANG["Date_help_W"]}</td>
		<td>{$LANG["Date_help_W_example"]}</td>
	</tr>
	<tr>
		<td class="heading_3" colspan="3">{$LANG["Date_month"]}</td>
  </tr>
	<tr>
		<td class="heading_1">F</td>
		<td>{$LANG["Date_help_F"]}</td>
		<td>{$LANG["Date_help_F_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">m</td>
		<td>{$LANG["Date_help_m"]}</td>
		<td>{$LANG["Date_help_m_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">M</td>
		<td>{$LANG["Date_help_M"]}</td>
		<td>{$LANG["Date_help_M_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">n</td>
		<td>{$LANG["Date_help_n"]}</td>
		<td>{$LANG["Date_help_n_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">t</td>
		<td>{$LANG["Date_help_t"]}</td>
		<td>{$LANG["Date_help_t_example"]}</td>
	</tr>
	<tr>
		<td class="heading_3" colspan="3">{$LANG["Date_year"]}</td>
	</tr>
	<tr>
		<td class="heading_1">L</td>
		<td>{$LANG["Date_help_L"]}</td>
		<td>{$LANG["Date_help_L_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">Y</td>
		<td>{$LANG["Date_help_Y"]}</td>
		<td>{$LANG["Date_help_Y_example"]}</td>
	</tr>
	<tr>
		<td class="heading_1">y</td>
		<td>{$LANG["Date_help_y"]}</td>
		<td>{$LANG["Date_help_y_example"]}</td>
	</tr>
	</table>
EOF;

