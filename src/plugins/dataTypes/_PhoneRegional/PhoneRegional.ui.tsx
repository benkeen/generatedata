import * as React from 'react';
import { DTHelpProps } from '../../../../types/dataTypes';

export const Options = () => {
	// $countryPlugins = Core::$countryPlugins;
	//
	// $html = "";
	// foreach ($countryPlugins as $pluginInfo) {
	// 	$slug       = $pluginInfo->getSlug();
	// 	$regionName = $pluginInfo->getRegionNames();
	// 	$extendedData = $pluginInfo->getExtendedData();
	//
	// 	if (!isset($extendedData["phoneFormat"]) || !isset($extendedData["phoneFormat"]["displayFormats"])) {
	// 		continue;
	// 	}
	//
	// 	$options = $this->getDisplayFormatOptions($slug, $extendedData["phoneFormat"]["displayFormats"]);
	// 	$html .= <<<EOF
	// 	<div class="dtPhoneRegionalCountry dtPhoneRegionalCountry_$slug">
	// 		<label for="dtPhoneRegional_{$slug}_%ROW%">$regionName</label>
	// 		$options
	// 	</div>
	// 	EOF;
	// }
	// $html .= '<div id="dtPhoneRegional_Complete%ROW%"></div>';
	//
	// return $html;
	return '';
};

export const Help = ({ i18n }: DTHelpProps) => <p>{i18n.DATA_TYPE.DESC}</p>;


// var _saveRow = function(rowNum) {
// 	var data = {};
// 	for (var i=0; i<_currSelectedCountries.length; i++) {
// 		var el = $("#dtPhoneRegional_" + _currSelectedCountries[i] + "_" + rowNum);
// 		if (el.length) {
// 			data[_currSelectedCountries[i]] = el.val();
// 		}
// 	}
//
// 	// find the checkboxes in this row
// 	return data;
// };

// var _loadRow = function(rowNum, data) {
// 	return {
// 		execute: function() {
// 			for (var countrySlug in data) {
// 				$("#dtPhoneRegional_" + countrySlug + "_" + rowNum).val(data[countrySlug]);
// 			}
// 		},
// 		isComplete: function() { return true; }
// 	}
// };

/**
 * This is called any time the country list changes - including on load. It ensures only the appropriate
 * regions are displayed.
 */
// var _countryChange = function(msg) {
// 	_currSelectedCountries = msg.countries;
// 	var shownClassesSelectors = [];
// 	for (var i=0; i<msg.countries.length; i++) {
// 		shownClassesSelectors.push(".dtPhoneRegionalCountry_" + msg.countries[i]);
// 	}
// 	var shownClassesSelector = shownClassesSelectors.join(",");
// 	$(".dtPhoneRegionalCountry").hide();
// 	$(shownClassesSelector).show();
// };

