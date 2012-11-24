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
	var _dataTypes = {};   // populated onload with all data types from the /data_types folder
	var _exportTypes = {};
	var _currExportType = null; // populated onload
	var _subscriptions = {};
	var _showExportTypeSettings = true;
	var _codeMirror = null;

	var _lastSelectedDataType = null;

	// the number of results being generated
	var _numRowsToGenerate;

	// for storing data during in-page data generation
	var _generateInPageRunningCount;
	var _generateInPageBatchNum;
	var _generateInPageData;
	var _generateInPageContent = "";


	/**
	 * Called when everything is loaded. This binds the appropriate event handlers and sets up the
	 * page.
	 */
	var _run = function() {
		$("#gdCountries").chosen().change(_updateCountryChoice);
		$("#gdGenerateButton,#gdRegenerateButton").on("click", _generateData);
		$("#gdBackButton").on("click", function() { return _showSubtab(1); })
		$(".gdSectionHelpTip li").bind("mouseover", function() { $(this).addClass('ui-state-hover'); });
		$(".gdSectionHelpTip li").bind("mouseout", function() { $(this).removeClass('ui-state-hover'); });
		$(".gdSectionHelpTip").bind("click", _showSectionHelpTip);
		$("#gdShowSettingsLink").bind("click", function() {
			// if we're already showing it, hide it!
			if (_showExportTypeSettings) {
				_hideExportTypeSettingsSection();
			} else {
				_showExportTypeSettingsSection(_currExportType);
			}
			return false;
		});

		// each event is handled separately to ensure that the Change Data Type event isn't unnecessarily
		// republished. Only really an issue on Firefox, which publishes keyup and change events when
		// changing the selected option via the keyboard (up and down). It also allows us to tab off the field
		// into whatever field is displayed next.
		$("#gdTableRows").on("change keyup", ".gdDataType", _onChangeDataType);
		$("#gdTableRows").on("focus", ".gdDataType", _onFocusDataType);

		$("#gdTableRows").on("change", ".gdDeleteRows", _markRowToDelete);
		$("#gdTableRows").on("click", ".ui-icon-help", _showHelpDialog);
		$("#gdTableRows").on("change", ".gdColExamples select", _publishExampleChange);

		$("#gdTableRows").sortable({
			handle: ".gdColOrder",
			axis: "y",
			update: function(event, ui) {
				_updateVisibleRowNums();
				manager.publish({
					sender: MODULE_ID,
					type: C.EVENT.DATA_TABLE.ROW.RE_SORT,
					row: ui.item
				});
			}
		});

		$(document).on("click", ".gdMessageClose", function(e) {
			$(e.target).closest(".gdMessage").hide("blind", null, 500);
			return false;
		});

		$("#gdData").bind("submit", _generateData);
		$("#gdExportTypeTabs>ul>li").bind("click", function(e) {
			_selectExportTypeTab($(e.target).data("exportType"));
		});

		$(".gdAddRowsBtn").bind("click", function() { _addRows($("#gdNumRowsToAdd").val()); });
		$(".gdDeleteRowsBtn").bind("click", _deleteRows);
		$("#gdEmptyForm").bind("click", function() { _emptyForm(true, 5); return false; });
		$("#gdResetPluginsBtn").bind("click", _resetPluginsDialog);
		$("#gdTextSize").on("click", "li", _changeTextSize);

		_initExportTypeTab();
		_updateCountryChoice();
		_addRows(3);
		_initInPageCodeMirror();
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
			utils.addValidationErrors({ els: [$("#gdNumRowsToAdd")], error: L.no_num_rows });
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

		_updateVisibleRowNums();
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
			}
		});

		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.DELETE,
			rowIDs: rowIDs
		});

		_updateVisibleRowNums();
	};

	var _updateVisibleRowNums = function() {
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

	/**
	 * Resets the entire page back to it's defaults: default countries, a blank table and the default data
	 * format. TODO
	 */
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

	var _initExportTypeTab = function() {
		var newExportType = $("#gdExportTypeTabs>ul>li.selected").data("exportType");
		_selectExportTypeTab(newExportType);
	}

	/**
	 * Called whenever the user changes the result type (XML, HTML, CSV etc). This function publishes
	 * the appropriate event in case a plugin needs to be aware of the event, but it handles the
	 * hiding/showing and changing of the title column label "out-the-box" rather than force
	 * the Export Type modules to have to do the work.
	 */
	var _selectExportTypeTab = function(newExportType) {
		if (newExportType == _currExportType) {
			return;
		}

		if (_currExportType != null) {
			$("#gdExportTypeTabs>ul>li").removeClass("selected");
			$("#gdExportType_" + newExportType).addClass("selected");
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

		// hide and show the appropriate Export Type additional settings section (if the + showdata format options link
		// has been clicked)
		if (_showExportTypeSettings) {
			_showExportTypeSettingsSection(newExportType);
		}

		_currExportType = newExportType;
	};


	var _showExportTypeSettingsSection = function(newExportType) {
		if ($("#gdExportTypeAdditionalSettings_" + _currExportType).length > 0 && _showExportTypeSettings) {
			$("#gdExportTypeAdditionalSettings_" + _currExportType).hide("blind", C.EXPORT_TYPE_SETTINGS_BLIND_SPEED);
		}
		if (_currExportType == null) {
			$("#gdExportTypeAdditionalSettings_" + newExportType).show();
		} else {
			$("#gdExportTypeAdditionalSettings_" + newExportType).show(
				"blind",
				C.EXPORT_TYPE_SETTINGS_BLIND_SPEED,
				function() {
					_showExportTypeSettings = true;
					$("#gdShowSettingsLink span").html("-");
					$("#gdShowSettingsLink a").html("hide data format options");
				}
			);
		}
	}

	var _hideExportTypeSettingsSection = function() {
		$("#gdExportTypeAdditionalSettings_" + _currExportType).hide(
			"blind",
			C.EXPORT_TYPE_SETTINGS_BLIND_SPEED,
			function() {
				_showExportTypeSettings = false;
				$("#gdShowSettingsLink span").html("+");
				$("#gdShowSettingsLink a").html("show data format options");
			}
		);
	}

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
	 * Called whenever the user focuses on a Row Type. This makes a note of the last selected
	 * Data Type, to prevent unnecessary re-publishing of (non-)changed data types.
	 */
	var _onFocusDataType = function(e) {
		_lastSelectedDataType = e.target.value;
	}

	/**
	 * Called when the user changes the Data Type for a particular row.
	 */
	var _onChangeDataType = function(e) {
		if (e.target.value != _lastSelectedDataType) {
			_publishDataTypeChange(e.target);
		}
	}

	var _publishDataTypeChange = function(el) {
		var rowID = parseInt($(el).attr("id").replace(/^gdDataType_/, ""));
		var dataTypeModuleID = el.value;

		// make a note of the last value
		_lastSelectedDataType = dataTypeModuleID;

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
		var noOptionsTest = function() {
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

				var dataTypeExampleHTML = $("#gdDataTypeExamples_" + dataTypeModuleID).html();
				if (dataTypeExampleHTML != "") {
					exampleHTML = dataTypeExampleHTML.replace(/%ROW%/g, rowID);
				} else {
					exampleHTML = "&nbsp;" + L.no_examples_available;
				}
				$("#gdColExamples_" + rowID).html(exampleHTML);

				var dataTypeOptionHTML = $("#gdDataTypeOptions_" + dataTypeModuleID).html();
				if (dataTypeOptionHTML != "") {
					optionsHTML = dataTypeOptionHTML.replace(/%ROW%/g, rowID);
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
			readyTest
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
	 * Called when the user submits the main Generate tab. It performs all necessary validation
	 * and starts the data generation process.
	 */
	var _generateData = function() {
		_numRowsToGenerate = $("#gdNumRowsToGenerate").val();
		utils.clearValidationErrors($("#gdTab1Content"));

		// check the users specified a numeric value for the number of results
		if (_numRowsToGenerate.match(/\D/) || _numRowsToGenerate == 0 || _numRowsToGenerate == "") {
			utils.addValidationErrors({ el: $("#gdNumRowsToGenerate"), error: L.invalid_num_results });
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

		var exportTarget = $("input[name=gdExportTarget]:checked")[0].value;
		var rowOrder = _getRowOrder().toString();
		$("#gdRowOrder").val(rowOrder);
		$("#gdExportType").val(_currExportType);
		$("#gdNumCols").val(_numRows);

		// reset CodeMirror (scrollTo not working ...)
		_codeMirror.setOption("lineWrapping", false);
		_codeMirror.scrollTo(0, 0);

		// now pass off the work to the appropriate generation function. Each works slightly differently.
		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.GENERATE,
			exportTarget: exportTarget,
			exportType: _currExportType,
			editor: _codeMirror
		});

		// TODO doesn't seem to work
		if (exportTarget == "inPage") {
			_generateInPage();
			return false;
		} else if (exportTarget == "newTab") {
			_generateNewWindow();
		} else if (exportTarget == "promptDownload") {
			_generatePromptDownload();
		}
	};


	/**
	 * Generate the results in-page. This option hides the generator table and displays the results in a large,
	 * CodeMirror-enhanced textarea. This is the only generation format that makes use of *batches*: since generation
	 * can take a long time, this passes off work to the server in batches of (say) 100, so the user can see the
	 * generation process take place.
	 */
	var _generateInPage = function() {
		var formData = $("#gdData").serialize();

		// "action" added for AjaxRequest only
		var data = formData + "&action=generateInPage&gdBatchSize=" + C.GENERATE_IN_PAGE_BATCH_SIZE;
		_showSubtab(2);

		_codeMirror.setValue("");
		_generateInPageRunningCount = 0;
		$("#gdGenerateCount").html(utils.formatNumWithCommas(_generateInPageRunningCount));
		$("#gdGenerateTotal").html(utils.formatNumWithCommas(_numRowsToGenerate));
		$("#gdProgressMeter").attr("max", _numRowsToGenerate);
		$("#gdProgressMeter").attr("value", 0);

		_generateInPageBatchNum = 1;
		_generateInPageData = data;
		_generateInPageContent = "";
		_generateInPageBatch();
	}

	var _generateInPageBatch = function() {
		var data = _generateInPageData + "&gdCurrentBatchNum=" + _generateInPageBatchNum;
		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: data,
			dataType: "json",
			success: _generateInPageBatchResponse,
			error: function(response) {
				console.log("error response: ", response);
			}
		});
	}

	var _generateInPageBatchResponse = function(response) {
		if (response.success) {
			// 1. Update the running count ("Generated X of Y rows")
			_generateInPageRunningCount = (_generateInPageRunningCount + C.GENERATE_IN_PAGE_BATCH_SIZE) > _numRowsToGenerate ?
				_numRowsToGenerate : _generateInPageRunningCount + C.GENERATE_IN_PAGE_BATCH_SIZE;
			$("#gdGenerateCount").html(utils.formatNumWithCommas(_generateInPageRunningCount));
			$("#gdProgressMeter").attr("value", _generateInPageRunningCount);

			// 2. Update the actual content
			_generateInPageContent += response.content;
			_codeMirror.setValue(_generateInPageContent);

			// now either continue processing, or indicate we're done
			if (response.isComplete) {
				//$("#gdGenerateInPageLoading").hide("fade");
				// TODO disable "cancel" link

			} else {
				_generateInPageBatchNum++;
				_generateInPageBatch();
			}
		} else {

		}
	}

	var _generateNewWindow = function() {
		$("#gdData").attr({
			"target": "blank",
			"action": "generate.php"
		});
	}

	var _generatePromptDownload = function() {
		$("#gdData").attr({
			"target": "blank",
			"action": "generate.php"
		});
	}

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


	// utils.updateMessageBlock($("#settingsTabMessage"), "error");

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

	var _showSectionHelpTip = function() {
		var tipText = "";
		var titleText = "";
		switch ($(this).data("tip")) {
			case "country-specific-data":
				titleText = "Country-specific Data";
				tipText = L.tip_country_data;
				break;
			case "data-set":
				titleText = "Data Set";
				tipText = L.tip_data_set;
				break;
			case "data-format":
				titleText = "Data Format";
				tipText = L.tip_data_format;
				break;
		}

		var myDialog = $("#gdHelpPopup").html(tipText).dialog({
			autoOpen:  false,
			modal:     true,
			resizable: false,
			title:     titleText,
			width:     500
		});
		myDialog.dialog("open");
	}


	var _changeTextSize = function(e) {
		$("#gdTextSize li").removeClass("selected");
		var size = $(e.target).attr("class");
		$(e.target).addClass("selected");
		$("#gdGenerateSubtab2 .CodeMirror").removeClass("CodeMirror_small CodeMirror_medium CodeMirror_large").addClass("CodeMirror_" + size);
		_codeMirror.refresh();
	}

	/**
	 * Called on page load. We always instantiate the codemirror object on the generate in-page. This object is
	 * passed in the C.EVENT.GENERATE message for export types to mess with (i.e. change the mode).
	 */
	var _initInPageCodeMirror = function() {
		_codeMirror = CodeMirror.fromTextArea($("#gdGeneratedData")[0], {
			mode: "xml",
			readOnly: true,
			lineNumbers: true
		});
		$(".CodeMirror").addClass("CodeMirror_medium");
	}

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
		 * was first generated. This function returns the visible number of the row number, used for generating
		 * helpful error messages.
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