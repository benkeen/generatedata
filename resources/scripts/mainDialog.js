/*global $:false,CodeMirror:false,console:false */
define([
	"manager",
	"generator",
	"utils",
	"constants",
	"lang"
], function(manager, generator, utils, C, L) {

	"use strict";

	/**
	 * @name MainDialog
	 * @see Core
	 * @description This contains all the code for handling the main dialog.
	 * @author Ben Keen
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-mainDialog";
	var _currHelpDialogTab = 1;
	var _currDataTypeHelp = null;


	var _run = function() {
		$(".gdSectionHelp").on("click", _showHelpSection);
		$("#gdLoadLink").on("click", function() { return _openMainDialog({ tab: 2 }); });
		$("#gdHelpLink").bind("click", function() { return _openMainDialog({ tab: 3 }); });
		$("#gdAccountDataSets").on("change", ".gdDeleteDataSets", _markDataSetRowToDelete);
		$(".gdDeleteDataSetsBtn").bind("click", _confirmDeleteDataSets);
		$("#gdDataSetHelpNav").on("click", "a", _onclickDataTypeHelpNav);
		$("#gdTableRows").on("click", ".ui-icon-help", _onClickDataSetRowHelp);

		_initMainDialog();
	};


	var _showHelpSection = function(e) {
		_openMainDialog({ tab: 3 });

		// highlight the appropriate help section to draw attention to it
		var section = $(e.target).data("helpSection");
		var helpEl = null;
		if (section == "countryData") {
			helpEl = "gdHelpSection_CountryData";
		} else if (section == "dataTypes") {
			helpEl = "gdHelpSection_DataSets";
		} else if (section == "exportTypes") {
			helpEl = "gdHelpSection_ExportTypes";
		}
		if (helpEl !== null) {
			$("#" + helpEl).css("background-color", "#63A62F").animate({ backgroundColor: "#EBFEEB"}, 1500);
		}
	};

	var _initMainDialog = function() {
		$("#gdMainDialogTabs ul li").each(function() {
			var newTab = parseInt($(this).attr("id").replace(/^gdMainDialogTab/, ""), 10);
			$(this).bind("click", function() {
				utils.selectTab({ tabGroup: "dialogTabs", tabIDPrefix: "gdMainDialogTab", newTab: newTab, oldTab: _currHelpDialogTab } );
				_currHelpDialogTab = newTab;

				// if the user just clicked into the Data Type help tab, ensure the first Data Type listed is selected
				if (newTab == 4 && _currDataTypeHelp === null) {
					var dataTypeItems = $("#gdDataSetHelpNav li").not(".gdDataTypeHeader");
					_showDataTypeHelp(dataTypeItems[0]);
				}
			});
		});
	};

	var _onclickDataTypeHelpNav = function(e) {
		var dataTypeNavItem = $(e.target).closest("li");
		_showDataTypeHelp(dataTypeNavItem);
	};

	var _showDataTypeHelp = function(el) {
		var dataType = $(el).data("module");
		var link = $(el).find("a");

		$("#gdDataSetHelpNav a").removeClass("gdSelected");
		$(link).addClass("gdSelected");

		// set the header to the name of the Data Type
		$("#gdFocusedDataTypeHeader").html($(link).html());

		if (_currDataTypeHelp !== null) {
			$("#gdDataTypeHelp_" + _currDataTypeHelp).addClass("hidden");
		}
		$("#gdDataTypeHelp_" + dataType).removeClass("hidden");
		_currDataTypeHelp = dataType;
	};


	var _onClickDataSetRowHelp = function(e) {
		var row = $(e.target).closest(".gdTableRow");
		var dataTypeDropdown = row.find(".gdDataType");
		var choice = dataTypeDropdown.val();

		_openMainDialog({ tab: 4, dataType: choice });

		manager.publish({
			sender: MODULE_ID,
			type: C.EVENT.DATA_TABLE.ROW.HELP_DIALOG_OPEN,
			rowElement: row
		});
	};


	var _openMainDialog = function(settings) {
		var opts = $.extend({
			tab: 1,
			dataType: null
		}, settings);

		// hide/show the appropriate tab
		$("#gdMainDialogTab" + opts.tab).trigger("click");

		// remove any custom styles
		$(".gdHelpSection").removeAttr("style");

		// if required, ensure the appropriate Data Type item is selected
		if (opts.dataType !== null) {
			var helpNavEl = ($("#gdDataSetHelpNav li[data-module='" + opts.dataType + "']"))[0];
			_showDataTypeHelp(helpNavEl);
		}

		// open the dialog
		$("#gdMainDialog").dialog({
			title: "generatedata.com",
			width: 800,
			minHeight: 400,
			modal: true,
			buttons: [
				{
					text: "Close",
					click: function() { $(this).dialog("close"); }
				}
			]
		});

		return false;
	};

	var _closeMainDialog = function() {
		$("#gdMainDialog").dialog("close");
	};


	var _markDataSetRowToDelete = function(e) {
		var el = e.target;
		var event = null;
		if (el.checked) {
			$(el).closest("tr").addClass("gdDeletedDataSetRow").effect("highlight", { color: "#cc0000" }, 1000);
		} else {
			$(el).closest("tr").removeClass("gdDeletedDataSetRow");
		}
	};


	var _confirmDeleteDataSets = function() {

	};



	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run,
		skipDomReady: false
	});



});
