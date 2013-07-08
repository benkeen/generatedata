/*global $:false,define:false*/
define([
	"manager",
	"constants"
], function(manager, C) {

	"use strict";

	/**
	 * @name Currency
	 * @description JS code for the Currency Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Currency";
	var LANG = null;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _exampleChange = function(msg) {
		var format = "";
		var rangeFrom = "";
		var rangeTo = "";
		var symbol = "";
		var symbolLocation = "";
		if (msg.value) {
			var parts = msg.value.split("|");
			format = parts[0];
			rangeFrom = parts[1];
			rangeTo = parts[2];
			symbol = parts[3];
			symbolLocation = parts[4];
		}
		$("#dtCurrencyFormat_" + msg.rowID).val(format);
		$("#dtCurrencyRangeFrom_" + msg.rowID).val(rangeFrom);
		$("#dtCurrencyRangeTo_" + msg.rowID).val(rangeTo);
		$("#dtCurrencySymbol_" + msg.rowID).val(symbol);
		$("#dtCurrencySymbolLocation_" + msg.rowID).val(symbolLocation);
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtCurrencyFormat_" + rowNum).val(data.format);
				$("#dtCurrencyRangeFrom_" + rowNum).val(data.rangeFrom);
				$("#dtCurrencyRangeTo_" + rowNum).val(data.rangeTo);
				$("#dtCurrencySymbol_" + rowNum).val(data.symbol);
				$("#dtCurrencySymbolLocation_" + rowNum).val(data.symbolLocation);
			},
			isComplete: function() {
				return true;
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"format": $("#dtCurrencyFormat_" + rowNum).val(),
			"rangeFrom": $("#dtCurrencyRangeFrom_" + rowNum).val(),
			"rangeTo": $("#dtCurrencyRangeTo_" + rowNum).val(),
			"symbol": $("#dtCurrencySymbol_" + rowNum).val(),
			"symbolLocation": $("#dtCurrencySymbolLocation_" + rowNum).val()
		};
	};

	var _validate = function(rows) {
		var problemFields      = [];
		var invalidFormatRows = [];
		for (var i=0; i<rows.length; i++) {
			var format = $("#dtCurrencyFormat_" + rows[i]);
			var from   = $("#dtCurrencyRangeFrom_" + rows[i]);
			var to     = $("#dtCurrencyRangeTo_" + rows[i]);

			if ($.trim(format.val()) === "") {
				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
				invalidFormatRows.push(visibleRowNum);
				problemFields.push(format);
			}

			if (from.val().match(/\D\./)) {
				console.log("please only enter numbers in the range fields (0-9 and decimal point).");
			}
		}

		var errors = [];
		if (invalidFormatRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + invalidFormatRows.join(", ") + "</b>"});
		}
		return errors;
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow,
		validate: _validate
	});

});