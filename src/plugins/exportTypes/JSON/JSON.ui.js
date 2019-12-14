import React from 'react';

export const Settings = ({ i18n, id }) => (
	<>
		<input type="checkbox" name="etJSON_stripWhitespace" id="etJSON_stripWhitespace" value="1" />
			<label for="etJSON_stripWhitespace">{i18n.strip_whitespace}</label><br />
			{i18n.data_structure_format}
		<input type="radio" name="etJSON_dataStructureFormat" value="complex" id="stJSON_dataStructureFormat1" checked="checked" />
			<label for="stJSON_dataStructureFormat1">{i18n.complex}</label>
		<input type="radio" name="etJSON_dataStructureFormat" value="simple" id="stJSON_dataStructureFormat2" />
			<label for="stJSON_dataStructureFormat2">{i18n.simple}</label>
	</>
);


/**
 * If the user is generating in-page data with this Export Type, enable the javascript
 * mode for the in-page editor.
 */
var _onGenerate = function(msg) {
	if (msg.exportTarget !== "inPage" || msg.exportType !== "JSON") {
		return;
	}
	msg.editor.setOption("mode", "javascript");

	var wrapLines = ($("#etJSON_stripWhitespace")[0].checked);
	msg.editor.setOption("lineWrapping", wrapLines);
};

var _init = function() {
	var subscriptions = {};
	subscriptions[C.EVENT.GENERATE] = _onGenerate;
	manager.subscribe(MODULE_ID, subscriptions);
};

var _loadSettings = function(settings) {
	if (settings.stripWhitespace === "1") {
		$("#etJSON_stripWhitespace").attr("checked", "checked");
	} else {
		$("#etJSON_stripWhitespace").removeAttr("checked");
	}

	// for backward compatibility with early alpha versions
	if (settings.hasOwnProperty("dataStructureFormat")) {
		$("input[name=etJSON_dataStructure][value=" + settings.dataStructureFormat + "]").attr("checked", "checked");
	}
};

var _saveSettings = function() {
	return {
		stripWhitespace: ($("#etJSON_stripWhitespace")[0].checked) ? 1 : 0,
		dataStructureFormat: $("#etJSON_dataStructureFormat").val()
	};
};

var _resetSettings = function() {
	$("#etJSON_stripWhitespace").removeAttr("checked");
};
