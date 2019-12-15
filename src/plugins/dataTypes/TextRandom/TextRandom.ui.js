import React from 'react';


export const Options = ({ i18n }) => (
	<>
		<div>
			<input type="checkbox" name="dtStartsWithLipsum_%ROW%" id="dtStartsWithLipsum_%ROW%" />
			<label for="dtStartsWithLipsum_%ROW%">{i18n.start_with_lipsum}</label>
		</div>
		<div>
			{i18n.generate} #<input type="text" name="dtNumWordsMin_%ROW%" id="dtNumWordsMin_%ROW%" style="width: 40px" value="1" />
			{i18n.to} #<input type="text" name="dtNumWordsMax_%ROW%" id="dtNumWordsMax_%ROW%" style="width: 40px" value="10" />
			{i18n.words}
		</div>
	</>
);

export const Help = ({ i18n }) => <p>{i18n.help}</p>;


var _saveRow = function(rowNum) {
	return {
		startsWithLipsum: $("#dtStartsWithLipsum_" + rowNum).attr("checked") ? 1 : 0,
		minWords: $("#dtNumWordsMin_" + rowNum).val(),
		maxWords: $("#dtNumWordsMax_" + rowNum).val()
	};
};

var _loadRow = function(rowNum, data) {
	return {
		execute: function() { },
		isComplete: function() {
			if ($("#dtNumWordsMax_" + rowNum).length) {
				if (data.startsWithLipsum == "1") {
					$("#dtStartsWithLipsum_" + rowNum).attr("checked", "checked");
				} else {
					$("#dtStartsWithLipsum_" + rowNum).removeAttr("checked");
				}
				$("#dtNumWordsMin_" + rowNum).val(data.minWords);
				$("#dtNumWordsMax_" + rowNum).val(data.maxWords);
				return true;
			}
			return false;
		}
	};
};

var _validate = function(rows) {
	var visibleProblemRows = [];
	var problemFields      = [];
	var isInt = /^\d+$/;
	for (var i=0; i<rows.length; i++) {
		var numWordsMin = $.trim($("#dtNumWordsMin_" + rows[i]).val());
		var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
		if (numWordsMin === "" || !isInt.test(numWordsMin)) {
			visibleProblemRows.push(visibleRowNum);
			problemFields.push($("#dtNumWordsMin_" + rows[i]));
		}
		var numWordsMax = $.trim($("#dtNumWordsMax_" + rows[i]).val());
		if (numWordsMax === "" || !isInt.test(numWordsMax)) {
			if ($.inArray(visibleRowNum, visibleProblemRows) == -1) {
				visibleProblemRows.push(visibleRowNum);
			}
			problemFields.push($("#dtNumWordsMax_" + rows[i]));
		}
	}
	var errors = [];
	if (visibleProblemRows.length) {
		errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	}
	return errors;
};
