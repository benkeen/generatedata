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
		$(".gdNoJS").hide();
		$(".gdHideNoJS").show();
		$("#gdTabs ul li").each(function() {
			var tabNum = parseInt($(this).attr("id").replace(/^gdTab/, ""), 10);
			$(this).bind("click", function(e, a) {
				utils.selectTab(tabNum);
				window.location = window.location.href.split("#")[0] + "#t" + tabNum;
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


		function installResponse(json) {
			utils.stopProcessing();
			if (json.success == 0) {
//				$("#installError .response").html(json.message);
//				$("#installError").effect("highlight", { color: "#ff5b5b" }, 1500);
				return;
			}
		}

		function installError(json) {

		}
	});
});