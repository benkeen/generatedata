<?php

/**
 * Displays the interface language dropdown. The onchange event is attached in general.js, but is only triggered if the
 * $name_id is set to "selectLanguage".
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_language_dropdown($params, &$smarty) {

	// default to whatever is explicitly supplied. Failing that, default to the global var
	$defaultLanguage = isset($params["default"]) ? $params["default"] : Core::$language->getCurrentLanguageFile();

	$nameId = isset($params["nameId"]) ? $params["nameId"] : "";
	$disabled = (isset($params["disabled"]) && $params["disabled"] == true) ? true : false;

	$translations        = Core::$translations->getList();
	$currentLanguageFile = Core::$language->getCurrentLanguageFile();
	$L                   = Core::$language->getCurrentLanguageStrings();  

	$options = "";
	while (list($file, $language) = each($translations)) {
		$value = preg_replace("/\.php$/", "", $file);
		$selected = ($value == $currentLanguageFile) ? " selected=\"selected\"" : "";
		$options .= "<option value=\"{$value}\"{$selected}>{$language}</option>\n";
	}

	$disabledAttr = ($disabled) ? ' disabled="disabled"' : "";

	echo <<< END
	<select name="$nameId" id="$nameId"$disabledAttr>
		<option value="">{$L["select_language"]}</option>
		{$options}
	</select>
END;
}
