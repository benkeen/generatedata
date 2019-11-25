/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Date
	 * @description JS code for the Date Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Date";
	var LANG = L.dataTypePlugins.Date;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.TYPE_CHANGE] = _dataTypeChange;
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _dataTypeChange = function(msg) {
		var currYear = _getCurrentYear();
		var yearRangeFrom = (currYear - 200);
		var yearRangeTo   = (currYear + 200);
		var yearRange = yearRangeFrom + ":" + yearRangeTo;
		$("#dtFromDate_" + msg.rowID).datepicker({
			showOn:          "both",
			buttonImage:     "resources/themes/" + C.THEME + "/images/calendarIcon.gif",
			buttonImageOnly: true,
			buttonText:      "Choose date",
			changeMonth: true,
			changeYear: true,
			yearRange: yearRange
		});
		$("#dtToDate_" + msg.rowID).datepicker({
			showOn:          "both",
			buttonImage:     "resources/themes/" + C.THEME + "/images/calendarIcon.gif",
			buttonImageOnly: true,
			buttonText:      "Choose date",
			changeMonth: true,
			changeYear: true,
			yearRange: yearRange
		});
	};

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	};

	var _saveRow = function(rowNum) {
		return {
			"fromDate": $("#dtFromDate_" + rowNum).val(),
			"toDate":   $("#dtToDate_" + rowNum).val(),
			"example":  $("#dtExample_" + rowNum).val(),
			"option":   $("#dtOption_" + rowNum).val()
		};
	};

	var _getCurrentYear = function() {
		return new Date().getFullYear();
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() { },
			isComplete: function() {
				if ($("#dtOption_" + rowNum).length > 0) {
					$("#dtFromDate_" + rowNum).val(data.fromDate);
					$("#dtToDate_" + rowNum).val(data.toDate);
					$("#dtExample_" + rowNum).val(data.example);
					$("#dtOption_" + rowNum).val(data.option);
					return true;
				}
				return false;
			}
		};
	};

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

	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});