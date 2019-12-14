export const Help = ({ i18n }) => (
	<>
		<p>
			{i18n.DATA_TYPE.DESC}
		</p>
		<table cellPadding="0" cellSpacing="1">
		<tr>
			<td><h4>{i18n.SIRET}</h4></td>
			<td>{i18n.type_SIRET}</td>
		</tr>
		<tr>
			<td><h4>{i18n.SIREN}</h4></td>
			<td>{i18n.type_SIREN}</td>
		</tr>
		<tr>
			<td colSpan="2">&nbsp;</td>
		</tr>
		<tr>
			<td><h4>{i18n.more_info}</h4></td>
			<td><a href={i18n.help_link} target="_blank">WIKI SIRET</a></td>
		</tr>
		</table>
	</>
);


export const Example = ({ i18n, coreI18n }) => (
	<select>
		<option value="">{coreI18n.please_select}</option>
		<option value="SIRET">{i18n.example_SIRET}</option>
		<option value="SIREN">{i18n.example_SIREN}</option>
	</select>
);

export const Options = ({ id }) => (
	<>
		<input type="radio" name="dtOption_%ROW%" id="dtOption_%ROW%_1" value="SIRET" checked="checked" style="margin-left: 4px" />
			<label for="dtOption_%ROW%_1">SIRET</label>
		<input type="radio" name="dtOption_%ROW%" id="dtOption_%ROW%_2" value="SIREN" />
			<label for="dtOption_%ROW%_2">SIREN</label>
	</>
);


var _exampleChange = function(msg) {
	$("input[name='dtOption_" + msg.rowID + "'][value='" + msg.value + "']").prop('checked', true);
};


/**
 * Called when the user submits the form to generate some data. If the selected data set contains
 * one or more rows of this data type, this function is called with the list of row numbers. Note that
 * the row numbers passed are the *original* row numbers of the rows on creation. It's possible that the
 * user has re-sorted or deleted some rows. So to get the visible row number for a row, call
 * gen._getVisibleRowOrderByRowNum(row)
 */
var _validate = function(rows) {
	var visibleProblemRows = [];
	var problemFields      = [];
	for (var i=0; i<rows.length; i++) {
		if ($("#dtOption_" + rows[i]).val() === "") {
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			visibleProblemRows.push(visibleRowNum);
			problemFields.push($("#dtOption_" + rows[i]));
		}
	}
	var errors = [];
	if (visibleProblemRows.length) {
		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	}
	return errors;
};

/**
 * Called when the user saves a form. This function is passed the row number of the row to
 * save. It should return a JSON object (of whatever structure is relevant).
 */
var _saveRow = function(rowNum) {
	return {
		"example": $("#dtExample_" + rowNum).val(),
		"option":  $("#dtOption_" + rowNum).val()
	};
};

/**
 * Called when a form is loaded that contains this data type. This is passed the row number and
 * the custom data type data to populate the fields. loadRow functions all must return an array
 * with two indexes - both functions:
 *  [0] code to execute (generally inserting data into fields)
 *  [1] a boolean test to determine WHEN the content has been inserted.
 */
var _loadRow = function(rowNum, data) {
	return {
		execute: function() { },
		isComplete: function() {
			if ($("#dtOption_" + rowNum).length) {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtOption_" + rowNum).val(data.option);
				return true;
			} else {
				return false;
			}
		}
	};
};
