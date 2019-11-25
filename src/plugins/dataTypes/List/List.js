/*global $:false,define:false*/
define([
  "manager",
  "constants",
  "lang",
  "generator"
], function(manager, C, L, generator) {

	"use strict";
  
	/**
	* @name List
	* @description JS code for the List Data Type.
	* @see DataType
	* @namespace
	*/

	var MODULE_ID = "data-type-List";
	var LANG = L.dataTypePlugins.List;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _saveRow = function(rowNum) {
		return {
			example:   $("#dtExample_" + rowNum).val(),
			listType1: $("#dtListType1_" + rowNum).attr("checked"),
			listType2: $("#dtListType2_" + rowNum).attr("checked"),
			exactly:   $("#dtListExactly_" + rowNum).val(),
			atMost:    $("#dtListAtMost_" + rowNum).val(),
			option:    $("#dtOption_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtListType1_" + rowNum).attr("checked", data.listType1);
				$("#dtListType2_" + rowNum).attr("checked", data.listType2);
				$("#dtListExactly_" + rowNum).val(data.exactly);
				$("#dtListAtMost_" + rowNum).val(data.atMost);
				$("#dtOption_" + rowNum).val(data.option);
			},
			isComplete: function() {
				return $("#dtOption_" + rowNum).length > 0;
			}
		};
	};

	/**
	 * Confirm the "Exactly" and "At Most" fields are all integers, and the Options field has been filled in.
	 *
	 */
	var _validate = function(rows) {
		var missingOptions = {
			fields: [],
			visibleProblemRows: []
		};
		var invalidIntFields = {
			fields: [],
			visibleProblemRows: []
		};

		var intOnly = /^\d+$/;
		for (var i=0; i<rows.length; i++) {
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);

			// check the At Most and Exactly fields
			var exactlyField = $("#dtListExactly_" + rows[i]);
			var exactlyFieldValid = intOnly.test(exactlyField.val());
			var atMostField = $("#dtListExactly_" + rows[i]);
			var atMostFieldValid  = intOnly.test(atMostField.val());

			if (!exactlyFieldValid || !atMostFieldValid) {
				if (!exactlyFieldValid) {
					invalidIntFields.fields.push(exactlyField);
				}
				if (!atMostFieldValid) {
					invalidIntFields.fields.push(atMostField);
				}
				invalidIntFields.visibleProblemRows.push(visibleRowNum);
			}

			// check the option is filled in
			var option = $.trim($("#dtOption_" + rows[i]).val());
			if (option === "") {
				missingOptions.visibleProblemRows.push(visibleRowNum);
				missingOptions.fields.push($("#dtOption_" + rows[i]));
			}
		}
		var errors = [];
		if (missingOptions.visibleProblemRows.length) {
			errors.push({ els: missingOptions.fields, error: LANG.incomplete_fields + " <b>" + missingOptions.visibleProblemRows.join(", ") + "</b>"});
		}
		if (invalidIntFields.visibleProblemRows.length) {
			errors.push({ els: invalidIntFields.fields, error: LANG.invalid_int_fields + " <b>" + invalidIntFields.visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	};

	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});