import * as React from 'react';
import { DTHelpProps } from '../../../../types/dataTypes';

export const Options = (): JSX.Element => {
	// $countryPlugins = Core::$countryPlugins;
	//
	// $html = "<div class=\"dtRegionCountry_noCountries\">{$this->L["no_countries_selected"]}</div>";
	// foreach ($countryPlugins as $pluginInfo) {
	// 	$slug       = $pluginInfo->getSlug();
	// 	$regionName = $pluginInfo->getRegionNames();
	//
	// 	$html .= <<<EOF
	// 	<div class="dtRegionCountry dtRegionCountry_$slug">
	// 		<input type="checkbox" name="dtIncludeRegion_{$slug}_%ROW%" id="dtIncludeRegion_{$slug}_%ROW%" class="dtIncludeRegion dtIncludeRegion_{$slug}"
	// 		       checked="checked" /><label for="dtIncludeRegion_{$slug}_%ROW%">$regionName</label>
	// 		<span class="dtRegionFull">
	// 	<input type="checkbox" name="dtIncludeRegion_{$slug}_Full_%ROW%" id="dtIncludeRegion_{$slug}_Full_%ROW%"
	// 	       checked="checked" /><label for="dtIncludeRegion_{$slug}_Full_%ROW%"
	// 	                                  id="dtIncludeRegion_{$slug}_FullLabel_%ROW%" class="dtRegionSuboptionActive">{$this->L["full"]}</label>
	// </span>
	// 		<span class="dtRegionShort">
	// 	<input type="checkbox" name="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_Short_%ROW%" checked="checked"
	// 	/><label for="dtIncludeRegion_{$slug}_Short_%ROW%" id="dtIncludeRegion_{$slug}_ShortLabel_%ROW%"
	// 	         class="dtRegionSuboptionActive">{$this->L["short"]}</label>
	// </span>
	// 	</div>
	// 	EOF;
	// }
	// $html .= '<div id="dtRegionCountry_Complete%ROW%"></div>';
	return <div />;
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC} {i18n.help_text}</p>;


// var _saveRow = function(rowNum) {
// 	var checked = [];
// 	for (var i=0; i<_currSelectedCountries.length; i++) {
// 		checked.push({
// 			country: _currSelectedCountries[i],
// 			regionSelected: ($("#dtIncludeRegion_" + _currSelectedCountries[i] + "_" + rowNum).attr("checked") === "checked") ? 1 : 0,
// 			regionFull: ($("#dtIncludeRegion_" + _currSelectedCountries[i] + "_Full_" + rowNum).attr("checked") === "checked") ? 1 : 0,
// 			regionShort: ($("#dtIncludeRegion_" + _currSelectedCountries[i] + "_Short_" + rowNum).attr("checked") === "checked") ? 1 : 0
// 		});
// 	}
//
// 	// find the checkboxes in this row
// 	return {
// 		"checked": checked
// 	};
// };

// var _loadRow = function(rowNum, data) {
//
// 	// a real mystery here. On Chrome (and maybe other browsers) if _saveRow returns an empty array for "checkedRows",
// 	// the object key-value pair is completely dropped. Hence the check here
// 	var rows = [];
// 	if (typeof data !== 'undefined') {
// 		rows = data.checked;
// 	}
// 	return {
// 		execute: function() { },
// 		isComplete: function() {
// 			if ($("#dtRegionCountry_Complete" + rowNum).length) {
// 				for (var i=0; i<rows.length; i++) {
// 					var currCountry = rows[i].country;
// 					if (rows[i].regionSelected === "0") {
// 						$("#dtIncludeRegion_" + currCountry + "_" + rowNum).removeAttr("checked").trigger("click");
// 					}
// 					if (rows[i].regionFull === "0") {
// 						$("#dtIncludeRegion_" + currCountry + "_Full_" + rowNum).removeAttr("checked");
// 					}
// 					if (rows[i].regionShort === "0") {
// 						$("#dtIncludeRegion_" + currCountry + "_Short_" + rowNum).removeAttr("checked");
// 					}
// 				}
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}
// 	};
// };

// /**
//  * This is called any time the country list changes - including on load. It ensures only the appropriate
//  * regions are displayed.
//  */
// var _countryChange = function(msg) {
// 	_currSelectedCountries = msg.countries;
// 	var shownClassesSelectors = [];
// 	for (var i=0; i<msg.countries.length; i++) {
// 		shownClassesSelectors.push(".dtRegionCountry_" + msg.countries[i] + ",.dtIncludeRegion_" + msg.countries[i]);
// 	}
// 	var shownClassesSelector = shownClassesSelectors.join(",");
// 	$(".dtRegionCountry").hide();
// 	$(shownClassesSelector).show();
//
// 	if (msg.countries.length > 0) {
// 		$(".dtRegionCountry_noCountries").hide();
// 	} else {
// 		$(".dtRegionCountry_noCountries").show();
// 	}
// };
//
// var _toggleCountryRegion = function(e) {
// 	var el = e.target;
// 	var parent = $(el).parent();
// 	if (el.checked) {
// 		parent.find("span input").removeAttr("disabled");
// 		parent.find("span label").addClass("dtRegionSuboptionActive").removeClass("dtRegionSuboptionInactive");
// 	} else {
// 		$(el).parent().find("span input").attr("disabled", "disabled");
// 		parent.find("span label").addClass("dtRegionSuboptionInactive").removeClass("dtRegionSuboptionActive");
// 	}
// };
