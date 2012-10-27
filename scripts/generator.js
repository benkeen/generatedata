"use strict";

/**
 * This file contains the core code for the generator. It initializes the default
 * functionality of the generator page, subscribes to and publishes all the appropriate Core
 * events.
 */
define([
	"manager",
	"pluginManager",
	"utils",
	"constants",
	"lang",
	"jquery-ui",
], function(manager, pluginManager, utils, C, L) {

	var MODULE_ID = "core-generator";
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


	/**
	 * Called when everything is loaded. This binds the appropriate event handlers.
	 */
	var _run = function() {
		$("#gdCountries").chosen().change(_updateCountryChoice);
		$("#gdGenerateSubtab1 button").on("click", function() { return _showSubtab(2) });

		$("#gdTableRows").on("change", ".gdDeleteRows", _markRowToDelete);
		$("#gdTableRows").on("change", ".gdDataType", _changeRowType);
		$("#gdTableRows").on("click", ".ui-icon-help", _showHelpDialog);
		$("#gdTableRows").on("change keyup", ".gdColExamples select", _publishExampleChange);
		$(document).on("click", ".gdMessageClose", function(e) {
			$(e.target).closest(".gdMessage").hide("blind", null, 500);
			return false;
		});
		$("#gdData").bind("submit", _generateData);
		$(".gdExportType").bind("click", _changeExportType);
		$(".gdAddRowsBtn").bind("click", function() { _addRows($("#gdNumRows").val()); });
		$(".gdDeleteRowsBtn").bind("click", _deleteRows);
		$("#gdEmptyForm").bind("click", function() { _emptyForm(true, 5); return false; });
		$("#gdTableRows").sortable({
			handle: ".gdColOrder",
			axis: "y",
			update: function(event, ui) {
				_restyleRows();
				manager.publish({
					sender: MODULE_ID,
					type: C.EVENT.DATA_TABLE.ROW.RE_SORT,
					row: ui.item
				});
			}
		});
		$("#gdResetPluginsBtn").bind("click", _resetPluginsDialog);
		$("#gdSettingsForm").bind("submit", _updateSettings);

		_changeExportType();
		_updateCountryChoice();
		_addRows(5);
	}

	var _showSubtab = function(tab) {
		if (tab == 1) {
			$("#gdGenerateSubtab1").show();
			$("#gdGenerateSubtab2").hide();
		} else {
			$("#gdGenerateSubtab1").hide();
			$("#gdGenerateSubtab2").show();
		}

		return false;
	}

	var _addRows = function(rows) {
		var rows = rows.toString();
		if (rows.match(/\D/) || rows == 0 || rows == "") {
			utils.clearValidationErrors($("#gdTab1Content"));
			utils.addValidationErrors({ els: [$("#gdNumRows")], error: L.no_num_rows });
			utils.displayValidationErrors("#gdMessages");
			return false;
		}

		var rowIDs = [];
		for (var i=1; i<=rows; i++) {
			var currRow = ++_numRows;
			rowIDs.push(currRow);
			var newRowHTML = $("#gdTableRowTemplate").html().replace(/%ROW%/g, currRow);
			$("#gdTableRows").append("<li class=\"gdTableRow\" id=\"row_" + currRow + "\">" + newRowHTML +"</li>");
		}

		_restyleRows();

		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.ADD,
			numRows: rows,
			rowIDs: rowIDs
		});
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

		manager.publish({
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
		manager.publish({
			sender: MODULE_ID,
			type: event,
			row: el
		});
	};

	var _emptyForm = function(requireConfirmation, numInitRows) {
		if (requireConfirmation) {
			$("<div></div>").html(L.confirm_empty_form).dialog({
				title: "Please confirm",
				modal: true,
				width: 360,
				buttons: [
					{
						text: "Yes",
						click: function() {
							$("#gdTableRows .gdDeleteRows").attr("checked", "checked");
							_deleteRows();
							if (numInitRows) {
								_addRows(numInitRows);
							}
							$(this).dialog("close");
						}
					},
					{
						text: "No",
						click: function() {
							$(this).dialog("close");
						}
					}
				]
			});
		} else {
			$("#gdTableRows .gdDeleteRows").attr("checked", "checked");
			_deleteRows();
			if (numInitRows) {
				_addRows(numInitRows);
			}
		}
	};

	/**
	 * Called whenever the user selects or deselects a Country. If any modules need to do
	 * anything special, they can subscribe to the appropriate event.
	 */
	var _updateCountryChoice = function() {
		_countries.length = 0;
		$("#gdCountries option").each(function() {
			if (this.selected) {
				_countries.push(this.value);
			}
		});
		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.COUNTRIES.CHANGE,
			countries: _countries
		});
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
		$("#gdColTitleTop,#gdColTitleBottom").html(L.row_label);

		manager.publish({
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


	var _publishExampleChange = function(e) {
		var select = e.target;
		var rowElement = $(select).closest(".gdTableRow");
		var rowID = parseInt($(rowElement).attr("id").replace(/^row_/, ""));
		var dataTypeFolder = $(rowElement).find(".gdDataType").val();

		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + dataTypeFolder,
			rowID: rowID,
			value: select.value
		});
	}

	/**
	 * Called when the user changes the Data Type for a particular row.
	 */
	var _changeRowType = function(e) {
		var rowID = parseInt($(e.target).attr("id").replace(/^gdDataType_/, ""));
		var dataTypeModuleID = e.target.value;

		// if the user just selected the empty value ("Please Select"), clear everything
		if (dataTypeModuleID == "") {
			$('#gdColExamples_' + rowID + ',#gdColOptions_' + rowID + ',#gdColHelp_' + rowID).html("");
			return;
		}

		// this is called whenever the row content (Options + Examples nodes) have been fully populated and the
		// DOM is ready.
		var onComplete = function() {
			manager.publish({
				sender: MODULE_ID,
				type: C.EVENT.DATA_TABLE.ROW.TYPE_CHANGE,
				rowID: rowID,
				dataTypeModuleID: dataTypeModuleID
			});
		}

		// our two "is ready" tests, which depend on the content for the current Data Type
		var noOptionsTest  = function() {
			onComplete();
			return true;
		};
		var hasOptionsTest = function() {
			var isReady = (typeof $("#dtOption_" + rowID) != "undefined");
			if (isReady) {
				onComplete();
			}
			return isReady;
		};
		var readyTest = ($("#gdDataTypeOptions_" + dataTypeModuleID).length > 0) ? hasOptionsTest : noOptionsTest;

		utils.pushToQueue([
			function() {
				var exampleHTML = null;
				var optionsHTML = null;

				if ($("#gdDataTypeExamples_" + dataTypeModuleID).html() != "") {
					exampleHTML = $("#gdDataTypeExamples_" + dataTypeModuleID).html().replace(/%ROW%/g, rowID);
				} else {
					exampleHTML = "&nbsp;" + L.no_examples_available;
				}
				$('#gdColExamples_' + rowID).html(exampleHTML);

				if ($("#gdDataTypeOptions_" + dataTypeModuleID).html() != "") {
					optionsHTML = $("#gdDataTypeOptions_" + dataTypeModuleID).html().replace(/%ROW%/g, rowID);
				} else {
					optionsHTML = L.no_options_available;
				}
				$('#gdColOptions_' + rowID).html(optionsHTML);

				if ($("#gdDataTypeHelp_" + dataTypeModuleID).html() != "") {
					$('#gdColHelp_' + rowID).html($("#gdHelpIcon").html().replace(/%ROW%/g, rowID));
				} else {
					$('#gdColHelp_' + rowID).html(" ");
				}
			},
			readyTest,
		]);

		utils.processQueue();
	}


	var _showHelpDialog = function(e) {
		var row = $(e.target).closest(".gdTableRow");
		var dataTypeDropdown = row.find(".gdDataType");
		var choice = dataTypeDropdown.val();
		var title = null;
		var opts = $(dataTypeDropdown)[0].options;
		for (var i=0; i<opts.length; i++) {
			if (choice == opts[i].value) {
				title = opts[i].text;
			}
		}

		var helpElement = $("#gdDataTypeHelp_" + choice);
		var dataTypeHelpContent = helpElement.html();
		var width = $(helpElement).data("dialogWidth");

		var myDialog = $('#gdHelpPopup').html(dataTypeHelpContent).dialog({
			autoOpen:  false,
			modal:     true,
			resizable: false,
			title:     title,
			width:     width,
			close:     function(e, ui) {
				manager.publish({
					sender: MODULE_ID,
					type: C.EVENT.DATA_TABLE.ROW.HELP_DIALOG_CLOSE,
					rowElement: row,
					event: e
				});
			}
		});
		myDialog.dialog('open');

		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.HELP_DIALOG_OPEN,
			rowElement: row
		});
	}


	var _getRowOrder = function() {
		var orderedRowIDs = $("#gdTableRows").sortable("toArray");
		var sortedOrder = [];
		for (var i=0; i<orderedRowIDs.length; i++) {
			var row = orderedRowIDs[i].replace(/row_/g, "");
			sortedOrder.push(row);
		}
		return sortedOrder;
	};


	/**
	 * Called when the user submits the main Generate tab. It performs all necessary validation.
	 */
	var _generateData = function() {
		var numResults = $("#gdNumResults").val();

		utils.clearValidationErrors($("#gdTab1Content"));

		// check the users specified a numeric value for the number of results
		if (numResults.match(/\D/) || numResults == 0 || numResults == "") {
			utils.addValidationErrors({ el: $("#gdNumResults"), error: L.invalid_num_results });
		}

		var orderedRowIDs = _getRowOrder();
		var exportType = $("input[name=gdExportType]:checked").val();
		var validRowIDs = [];

		// look through the form and construct an object of data-type-folder => [row IDs] to
		// pass to the manager. The manager uses that to farm out the actual validation work
		// to the appropriate module
		var rowValidationNeededGroupByDataType = {};
		for (var i=0; i<orderedRowIDs.length; i++) {
			var rowID = orderedRowIDs[i];
			var currRowType = $("#gdDataType_" + rowID).val();

			// ignore empty rows, they don't need validating
			if (!currRowType) {
				continue;
			}
			if (!rowValidationNeededGroupByDataType.hasOwnProperty(currRowType)) {
				rowValidationNeededGroupByDataType[currRowType] = [];
			}
			rowValidationNeededGroupByDataType[currRowType].push(rowID);
			validRowIDs.push(rowID);
		}

		// if none of the data columns had a selected data type, display an error about that, too
		if (!validRowIDs.length) {
			utils.addValidationErrors({ els: null, error: L.no_data });
		} else {
			// check all filled-in rows contained something in the first column
			var rowsMissingTitleEls = [];
			for (var i=0; i<validRowIDs.length; i++) {
				var currRowID = validRowIDs[i];
				var currTitle = $("#gdTitle_" + currRowID);
				if ($.trim(currTitle.val()) == "") {
					rowsMissingTitleEls.push(currTitle[0]);
				}
			}

			if (rowsMissingTitleEls.length) {
				var label = L.row_label_plural;
				if (L.exportTypePlugins[exportType].hasOwnProperty("row_label_plural")) {
					label = L.exportTypePlugins[exportType].row_label_plural;
				}
				var message = "Please enter all " + label + ".";
				utils.addValidationErrors({ els: rowsMissingTitleEls, error: message });
			}
		}

		utils.addValidationErrors(manager.validateDataTypes(rowValidationNeededGroupByDataType));

//		var exportTypeValidationErrors = manager.validateExportTypes({
//			rows: orderedRowIDs,
//			workNeeded: dataTypesToRows
//		});

		var errors = utils.getValidationErrors();
		if (errors.length) {
			utils.displayValidationErrors("#gdMessages");
			return false;
		}

		// for the moment, let's just assume ALL export types use the dialog. We can tweak this later.
		var formData = $("#gdData").serialize();
		var rowOrder = _getRowOrder().toString();
		var data = formData + "&rowOrder=" + rowOrder + "&action=generate&gdBatchSize=100&gdCurrentBatchNum=1&gdNumRowsToGenerate=" + numResults
		         + "&gdNumCols=" + _numRows;

		/*
		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: data,
			dataType: "json",
			success: function(response) {
				console.log("success: ", response);
				if (response.success) {
					$("#gdGeneratedContent").html(response.content);
				}
			},
			error: function(response) {
				console.log("response: ", response);
			}
		});
		*/

		return false;
	};


	var _resetPluginsDialog = function() {
		$("#gdPluginInstallation").dialog({
			modal:     true,
			resizable: true,
			title:     "Reset Plugins",
			width:     800,
			height:    400,
			open: function() {
				pluginManager.installPlugins({
					errorHandler: null,
					onCompleteHandler: function() {
						$("#gdPluginInstallation").dialog("option", "buttons", [
						    {
						    	text: "Refresh Page",
						    	click: function() {
						    		window.location.reload(true); // window.location.replace("index.php?message=plugins_reset#t3");
						    	}
						    }
						]);
					}
				});
			},
			buttons: [
			    {
			    	text: "Close",
			    	click: function() {
			    		$(this).dialog("close");
			    	}
			    }
			]
		});
		return false;
	}


	/**
	 * This updates the contents of the settings page. Once it gets complicated enough, this will be moved to a separate module.
	 */
	var _updateSettings = function(e) {
		e.preventDefault();
		utils.startProcessing();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "updateSettings",
				consoleWarnings: $("#gdSettingsConsoleWarnings")[0].checked,
				consoleEventsPublish: $("#gdSettingsConsoleEventsPublish")[0].checked,
				consoleEventsSubscribe: $("#gdSettingsConsoleEventsSubscribe")[0].checked,
				consoleCoreEvents: $("#gdSettingsConsoleCoreEvents")[0].checked,
				consoleEventsDataTypePlugins: $("#consoleEventsDataTypePlugins").val(),
				consoleEventsExportTypePlugins: $("#consoleEventsExportTypePlugins").val()
			},
			success: function(json) {
				utils.stopProcessing();
				if (json.success == 1) {
					$("#settingsTabMessage p").html(json.message);
					utils.updateMessageBlock($("#settingsTabMessage"), "notify");
				}
			},
			error: function(json) {
				utils.stopProcessing();
				if (json.success == 1) {
					$("#settingsTabMessage p").html(json.message);
					utils.updateMessageBlock($("#settingsTabMessage"), "error");
				}
			},
		});
	}

	var _multiDimArrayContains = function(target, arr) {
		for (var i=0; i<arr.length; i++) {
			if (arr[i][0] == target) {
				return true;
			}
		}
		return false;
	};

	var _multiDimArrayAddRow = function(target, arr, rowNum) {
		for (var i=0; i<arr.length; i++) {
			if (arr[i][0] == target) {
				arr[i][1].push(rowNum);
			}
		}
		return arr;
	};


	// register our module
	manager.register(MODULE_ID, C.COMPONENT.CORE, {
		run: _run,
		skipDomReady: false
	});


	// the public API for this module. These are the only revealed functions for use by other modules
	// that choose to include generator.js as a dependency. Even though the bulk of the functions are private,
	// it still contains a couple of handy methods

	return {
		getRowOrder: _getRowOrder,

		/**
		 * When a user re-orders or deletes some rows, the table gives the appearance of being numbered
		 * numerically 1-N, however the actual markup retains the original number scheme according to how it
		 * was first generated. This function returns the visible number of the
		 */
		getVisibleRowOrderByRowNum: function(rowNum) {
			var rowOrder = _getRowOrder();
			var visibleRowNum = 1;
			for (var i=0; i<rowOrder.length; i++) {
				if (rowOrder[i] == rowNum) {
					return visibleRowNum;
				}
				visibleRowNum++;
			}

			// shouldn't ever happen
			return false;
		}
	}

});
