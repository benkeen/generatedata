/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	var MODULE_ID = "data-type-Rut";
	var LANG = L.dataTypePlugins.Names;

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {},
			isComplete: function() {
				if ($("#dtOption_" + rowNum).length) {
					$("#dtExample_" + rowNum).val(data.formatCode);
					
					if ($("#dtThouSep_" + rowNum).length) {
						if (data.thousep) {
							$("#dtThouSep_" + rowNum).attr("checked", "checked");
						} else {
							$("#dtThouSep_" + rowNum).removeAttr("checked");
						}
					}
					if ($("#dtUpperDigit_" + rowNum).length) {
						if (data.upper) {
							$("#dtUpperDigit_" + rowNum).attr("checked", "checked");
						} else {
							$("#dtUpperDigit_" + rowNum).removeAttr("checked");
						}
					}
					if ($("#dtRemoveDash_" + rowNum).length) {
						if (data.remdash) {
							$("#dtRemoveDash_" + rowNum).attr("checked", "checked");
						} else {
							$("#dtRemoveDash_" + rowNum).removeAttr("checked");
						}
					}
					
				}
				
				return true;
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"formatCode":  $("#dtExample_" + rowNum).val(),
			"thousep": ($("#dtThouSep_" + rowNum).attr("checked")) ? "checked" : "",
			"upper": ($("#dtUpperDigit_" + rowNum).attr("checked")) ? "checked" : "",
			"remdash": ($("#dtRemoveDash_" + rowNum).attr("checked")) ? "checked" : ""
		};
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});