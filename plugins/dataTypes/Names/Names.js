define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-Names";
	var LANG = L.dataTypePlugins.Names;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__Names"] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	}


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
			if ($("#dtOption_" + rows[i]).val() == "") {
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
	 * Called when a form is loaded that contains this data type. This is passed the row number and
	 * the custom data type data to populate the fields. loadRow functions all must return an array
	 * with two indexes - both functions:
	 *  [0] code to execute (generally inserting data into fields)
	 *  [1] a boolean test to determine WHEN to execute the code.
	 */
	var _loadRow = function(rowNum, data) {
		return [
			function() {
				$("#dt_" + rowNum).val(data.example);
				$("#option_" + rowNum).val(data.option);
			},
			function() { return $("#option_" + rowNum).length > 0; }
		];
	};

	/**
	 * Called when the user saves a form. This function is passed the row number of the row to
	 * save. It should return a well-formatted JSON object (of whatever structure is relevant.
	 */
	var _saveRow = function(rowNum) {
		return {
			"example":  $("#dt_" + rowNum).val(),
			"option":   $("#option_" + rowNum).val()
		};
	};


	// register our module
	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});