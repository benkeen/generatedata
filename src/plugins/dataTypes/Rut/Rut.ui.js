import React from 'react';


export const state = {
	example: '',
	thousandSep: true,
	upper: true,
	remDash: true
};

export const Example = ({ i18n }) => (
	<select>
		<option value="">{$L["please_select"]}</option>
		<option value="xxxxxxxx-y">12345678-9 ({i18n.rut_default})</option>
		<option value="xxxxxxxx">12345678 ({i18n.only_number})</option>
		<option value="y">9 ({i18n.only_digit})</option>
	</select>
);

export const Options = ({ i18n }) => (
	<>
		<input type="checkbox" name="dtThouSep_%ROW%" id="dtThouSep_%ROW%" />
			<label for="dtThouSep_%ROW%">{i18n.thousands_separator}</label><br/>
		<input type="checkbox" name="dtUpperDigit_%ROW%" id="dtUpperDigit_%ROW%" checked="checked" />
			<label for="dtUpperDigit_%ROW%">{i18n.digit_uppercase}</label><br/>
		<input type="checkbox" name="dtRemoveDash_%ROW%" id="dtRemoveDash_%ROW%" />
			<label for="dtRemoveDash_%ROW%">{i18n.remove_dash}</label>
	</>
);



var _validate = function (rows) {
    var visibleProblemRows = [];
    var problemFields = [];
    for (var i = 0; i < rows.length; i++) {
        if ($("#dtExample_" + rows[i]).val() === "") {
            var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
            visibleProblemRows.push(visibleRowNum);
            problemFields.push($("#dtExample_" + rows[i]));
        }
    }
    var errors = [];
    if (visibleProblemRows.length) {
        errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>" });
    }
    return errors;
};

var _loadRow = function(rowNum, data) {
	return {
		execute: function() {},
		isComplete: function () {
		    $("#dtExample_" + rowNum).val(data.example);

		    if ($("#dtThouSep_" + rowNum).length) {
		        if (data.thousep) {
		            $("#dtThouSep_" + rowNum).attr("checked", "checked");
		        } else {
		            $("#dtThouSep_" + rowNum).removeAttr("checked");
		        }
		    }
		    if ($("#dtUpperDigit_" + rowNum).length) {
		        if (data.upper) {
		            $("#dtUpperDigit_" + rowNum).attr("checked", "checked");
		        } else {
		            $("#dtUpperDigit_" + rowNum).removeAttr("checked");
		        }
		    }
		    if ($("#dtRemoveDash_" + rowNum).length) {
		        if (data.remdash) {
		            $("#dtRemoveDash_" + rowNum).attr("checked", "checked");
		        } else {
		            $("#dtRemoveDash_" + rowNum).removeAttr("checked");
		        }
		    }

		    return true;
		}
	};
};
