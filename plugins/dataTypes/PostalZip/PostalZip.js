define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

/*
	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}
	var _countryChange = function(msg) {
		var shownClassesSelectors = [];
		for (var i=0; i<msg.countries.length; i++) {
			shownClassesSelectors.push(".dtRegionCountry_" + msg.countries[i]);
		}
		shownClassesSelector = shownClassesSelectors.join(",");

		$(".dtRegionSection").hide();
		$(shownClassesSelector).show();
	}


	// register our module
	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init
	});
*/

});

/*
var PostalZip_ns = {
  loadRow: function(rowNum, data)
  {
    var cleanData = [];
    $(data.zips).each(function() {
      cleanData.push(this.replace(/\d/g, ""));
    });

    return [
      function() {
        $("#options_" + rowNum + " input:checkbox").each(function() {
          var nameWithoutNum = this.name.replace(/\d/g, "");
          $(this).attr("checked", $.inArray(nameWithoutNum, cleanData) != -1);
        });
      },

			<?php
			// find out how many checkboxes are in the generated markup: one for each country. Then,
			// use that info to let the calling script know when the markup is fully generated.
			$num_countries = count(gd_get_configurable_countries());
			?>
      function() { return ($("#options_" + rowNum + " input:checkbox").size() == <?=$num_countries ?>); }
    ];
  },

  saveRow: function(rowNum)
  {
    var zips = [];
    $("#options_" + rowNum + " input:checked").each(function() {
      // strip out any row numbers from the name attributes. We're not interested in them. When
      // it comes to reloading the content, they'll be in the way
      zips.push(this.name.replace(/\d/g, ""));
    });

    return { "zips": zips };
  }
}
*/