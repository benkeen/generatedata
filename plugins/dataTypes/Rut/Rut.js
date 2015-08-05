/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-Rut";
	var LANG = L.dataTypePlugins.Names;

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

	var _saveRow = function(rowNum) {
		return {
		    "example": $("#dtExample_" + rowNum).val(),
			"thousep": ($("#dtThouSep_" + rowNum).attr("checked")) ? "checked" : "",
			"upper": ($("#dtUpperDigit_" + rowNum).attr("checked")) ? "checked" : "",
			"remdash": ($("#dtRemoveDash_" + rowNum).attr("checked")) ? "checked" : ""
		};
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
	    validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});