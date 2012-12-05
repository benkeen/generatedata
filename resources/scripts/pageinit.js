/*global $:false*/
define([
	"utils",
	"jquery-ui",
	"jquery-json"
], function(utils) {

	"use strict";

	/**
	 * This module runs on page load for all pages, initializing a few things:
	 * the tab functionality and the language dropdown change event.
	 */

	$(function() {
		$(".gdHideNoJS").show();

		$("#gdTabs ul li").each(function() {
			var tab = parseInt($(this).attr("id").replace(/^gdTab/, ""), 10);
			$(this).bind("click", function() {
				utils.selectTab({ tabIDPrefix: "gdTabs", tab: tab } );
				window.location = window.location.href.split("#")[0] + "#t" + tab;

				// workaround for Chosen bug
				if (tab == 1) {
					$("#gdCountries_chzn, #gdCountries_chzn .chzn-drop").css({ width: "100%" });
				}
			});
		});

		// if the page was just reloaded, see if we need to display a particular tab
		if (window.location.href.match(/#/)) {
			var tab = window.location.href.split("#")[1].replace(/^t/, "");
			if (utils.isNumber(tab) && tab >= 1 && tab <= $("#gdTabs ul li").length) {
				utils.selectTab({ tabIDPrefix: "gdTabs", tab: tab });
				utils.currentTab = tab;
			}
		}

		$("#gdSelectLanguage").bind("change", utils.changeLanguage);

		// for the Settings tab
		$("#consoleEventsDataTypePlugins").chosen({ no_results_text: "No Data Types found" });
		$("#consoleEventsExportTypePlugins").chosen({ no_results_text: "No Export Types found" });
	});
});