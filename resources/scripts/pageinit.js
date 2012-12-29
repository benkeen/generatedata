/*global $:false*/
define([
	"manager",
	"utils",
	"jquery-ui",
	"jquery-json"
], function(manager, utils) {

	"use strict";

	/**
	 * @name PageInit
	 * @see Core
	 * @description This runs on page load to initialize various general functionality needed: main tab
	 * events, language dropdown events etc.
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-pageInit";
	var _currMainTab = 1;

	var _init = function() {

		// show all those elements in the page that were marked as being hidden if no JS
		$(".gdHideNoJS").show();

		_initStartTab();
		_initMainTabs();
		$("#gdSelectLanguage").bind("change", _changeLanguage);

		// for the Settings tab
		$("#consoleEventsDataTypePlugins").chosen({ no_results_text: "No Data Types found" });
		$("#consoleEventsExportTypePlugins").chosen({ no_results_text: "No Export Types found" });
	};

	var _changeLanguage = function() {
		var langFile = $("#gdSelectLanguage").val();
		if (langFile !== "") {
			window.location = "?lang=" + langFile + "#t" + _currMainTab;
		}
	};

	// if the page was just reloaded, see if we need to display a particular tab
	var _initStartTab = function() {
		if (window.location.href.match(/#/)) {
			var tab = window.location.href.split("#")[1].replace(/^t/, "");

			if (utils.isNumber(tab)) {
				tab = parseInt(tab, 10);
				if (tab >= 1) {
					utils.selectTab({ tabGroup: "mainTabs", tabIDPrefix: "gdMainTab", newTab: tab, oldTab: 1 });
					_currMainTab = tab;
				}
			}
		}
	};

	var _initMainTabs = function() {
		$("#gdMainTabs ul li").each(function() {
			var newTab = parseInt($(this).attr("id").replace(/^gdMainTab/, ""), 10);
			$(this).bind("click", function() {
				utils.selectTab({ tabGroup: "mainTabs", tabIDPrefix: "gdMainTab", newTab: newTab, oldTab: _currMainTab } );

				window.location = window.location.href.split("#")[0] + "#t" + newTab;
				_currMainTab = newTab;

				// workaround for Chosen bug
				if (newTab == 1) {
					$("#gdCountries_chzn, #gdCountries_chzn .chzn-drop").css({ width: "100%" });
				}

				// hide any messages already open on the old tab
				$("#gdMainTab" + _currMainTab + "Content" + " .gdMessage").hide();
			});
		});
	};


	// register our module
	manager.registerCoreModule(MODULE_ID, {
		init: _init
	});

});