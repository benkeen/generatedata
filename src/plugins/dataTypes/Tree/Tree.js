/*global $:false,define:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name Tree
	 * @description JS code for the Tree Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-Tree";
	var LANG = L.dataTypePlugins.Tree;


	var _saveRow = function(rowNum) {
		return {
			autoIncRowNum: $("#dtTreeAutoIncrementRowNum_" + rowNum).val(),
			maxSiblings: $("#dtTreeMaxSiblings_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() { },
			isComplete: function() {
				if ($("#dtTreeMaxSiblings_" + rowNum).length) {
					$("#dtTreeAutoIncrementRowNum_" + rowNum).val(data.autoIncRowNum);
					$("#dtTreeMaxSiblings_" + rowNum).val(data.maxSiblings);
					return true;
				}
				return false;
			}
		};
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		var isInt = /^\d+$/;
		for (var i=0; i<rows.length; i++) {
			var autoIncRowNum = $.trim($("#dtTreeAutoIncrementRowNum_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (autoIncRowNum === "" || !isInt.test(autoIncRowNum)) {
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dtTreeAutoIncrementRowNum_" + rows[i]));
			}
			var maxSiblings = $.trim($("#dtTreeMaxSiblings_" + rows[i]).val());
			if (maxSiblings === "" || !isInt.test(maxSiblings)) {
				if ($.inArray(visibleRowNum, visibleProblemRows) == -1) {
					visibleProblemRows.push(visibleRowNum);
				}
				problemFields.push($("#dtTreeMaxSiblings_" + rows[i]));
			}
		}
	
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.invalid_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};


	manager.registerDataType(MODULE_ID, {
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});

});