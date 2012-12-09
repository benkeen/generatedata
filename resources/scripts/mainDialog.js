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
		$("#gdDataSetHelpNav").on("click", "a", _showDataTypeHelp);

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
			});
		});
	};

	var _showDataTypeHelp = function(e) {
		var dataType = $(e.target).closest("li").data("module");

		$("#gdDataSetHelpNav a").removeClass("gdSelected");
		$(e.target).addClass("gdSelected");

		if (_currDataTypeHelp !== null) {
			$("#gdDataTypeHelp_" + _currDataTypeHelp).addClass("hidden");
		}
		$("#gdDataTypeHelp_" + dataType).removeClass("hidden");
		_currDataTypeHelp = dataType;
	};

	var _openMainDialog = function(settings) {
		var opts = $.extend({
			tab: 1,
			dataType: null
		}, settings);

		// hide/show the appropriate tab
		$("#gdMainDialogTab" + opts.tab).trigger("click");

		// if a Data Type help item was just clicked, ensure the appropriate help item is shown

		// remove any custom styles
		$(".gdHelpSection").removeAttr("style");

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
