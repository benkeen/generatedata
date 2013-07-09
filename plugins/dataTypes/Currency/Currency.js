/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Currency
	 * @description JS code for the Currency Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Currency";
	var LANG = L.dataTypePlugins.Currency;


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
		var problemFields = [];
		var problemFields2 = [];
		var problemFields3 = [];
		var invalidFormatRows = [];
		var invalidFromRange = [];
		var invalidToRange = [];
		for (var i=0; i<rows.length; i++) {
			var format = $("#dtCurrencyFormat_" + rows[i]);
			var from   = $("#dtCurrencyRangeFrom_" + rows[i]);
			var to     = $("#dtCurrencyRangeTo_" + rows[i]);
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);

			if ($.trim(format.val()) === "") {
				invalidFormatRows.push(visibleRowNum);
				problemFields.push(format);
			}
			if (from.val() === "" || from.val().match(/[^\d\.\-]/)) {
				invalidFromRange.push(visibleRowNum);
				problemFields2.push(from);
			}
			if (to.val() === "" || to.val().match(/[^\d\.\-]/)) {
				invalidToRange.push(visibleRowNum);
				problemFields3.push(to);
			}
		}

		var errors = [];
		if (invalidFormatRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + invalidFormatRows.join(", ") + "</b>"});
		}
		if (invalidFromRange.length) {
			errors.push({ els: problemFields2, error: LANG.invalid_range_fields + " <b>" + invalidFromRange.join(", ") + "</b>"});
		}
		if (invalidToRange.length) {
			errors.push({ els: problemFields3, error: "2" + LANG.invalid_range_fields + " <b>" + invalidToRange.join(", ") + "</b>"});
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