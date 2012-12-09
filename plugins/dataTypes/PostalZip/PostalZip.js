/*global $:false*/
define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	"use strict";

	var MODULE_ID = "data-type-PostalZip";
	var LANG = L.dataTypePlugins.PostalZip;
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.COUNTRIES.CHANGE] = _countryChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _saveRow = function() {

	};

	var _loadRow = function() {
		return [
			function() { },
			function() { return true; }
		];
	};

	var _countryChange = function(msg) {
		var shownClassesSelectors = [];
		for (var i=0; i<msg.countries.length; i++) {
			shownClassesSelectors.push(".dtCountry_" + msg.countries[i]);
		}
		var shownClassesSelector = shownClassesSelectors.join(",");
		$(".dtCountry").hide();
		$(shownClassesSelector).show();
	};

	var _validate = function() {

	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
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