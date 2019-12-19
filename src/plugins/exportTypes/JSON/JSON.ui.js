import React from 'react';

export const state = {
	stripWhitespace: false,
	dataStructureFormat: 'simple'
};

export const Settings = ({ i18n, id }) => (
	<>
		<input type="checkbox" id={`${id}-etJSON_stripWhitespace`} value="1" />
			<label htmlFor={`${id}-etJSON_stripWhitespace`}>{i18n.strip_whitespace}</label><br />
			{i18n.data_structure_format}
		<input type="radio" value="complex" id="stJSON_dataStructureFormat1" checked="checked" />
			<label for="stJSON_dataStructureFormat1">{i18n.complex}</label>
		<input type="radio" value="simple" id="stJSON_dataStructureFormat2" />
			<label for="stJSON_dataStructureFormat2">{i18n.simple}</label>
	</>
);


/**
 * If the user is generating in-page data with this Export Type, enable the javascript
 * mode for the in-page editor.
 */
// var _onGenerate = function(msg) {
// 	if (msg.exportTarget !== "inPage" || msg.exportType !== "JSON") {
// 		return;
// 	}
// 	msg.editor.setOption("mode", "javascript");
//
// 	var wrapLines = ($("#etJSON_stripWhitespace")[0].checked);
// 	msg.editor.setOption("lineWrapping", wrapLines);
// };

// var _loadSettings = function(settings) {
// 	if (settings.stripWhitespace === "1") {
// 		$("#etJSON_stripWhitespace").attr("checked", "checked");
// 	} else {
// 		$("#etJSON_stripWhitespace").removeAttr("checked");
// 	}
//
// 	// for backward compatibility with early alpha versions
// 	if (settings.hasOwnProperty("dataStructureFormat")) {
// 		$("input[name=etJSON_dataStructure][value=" + settings.dataStructureFormat + "]").attr("checked", "checked");
// 	}
// };

// var _resetSettings = function() {
// 	$("#etJSON_stripWhitespace").removeAttr("checked");
// };
