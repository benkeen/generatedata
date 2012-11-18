"use strict";

/**
 * This module runs on page load for all pages, initializing a few things:
 * the tab functionality and the language dropdown change event.
 */
define([
 	"utils",
	"jquery-ui",
	"jquery-json"
], function(utils) {

	$(function() {
		$(".gdHideNoJS").show();
		$("#gdTabs ul li").each(function() {
			var tabNum = parseInt($(this).attr("id").replace(/^gdTab/, ""), 10);
			$(this).bind("click", function(e, a) {
				utils.selectTab(tabNum);
				window.location = window.location.href.split("#")[0] + "#t" + tabNum;

				// workaround for Chosen bug
				if (tabNum == 1) {
					$("#gdCountries_chzn, #gdCountries_chzn .chzn-drop").css({ width: "100%" });

				}
			});
		});

		// if the page was just reloaded, see if we need to display a particular tab
		if (window.location.href.match(/#/)) {
			var tabNum = window.location.href.split("#")[1].replace(/^t/, "");
			if (utils.isNumber(tabNum) && tabNum >= 1 && tabNum <= $("#gdTabs ul li").length) {
				utils.selectTab(tabNum);
				utils.currentTab = tabNum;
			}
		}

		$("#gdSelectLanguage").bind("change", utils.changeLanguage);

		// for the Settings tab
		$("#consoleEventsDataTypePlugins").chosen({ no_results_text: "No Data Types found" });
		$("#consoleEventsExportTypePlugins").chosen({ no_results_text: "No Export Types found" });
	});
});