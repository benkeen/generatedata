/**
 * This file contains the core code for the generator. It initializes the default
 * functionality of the generator page, subscribes to and publishes all the appropriate Core
 * events.
 */
define([
	"mediator",
	"utils",
	"constants",
	"lang",
	"jquery-ui",
], function(mediator, utils, C, L) {

	var MODULE_ID = "generator";
	var _numRows  = 0;
	var _request  = null;
	var _countries = [];
	var _allCountries = [];
	var _lastJsonResponse = null;
	var _queue = [];
	var _deletedRows = [];
	var _dataTypes = {};   // populated onload with all data types from the /data_types folder
	var _exportTypes = {};
	var _currExportType = null; // populated onload
	var _subscriptions = {};


	var _addRows = function(rows) {
		var rows = rows.toString();
		if (rows.match(/\D/) || rows == 0 || rows == "") {
			utils.clearErrors();
			Generator.errors.push({ els: [$("#gdNumRows")], error: L.no_num_rows });
			Generator.displayErrors();
			return false;
		}

		for (var i=1; i<=rows; i++) {
			var currRow = ++_numRows;
			var newRowHTML = $('#HTML_Row').html().replace(/\$ROW\$/g, currRow);
			$("#gdTableRows").append("<li class=\"gdTableRow\" id=\"row_" + currRow + "\">" + newRowHTML +"</li>");
		}

		$("#gdNumCols").val(Generator.numRows);
		_restyleRows();
	};

	/**
	 * This is called when the user actually clicks one of the DEL buttons, deleting those rows marked
	 * as deleted.
	 *
	 * @function
	 * @private
	 */
	var _deleteRows = function() {
		var rowIDs = [];
		$(".gdDeleteRows:checked").each(function() {
			var row = $(this).closest(".gdTableRow");
			var parentRowID = row.attr("id");
			if (parentRowID != null) {
				var rowID = parseInt(parentRowID.replace(/row_/g, ""), 10);
				row.remove();
				rowIDs.push(rowID);
				_deletedRows.push(rowID);
			}
		});

		mediator.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.DELETE,
			rowIDs: rowIDs
		});

		_restyleRows();
	};

	var _restyleRows = function() {
		$("#gdTableRows>li").removeClass("gdOddRow gdEvenRow");
		$("#gdTableRows>li:odd").addClass("gdOddRow");
		$("#gdTableRows>li:even").addClass("gdEvenRow");
		$("#gdTableRows>li .gdColOrder").each(function(i) { $(this).html(i+1); });
	};

	var _markRowToDelete = function(e) {
		var el = e.target;
		var event = null;
		if (el.checked) {
			$(el).closest(".gdTableRow").addClass("gdDeletedRow").effect("highlight", { color: "#cc0000" }, 1000);
			event = C.EVENT.DATA_TABLE.ROW.CHECK_TO_DELETE;
		} else {
			$(el).closest(".gdTableRow").removeClass("gdDeletedRow");
			event = C.EVENT.DATA_TABLE.ROW.UNCHECK_TO_DELETE;
		}
		mediator.publish({
			sender: MODULE_ID,
			type: event,
			row: el
		});
	};

	var _emptyForm = function(requireConfirmation, numInitRows) {
		if (requireConfirmation) {
			var answer = confirm(L.confirm_empty_form);
			if (!answer) {
				return false;
			}
		}

		$("input[name=deleteRows]").attr("checked", "checked");
		_deleteRows();
		if (numInitRows) {
			_addRows(numInitRows);
		}
	};

	/**
	 * Called whenever the user selects or deselects a Country. If any modules need to do
	 * anything special, they can subscribe to the appropriate event.
	 */
	var _updateCountryChoice = function(e) {

		_countries.length = 0;
		$(".gdCountryChoice").each(function() {
			if (this.checked) {
				_countries.push(this.value);
			}
		});

		mediator.publish({
			sender: MODULE_ID,
			type: C.EVENT.COUNTRIES.CHANGE,
			countries: _countries
		});


		/*
		// now hide/show all country-specific elements, based on what the user has selected)
		for (var i=0; i<_allCountries.length; i++) {
			var elements = $(".country_" + _allCountries[i]);

			// if selected, ensure that elements with that language's classes are visible
			var display = ($.inArray(_allCountries[i], _countries) != -1) ? "block" : "none";
			if (elements.length > 0) {
				for (var k=0; k<elements.length; k++) {
					elements[k].style.display = display;
				}
			}
		}
		*/
	};


	/**
	 * Called whenever the user changes the result type (XML, HTML, CSV etc). This function publishes
	 * the appropriate event in case a plugin needs to be aware of the event, but it handles the
	 * hiding/showing and changing of the title column label "out-the-box" rather than force
	 * the Export Type modules to have to do the work.
	 */
	var _changeExportType = function() {
		var newExportType = $(".gdExportType:checked").val();
		if (newExportType == _currExportType) {
			return;
		}

		// always reset the column heading to the default "Column Title". Export Types have the option
		// to overwrite it through the publish event below
		$("#gdColTitleTop,#gdColTitleBottom").html(L.column_title);

		mediator.publish({
			sender: MODULE_ID,
			type: C.EVENT.RESULT_TYPE.CHANGE,
			newExportType: newExportType,
			oldExportType: _currExportType
		});

		// hide and show the appropriate Export Type additional settings section
		if ($("#gdExportTypeAdditionalSettings_" + _currExportType).length > 0) {
			$("#gdExportTypeAdditionalSettings_" + _currExportType).hide("blind", null, C.EXPORT_TYPE_SETTINGS_BLIND_SPEED);
		}
		if (_currExportType == null) {
			$("#gdExportTypeAdditionalSettings_" + newExportType).show();
		} else {
			$("#gdExportTypeAdditionalSettings_" + newExportType).show("blind", null, C.EXPORT_TYPE_SETTINGS_BLIND_SPEED);
		}

		_currExportType = newExportType;
	};


	/**
	 * Our initialization function. This runs prior to ANY modules being actually run. It enables
	 * us to ensure all subscriptions are in place, prior to actually anything gets published.
	 */
	var _init = function() {

	};


	/**
	 * Called when everything is loaded. This binds the appropriate event handlers, which in turn
	 * publish the various events for the modules to pick up on.
	 */
	var _run = function() {
		$("#gdCountryList").on("click", "input", _updateCountryChoice);
		$("#gdTableRows").on("change", ".gdDeleteRows", _markRowToDelete);
		$("#gdTableRows").on("change", ".gdDataType", _changeRowType);
		$("#gdData").bind("submit", Generator.submitForm);

		$(".gdExportType").bind("click", _changeExportType);
		$(".gdAddRowsBtn").bind("click", function() { _addRows($("#gdNumRows").val()); });
		$(".gdDeleteRowsBtn").bind("click", _deleteRows);

		$("#gdEmptyForm").bind("click", function() { _emptyForm(true, 5); });
		$("#gdTableRows").sortable({
			handle: ".gdColOrder",
			axis: "y",
			update: function(event, ui) {
				_restyleRows();
				mediator.publish({
					sender: MODULE_ID,
					type: C.EVENT.DATA_TABLE.ROW.RE_SORT,
					row: ui.item
				});
			}
		});

		_changeExportType();
		_updateCountryChoice();
		_addRows(5);
	}


	/**
	 * Called when the user changes the Data Type for a particular row. Data Types populate the
	 * various content of the table by subscribing to the,
	 *
	 * The reason for this somewhat verbose process is to allow
	 */
	var _changeRowType = function(e) {

		var row = parseInt($(e.type).attr("id").replace(/^gdDataType_/, ""));
		var choice = e.target.value;

		// if the user just selected the empty value ("Please Select"), clear everything
		if (choice == "") {
			$('#example_' + row + ',#options_' + row + ',#help_' + row).html("");
			return;
		}

		var noOptionsTest  = function() { return true; };
		var hasOptionsTest = function() { return (typeof $("#option_" + row) != "undefined"); };
		var readyTest = ($("#dt_options_" + rowType).length > 0) ? hasOptionsTest : noOptionsTest;


		Generator.queue.push([
			function() {
				var exampleHTML = null;
				var optionsHTML = null;

				if ($("#dt_example_" + choice).length > 0) {
					exampleHTML = $("#dt_example_" + choice).html().replace(/\$ROW\$/g, row);
				} else {
					exampleHTML = "&nbsp;" + L.no_examples_available;
				}
				$('#example_' + row).html(exampleHTML);

				if ($("#dt_options_" + choice).length > 0) {
					optionsHTML = $("#dt_options_" + choice).html().replace(/\$ROW\$/g, row);
				} else {
					optionsHTML = "&nbsp;" + L.no_options_available;
				}
				$('#options_' + row).html(optionsHTML);

				if ($("#dt_help_" + choice).length > 0) {
					$('#help_' + row).html($("#HTML_question").html().replace(/\$ROW\$/g, row));
				} else {
					$('#help_' + row).html(" ");
				}
			},
			readyTest
		]);

		Generator.processQueue();
	}


	var Generator = {

		showHelpDialog: function(row) {
			var choice = $("#type_" + row).val();
			var title   = null;
			var opts = $("#type_" + row)[0].options;
			for (var i=0; i<opts.length; i++) {
				if (choice == opts[i].value) {
					title = opts[i].text;
				}
			}
			var width = Generator.dataTypes[choice].width;
			var myDialog = $('#helpPopup').html($("#dt_help_" + choice).html()).dialog({
				autoOpen:  false,
				modal:     true,
				resizable: false,
				title:     title,
				width:     width
			});
			myDialog.dialog('open');
		},


		changeStatementType: function() {
			if ($("input[name=sql_statement_type]:checked").val() == "update") {
				$("#spk1").attr("checked", "checked");
				$("input[name=sql_primary_key]").attr("disabled", "disabled");
			} else {
				$("input[name=sql_primary_key]").attr("disabled", "");
			}
		},

		// determines the target of the form: the hidden iframe for excel or a new window for HTML
		submitForm: function() {
			var numResults = $("#numResults").val();
			var numCols    = $("#numCols").val();

			g.clearErrors();

			// check numResults is an integer
			if (numResults.match(/\D/) || numResults == 0 || numResults == "") {
				Generator.errors.push({ el: $("#numResults"), error: L.invalid_num_results });
			}

			var error = false;
			var orderedRowIDs = Generator._getRowOrder();
			var resultType = $("input[name=resultType]:checked").val();
			var numGeneratedRows = 0;

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
					if (!Generator._multiDimArrayContains(func_ns, dataTypeValidationFunctions)) {
						dataTypeValidationFunctions.push([func_ns, [nodeNum]]);
					} else {
						dataTypeValidationFunctions = Generator._multiDimArrayAddRow(func_ns, dataTypeValidationFunctions, nodeNum);
					}
				}

				numGeneratedRows++;
			}

			// now call all data type validation functions
			for (var i=0; i<dataTypeValidationFunctions.length; i++) {
				var func = dataTypeValidationFunctions[i][0];
				var rows = dataTypeValidationFunctions[i][1];
				window[func].validate(rows);
			}

			if (missingNodeNames.length) {
				var problemFields = [];
				var rowNumbers    = [];
				for (var i=0; i<missingNodeNames.length; i++) {
					problemFields.push(missingNodeNames[i][0]);
					rowNumbers.push(missingNodeNames[i][1]);
				}
				Generator.errors.push({ els: problemFields, error: L.missing_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
			}
			if (invalidNodeNames.length) {
				var problemFields = [];
				var rowNumbers    = [];
				for (var i=0; i<invalidNodeNames.length; i++) {
					problemFields.push(invalidNodeNames[i][0]);
					rowNumbers.push(invalidNodeNames[i][1]);
				}
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
			else if (resultType == "CSV") {
				if ($("#csv_delimiter").val() == "") {
					Generator.errors.push({ els: [$("#csv_delimiter")], error: L.no_csv_delimiter });
				}
			}

			if (numGeneratedRows == 0) {
				Generator.errors.push({ els: null, error: L.no_data });
			}

			if (Generator.errors.length) {
				Generator.displayErrors();
				return false;
			}

			// all checks out. Set the form target and submit the sucker
			if (resultType == "HTML" || resultType == "XML" || resultType == "SQL") {
				document.gdData.target = "_blank";
			} else {
				document.gdData.target = "hiddenIframe";
			}

			// pass the ordered rows to the server, according to whatever sort the user's done
			$("#rowOrder").val(Generator._getRowOrder());
			$("#deletedRows").val(Generator.deletedRows.toString());

			return true;
		},


		// helper functions for the generator code

		_getRowOrder: function() {
			var orderedRowIDs = $("#tableRows").sortable("toArray");
			var sortedOrder = [];
			for (var i=0; i<orderedRowIDs.length; i++) {
				var row = orderedRowIDs[i].replace(/row_/g, "");
				sortedOrder.push(row);
			}
			return sortedOrder;
		},

		/**
		 * When a user re-orders or deletes some rows, the table gives the appearance of being numbered
		 * numerically 1-N, however the actual markup retains the original number scheme according to how it
		 * was first generated. This function finds the visible row order by the actual row number in the markup.
		 */
		_getVisibleRowOrderByRowNum: function(rowNum) {
			var rowOrder = Generator._getRowOrder();
			var visibleRowNum = 1;
			for (var i=0; i<rowOrder.length; i++) {
				if (rowOrder[i] == rowNum) {
					return visibleRowNum;
				}
				visibleRowNum++;
			}

			// shouldn't ever happen
			return false;
		},

		_multiDimArrayContains: function(target, arr) {
			for (var i=0; i<arr.length; i++) {
				if (arr[i][0] == target) {
					return true;
				}
			}
			return false;
		},

		_multiDimArrayAddRow: function(target, arr, rowNum) {
			for (var i=0; i<arr.length; i++) {
				if (arr[i][0] == target) {
					arr[i][1].push(rowNum);
				}
			}
			return arr;
		}
	};

	// register our module
	mediator.register(MODULE_ID, C.COMPONENT.CORE, {
		init: _init,
		run: _run,
		skipDomReady: false
	});

});
