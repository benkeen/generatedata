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
			execute: function() {},
			isComplete: function() {
				var optionField = $("#dtOption_" + rowNum);
				if (optionField.length) {
					if (data.checked) {
						optionField.attr("checked", "checked");
					} else {
						optionField.removeAttr("checked");
					}
					return true;
				} else {
					return false;
				}
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


	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});