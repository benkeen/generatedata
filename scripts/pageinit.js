/**
 * This module runs on all page loads, initializing various common
 */
require([
 	"utils",
	"libs/jquery-1.7.2.min"
], function(utils) {

	/**
	 * Some general functions, used on all Data Generator pages (i.e. the installation page + main generator page).
	 */
	$(function() {
		$(".gdNoJS").hide();
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