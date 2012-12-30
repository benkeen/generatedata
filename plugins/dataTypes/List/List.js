/*global $:false*/
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

	/** @member */
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
			exactly:   $("#dtExactly_" + rowNum).val(),
			atMost:    $("#dtAtMost_" + rowNum).val(),
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

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	};

	manager.registerDataType(MODULE_ID, {
		init: _init,
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});