/*global $:false*/
define([
	"manager",
	"constants"
], function(manager, C) {

	"use strict";

	/**
	 * @name Date
	 * @description JS code for the Credit Card Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-CreditCard";
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.DATA_TABLE.ROW.TYPE_CHANGE] = _dataTypeChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _dataTypeChange = function(msg) {
		$("#dtCreditCardType_" + msg.rowID).chosen();
	};
	
	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtCreditCardType_" + rowNum).val(data.creditCardTypeCodes);
			},
			isComplete: function() {
				return true;
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"creditCardTypeCodes": $("#dtCreditCardType_" + rowNum).val()
		};
	};

	manager.registerDataType(MODULE_ID, {
		init: _init,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});