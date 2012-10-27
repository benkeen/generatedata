"use strict";

define([
	"constants",
	"lang",
	"manager"
], function(C, L, manager) {

	var MODULE_ID = "export-type-XML";
	var LANG = L.exportTypePlugins.XML;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		manager.subscribe(MODULE_ID, subscriptions);

		// assign event handlers for the custom sections option
		$("#etXML_useCustomExportFormat").bind("change", function() {
			if (this.checked) {
				$("#etXML_customFormat").removeAttr("disabled").removeClass("gdDisabled");
			} else {
				$("#etXML_customFormat").attr("disabled", "disabled").addClass("gdDisabled");
			}
		});

		// for onload
		if ($("#etXML_useCustomExportFormat").attr("checked")) {
			$("#etXML_customFormat").removeAttr("disabled").removeClass("gdDisabled");
		}
	}

	/**
	 * Called when the user changes the result type. This just changes the 2nd column heading to be
	 * "Node Name" rather than the default "Column Title".
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType == "XML") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	}

	/**
	 * Our validation function performed when the user clicks the main Generate button. This ensures the
	 * XML additional settings are filled in properly and all rows have a valid node name.
	 */
	var _validate = function() {

/*
		var missingNodeNames  = [];
		var invalidNodeNames  = [];
		var missingTableNames = [];
		var invalidTableNames = [];

		var visibleRowNum = 0;
		var dataTypeValidationFunctions = [];
		for (var i=0; i<orderedRowIDs.length; i++) {
			var nodeNum = orderedRowIDs[i];
			visibleRowNum++;

			// ignore rows that haven't specified a data type
			if ($("#type_" + nodeNum).val() == "") {
				continue;
			}

			switch (resultType) {
				case "XML":
					if ($("#title_" + nodeNum).val() == "") {
						missingNodeNames.push([$("#title_" + nodeNum), visibleRowNum]);
					} else if ($("#title_" + nodeNum).val().match(/\W/) || $("#title_" + nodeNum).val().match(/^[^a-zA-Z]/)) {
						invalidNodeNames.push([$("#title_" + nodeNum), visibleRowNum]);
					}
					break;

				case "SQL":
					if ($("#title_" + nodeNum).val() == "") {
						missingTableNames.push([$("#title_" + nodeNum), visibleRowNum]);
					} else if ($("#title_" + nodeNum).val().match(/\W/) || $("#title_" + nodeNum).val().match(/^[^a-zA-Z]/)) {
						invalidTableNames.push([$("#title_" + nodeNum), visibleRowNum]);
					}
					break;
			}

			// keep track of the data types that have custom validation routines
			var func_ns = $("#type_" + nodeNum).val() + "_ns";
			if (typeof window[func_ns] === "object" && typeof window[func_ns].validate === "function") {
				if (!_multiDimArrayContains(func_ns, dataTypeValidationFunctions)) {
					dataTypeValidationFunctions.push([func_ns, [nodeNum]]);
				} else {
					dataTypeValidationFunctions = _multiDimArrayAddRow(func_ns, dataTypeValidationFunctions, nodeNum);
				}
			}

			numGeneratedRows++;
		}

		if (missingNodeNames.length) {
			var problemFields = [];
			var rowNumbers    = [];
			for (var i=0; i<missingNodeNames.length; i++) {
				problemFields.push(missingNodeNames[i][0]);
				rowNumbers.push(missingNodeNames[i][1]);
			}
			utils.addValidationErrors({ els: problemFields, error: L.missing_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
		}
		if (invalidNodeNames.length) {
			var problemFields = [];
			var rowNumbers    = [];
			for (var i=0; i<invalidNodeNames.length; i++) {
				problemFields.push(invalidNodeNames[i][0]);
				rowNumbers.push(invalidNodeNames[i][1]);
			}
			utils.addValidationErrors({ els: problemFields, error: L.missing_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
			Generator.errors.push({ els: problemFields, error: L.invalid_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
		}
		if (missingTableNames.length) {
			var problemFields = [];
			var rowNumbers    = [];
			for (var i=0; i<missingTableNames.length; i++) {
				problemFields.push(missingTableNames[i][0]);
				rowNumbers.push(missingTableNames[i][1]);
			}
			Generator.errors.push({ els: problemFields, error: L.missing_table_names + " <b>" + rowNumbers.join(", ") + "</b>" });
		}
		if (invalidTableNames.length) {
			var problemFields = [];
			var rowNumbers    = [];
			for (var i=0; i<invalidTableNames.length; i++) {
				problemFields.push(invalidTableNames[i][0]);
				rowNumbers.push(invalidTableNames[i][1]);
			}
			Generator.errors.push({ els: problemFields, error: L.invalid_table_names + " <b>" + rowNumbers.join(", ") + "</b>" });
		}

		if (resultType == "XML") {
			if ($("#xml_root_node_name").val() == "") {
				Generator.errors.push({ els: [$("#xml_root_node_name")], error: L.missing_xml_root_node_name });
			} else if ($("#xml_root_node_name").val().match(/\W/)) {
				Generator.errors.push({ els: [$("#xml_root_node_name")], error: L.invalid_xml_root_node_name });
			} else if ($("#xml_record_node_name").val() == "") {
				Generator.errors.push({ els: [$("#xml_record_node_name")], error: L.missing_xml_record_node_name });
			} else if ($("#xml_record_node_name").val().match(/\W/)) {
				Generator.errors.push({ els: [$("#xml_record_node_name")], error: L.invalid_xml_record_node_name });
			}
		}
*/
	}

	manager.register(MODULE_ID, C.COMPONENT.EXPORT_TYPE, {
		init: _init,
		validate: _validate
	});
});