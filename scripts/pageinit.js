/**
 * This module runs on all page loads, initializing a few things needed for all pages:
 * namely the tab functionality and the language dropdown change event.
 */
require([
 	"utils",
	"jquery-ui",
	"jquery-json"
], function(utils) {

	$(function() {
		$(".gdNoJS").hide();
		$(".hideNoJs").show();
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
	});
});