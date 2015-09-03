/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-OrganisationNumber";
	var LANG = L.dataTypePlugins.OrganisationNumber;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _exampleChange = function(msg) {
		var rowID = msg.rowID;
		var selectedFormat = msg.value;

                var $separatorField = $("#dtOptionOrganisationNumber_sep_" + rowID);	

		switch (selectedFormat) {
			case "OrganisationNumberWithoutHyphen":
				$separatorField.val("");
				break;

			case "OrganisationNumberWithHyphen":
				$separatorField.val("-");
				break;
                                
                        default:
                                //$separatorField.val(selectedFormat);            
                                break;

		}

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
			example: $("#dtExample_" + rowNum).val(),
			separator:    $("#dtOptionOrganisationNumber_sep_" + rowNum).val()//,
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
				$("#dtOptionOrganisationNumber_sep_" + rowNum).val(data.separator);

			},
			isComplete: function() {  }
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