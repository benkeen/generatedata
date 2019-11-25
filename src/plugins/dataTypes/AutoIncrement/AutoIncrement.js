/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name AutoIncrement
	 * @description JS code for the AutoIncrement Data Type.
	 * @see DataType
	 * @namespace
	 */

	/* @private */
	var MODULE_ID = "data-type-AutoIncrement";

	var LANG = L.dataTypePlugins.AutoIncrement;
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _saveRow = function(rowNum) {
		return {
			example: $("#dtExample_" + rowNum).val(),
			incrementStart: $("#dtAutoIncrementStart_" + rowNum).val(),
			incrementValue: $("#dtAutoIncrementValue_" + rowNum).val(),
			incrementPlaceholder: $("#dtAutoIncrementPlaceholder_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() { },
			isComplete: function() {
				if ($("#dtAutoIncrementPlaceholder_" + rowNum).length) {
					$("#dtExample_" + rowNum).val(data.example);
					$("#dtAutoIncrementStart_" + rowNum).val(data.incrementStart);
					$("#dtAutoIncrementValue_" + rowNum).val(data.incrementValue);
					$("#dtAutoIncrementPlaceholder_" + rowNum).val(data.incrementPlaceholder);
					return true;
				}
				return false;
			}
		};
	};

	var _exampleChange = function(msg) {
		var parts = msg.value.split(',');
		var rowNum = msg.rowID;
		$("#dtAutoIncrementStart_" + rowNum).val(parts[0]);
		$("#dtAutoIncrementValue_" + rowNum).val(parts[1]);
		$("#dtAutoIncrementPlaceholder_" + rowNum).val(parts[2]);
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var autoIncrementStart = $.trim($("#dtAutoIncrementStart_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (autoIncrementStart === "") {
				problemFields.push($("#dtAutoIncrementStart_" + rows[i]));
			}
			var autoIncrementEnd = $.trim($("#dtAutoIncrementValue_" + rows[i]).val());
			if (autoIncrementEnd === "") {
				problemFields.push($("#dtAutoIncrementValue_" + rows[i]));
			}
			if (autoIncrementStart === "" || autoIncrementEnd === "") {
				visibleProblemRows.push(visibleRowNum);
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
		loadRow: _loadRow,
		saveRow: _saveRow
	});
});
