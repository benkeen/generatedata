/**
 * This module runs on page load for all pages, initializing a few things:
 * the tab functionality and the language dropdown change event.
 */
require([
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

		$("#settingsForm").bind("submit", function(e) {
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
						$("#settingsTabMessage").effect("highlight", { color: "#a4c2ff" }, 1500);
					}
				},
				error: function(json) {
					utils.stopProcessing();
					if (json.success == 1) {
						$("#settingsTabMessage p").html(json.message);
						$("#settingsTabMessage").effect("highlight", { color: "#ff5b5b" }, 1500);
					}
				},
			});
		});

	});
});