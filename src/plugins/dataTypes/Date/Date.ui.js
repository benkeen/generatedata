import React from 'react';

export const state = {
	fromDate: '', // $nextYear = date("m/d/Y", mktime(0, 0, 0, date("m"), date("d"), date("Y")+1));
	toDate: '', // $lastYear = date("m/d/Y", mktime(0, 0, 0, date("m"), date("d"), date("Y")-1));
	example: '',
	option: ''
};


export const Example = ({ coreI18n, data }) => (
	<select defaultValue={data.example}>
		<option value="">{coreI18n.please_select}</option>
		<option value="M j, Y">Jan 1, 2012</option>
		<option value="F jS, Y">January 1st, 2012</option>
		<option value="D, M d">Mon, Jan 01</option>
		<option value="D, jS, Y">Mon, Jan 1st, 2012</option>
		<option value="m.d.y">03.25.06</option>
		<option value="m-d-y">03-25-06</option>
		<option value="m/d/y">03/25/06</option>
		<option value="m/d/Y">03/25/2012</option>
		<option value="d.m.y">25.03.06</option>
		<option value="d-m-y">25-03-06</option>
		<option value="d/m/y">25/03/06</option>
		<option value="d/m/Y">25/03/2012</option>
		<option value="Y-m-d H:i:s">MySQL datetime</option>
		<option value="U">UNIX timestamp</option>
		<option value="c">ISO 8601 date</option>
		<option value="r">RFC 2822 formatted date</option>
		<option value="T">A timezone</option>
	</select>
);

export const Options = ({ data, i18n }) => {
	return (
		<>
			{i18n.from} <input type="text" size="10" value={data.fromDate} readOnly="readonly"/>
			{i18n.to} <input type="text" size="10" value={data.toDate} readOnly="readonly"/>
			<div>
				{i18n.format_code}&nbsp;<input type="text" value={i18n.option} style="width: 160px"/>
			</div>
		</>
	);
};

export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.help_intro}
		</p>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="50"><h2>{i18n.char}</h2></td>
				<td width="300"><h2>{i18n.description}</h2></td>
				<td><h2>{i18n.example}</h2></td>
			</tr>
		</table>

		<hr size="1"/>

		<h3 className="gdSubtitle">{i18n.day}</h3>
		<hr size="1"/>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="50"><h4>d</h4></td>
				<td width="300">{i18n.help_d}</td>
				<td>{i18n.help_d_example}</td>
			</tr>
			<tr>
				<td><h4>D</h4></td>
				<td>{i18n.help_D}</td>
				<td>{i18n.help_D_example}</td>
			</tr>
			<tr>
				<td><h4>j</h4></td>
				<td>{i18n.help_j}</td>
				<td>{i18n.help_j_example}</td>
			</tr>
			<tr>
				<td><h4>l</h4></td>
				<td>{i18n.help_l}</td>
				<td>{i18n.help_l_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>S</h4></td>
				<td>{i18n.help_S}</td>
				<td valign="top">{i18n.help_S_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>w</h4></td>
				<td valign="top">{i18n.help_w}</td>
				<td valign="top">{i18n.help_w_example}</td>
			</tr>
			<tr>
				<td><h4>z</h4></td>
				<td>{i18n.help_z}</td>
				<td>{i18n.help_z_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.week}</h3>
		<hr size="1"/>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="50" valign="top"><h4>W</h4></td>
				<td width="300" valign="top">{i18n.help_W}</td>
				<td valign="top">{i18n.help_W_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.month}</h3>
		<hr size="1"/>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="50" valign="top"><h4>F</h4></td>
				<td width="300">{i18n.help_F}</td>
				<td valign="top">{i18n.help_F_example}</td>
			</tr>
			<tr>
				<td><h4>m</h4></td>
				<td>{i18n.help_m}</td>
				<td>{i18n.help_m_example}</td>
			</tr>
			<tr>
				<td><h4>M</h4></td>
				<td>{i18n.help_M}</td>
				<td>{i18n.help_M_example}</td>
			</tr>
			<tr>
				<td valign="top"><h4>n</h4></td>
				<td>{i18n.help_n}</td>
				<td valign="top">{i18n.help_n_example}</td>
			</tr>
			<tr>
				<td><h4>t</h4></td>
				<td>{i18n.help_t}</td>
				<td>{i18n.help_t_example}</td>
			</tr>
		</table>

		<h3 className="gdSubtitle">{i18n.year}</h3>
		<hr size="1"/>

		<table cellPadding="0" cellSpacing="1">
			<tr>
				<td width="50"><h4>L</h4></td>
				<td width="300">{i18n.help_L}</td>
				<td>{i18n.help_L_example}</td>
			</tr>
			<tr>
				<td><h4>Y</h4></td>
				<td>{i18n.help_Y}</td>
				<td>{i18n.help_Y_example}</td>
			</tr>
			<tr>
				<td><h4>y</h4></td>
				<td>{i18n.help_y}</td>
				<td>{i18n.help_y_example}</td>
			</tr>
		</table>
	</>
);


// var _dataTypeChange = function (msg) {
// 	var currYear = _getCurrentYear();
// 	var yearRangeFrom = (currYear - 200);
// 	var yearRangeTo = (currYear + 200);
// 	var yearRange = yearRangeFrom + ":" + yearRangeTo;
// 	$("#dtFromDate_" + msg.rowID).datepicker({
// 		showOn: "both",
// 		buttonImage: "resources/themes/" + C.THEME + "/images/calendarIcon.gif",
// 		buttonImageOnly: true,
// 		buttonText: "Choose date",
// 		changeMonth: true,
// 		changeYear: true,
// 		yearRange: yearRange
// 	});
// 	$("#dtToDate_" + msg.rowID).datepicker({
// 		showOn: "both",
// 		buttonImage: "resources/themes/" + C.THEME + "/images/calendarIcon.gif",
// 		buttonImageOnly: true,
// 		buttonText: "Choose date",
// 		changeMonth: true,
// 		changeYear: true,
// 		yearRange: yearRange
// 	});
// };
//
// const getCurrentYear = () => new Date().getFullYear();
//
//
// var _validate = function (rows) {
// 	var visibleProblemRows = [];
// 	var problemFields = [];
// 	for (var i = 0; i < rows.length; i++) {
// 		if ($("#dtOption_" + rows[i]).val() === "") {
// 			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
// 			visibleProblemRows.push(visibleRowNum);
// 			problemFields.push($("#dtOption_" + rows[i]));
// 		}
// 	}
// 	var errors = [];
// 	if (visibleProblemRows.length) {
// 		errors.push({
// 			els: problemFields,
// 			error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"
// 		});
// 	}
// 	return errors;
// };
