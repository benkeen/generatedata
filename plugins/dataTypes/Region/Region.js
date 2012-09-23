define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	var MODULE_ID = "data-type-Region";
	var LANG = L.dataTypePlugins.Region;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
		$("#gdTableRows").on("click", ".dtRegionCountry", _toggleCountryRegion);
	}

	/**
	 * This is called any time the country list changes - including on load. It ensures only the appropriate
	 * regions are displayed.
	 */
	var _countryChange = function(msg) {
		var shownClassesSelectors = [];
		for (var i=0; i<msg.countries.length; i++) {
			shownClassesSelectors.push(".dtRegionCountry_" + msg.countries[i]);
		}
		shownClassesSelector = shownClassesSelectors.join(",");

		$(".dtRegionCountry").hide();
		$(shownClassesSelector).show();
	}

	var _validate = function() {

	}

	var _toggleCountryRegion = function(e) {
		var el = e.target;

		var parent = $(el).parent();
		if (el.checked) {
			parent.find("span input").removeAttr("disabled");
			parent.find("span label").addClass("dtRegionSuboptionActive").removeClass("dtRegionSuboptionInactive");
		} else {
			$(el).parent().find("span input").attr("disabled", "disabled");
			parent.find("span label").addClass("dtRegionSuboptionInactive").removeClass("dtRegionSuboptionActive");
		}
	}


	/*
var StateProvince_ns = {
	loadRow: function(rowNum, data)
	{
		var cleanData = [];
		$(data.checked).each(function() {
			cleanData.push(this.replace(/\d/g, ""));
		});

		return [
			function() {
				$("#options_" + rowNum + " input:checkbox").each(function() {
					var nameWithoutNum = this.name.replace(/\d/g, "");
					var isChecked = $.inArray(nameWithoutNum, cleanData) != -1;
					$(this).attr("checked", isChecked);

					// very kludgy
					if (!isChecked && $(this).hasClass("main"))
					{
						var match = $(this).attr("id").match(/includeRegion_(.+)_\d+/);
						var currCountry = match[1];
						StateProvince_ns.hideShowStateProvCounty(rowNum, false, currCountry);
					}
				});
			},
			<?php
			// find out how many checkboxes are in the generated markup: three for each country. Then,
			// use that info to let the calling script know when the markup is fully generated.
			$num_countries = count(gd_get_configurable_countries());
			?>
			function() { return ($("#options_" + rowNum + " input:checkbox").size() == (3 * <?=$num_countries ?>)); }
		];
	},

	saveRow: function(rowNum)
	{
		var checked = [];
		$("#options_" + rowNum + " input:checked").each(function() {
			// strip out any row numbers from the name attributes. We're not interested in them. When
			// it comes to reloading the content, they'll be in the way
			checked.push(this.name.replace(/\d/g, ""));
		});

		return { "checked": checked };
	}
}*/

	// register our module
	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});
