import * as React from 'react';
import { DTHelpProps } from '../../../../types/dataTypes';

export type PostalZipState = {

};

export const Options = (): JSX.Element => {
	// $countryPlugins = Core::$countryPlugins;
	// $html = "";
	// foreach ($countryPlugins as $pluginInfo) {
	// 	$slug       = $pluginInfo->getSlug();
	// 	$regionName = $pluginInfo->getRegionNames();
	//
	// 	$html .= <<<EOF
	// 	<div class="dtCountry dtCountry_$slug">
	// 		<input type="checkbox" name="dtCountryIncludeZip_{$slug}_%ROW%"
	// 		       id="dtCountryIncludeZip_{$slug}_%ROW%" checked="checked" data-country="{$slug}" /><label for="dtCountryIncludeZip_{$slug}_%ROW%">$regionName</label>
	// 	</div>
	// 	EOF;
	// }
	// $html .= '<div id="dtCountry_Complete%ROW%"></div>';
	//
	// return $html;
	return <div />;
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.help_text}</p>;


// var _saveRow = function(rowNum) {
// 	var shownClassesSelectors = [];
// 	for (var i=0; i<_currSelectedCountries.length; i++) {
// 		shownClassesSelectors.push(".dtCountry_" + _currSelectedCountries[i] + " input");
// 	}
// 	var shownClassesSelector = shownClassesSelectors.join(",");
//
// 	// find the checkboxes in this row
// 	var visible = $("#gdColOptions_" + rowNum).find(shownClassesSelector);
// 	var checked = [];
// 	for (var j=0; j<visible.length; j++) {
// 		if (visible[j].checked) {
// 			checked.push($(visible[j]).data("country"));
// 		}
// 	}
//
// 	return {
// 		"checked": checked
// 	};
// };

// var _loadRow = function(rowNum, data) {
// 	return {
// 		execute: function() { },
// 		isComplete: function() {
// 			if ($("#dtCountry_Complete" + rowNum).length) {
// 				$("#gdColOptions_" + rowNum + " input").removeAttr("checked");
//
// 				if (data) {
// 					for (var i=0; i<data.checked.length; i++) {
// 						$("#dtCountryIncludeZip_" + data.checked[i] + "_" + rowNum).attr("checked", "checked");
// 					}
// 				}
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}
// 	};
// };

// N.B this also fires on page load, ensuring that _currSelectedCountries is initialized
// var _countryChange = function(msg) {
// 	_currSelectedCountries = msg.countries;
// 	var shownClassesSelectors = [];
// 	for (var i=0; i<msg.countries.length; i++) {
// 		shownClassesSelectors.push(".dtCountry_" + msg.countries[i]);
// 	}
// 	var shownClassesSelector = shownClassesSelectors.join(",");
// 	$(".dtCountry").hide();
// 	$(shownClassesSelector).show();
// };
