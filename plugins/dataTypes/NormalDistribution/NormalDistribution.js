/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name NormalDistribution
	 * @description JS code for the NormalDistribution Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-NormalDistribution";
	var LANG = L.dataTypePlugins.NormalDistribution;
	var subscriptions = {};

	var _init = function() {
	};

	var _saveRow = function(rowNum) {
		return {
			"mean": $("#dtOptionMean_" + rowNum).val(),
			"sigma": $("#dtOptionSigma_" + rowNum).val()
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtOptionMean_" + rowNum).val(data.mean);
				$("#dtOptionSigma_" + rowNum).val(data.sigma);
			},
			isComplete: function() { return $("#dtOptionSigma_" + rowNum).length > 0; }
		};
	};

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var currMean  = $("#dtOptionMean_" + rows[i]);
			var currSigma = $("#dtOptionSigma_" + rows[i]);

			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if ($.trim(currMean.val()) === "" || $.trim(currSigma.val()) === "") {
				visibleProblemRows.push(visibleRowNum);

				if ($.trim(currMean.val()) === "") {
					problemFields.push(currMean);
				}
				if ($.trim(currSigma.val()) === "") {
					problemFields.push(currSigma);
				}
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	};

	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});