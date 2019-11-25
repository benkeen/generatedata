/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-PersonalNumber";
	var LANG = L.dataTypePlugins.PersonalNumber;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _exampleChange = function(msg) {
		var rowID = msg.rowID;
		var selectedFormat = msg.value;

		var optionValue = "";
		if (selectedFormat === "PersonalNumberWithHyphen") {
      optionValue = "-";
    }
    $("#dtOptionPersonalNumber_sep_" + rowID).val(optionValue);
	};

	/**
	 * No validation currently required.
	 */
	var _validate = function() {
	  return [];
	};

	/**
	 * Called when the user saves a form. This function is passed the row number of the row to
	 * save. It should return a JSON object (of whatever structure is relevant).
	 */
	var _saveRow = function(rowNum) {
		return {
			example:   $("#dtExample_" + rowNum).val(),
			separator: $("#dtOptionPersonalNumber_sep_" + rowNum).val()
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
			execute: function() {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtOptionPersonalNumber_sep_" + rowNum).val(data.separator);
			},
			isComplete: function() {
			  return $("#dtOptionPersonalNumber_sep_" + rowNum).length > 0;
      }
		};
	};


	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});
