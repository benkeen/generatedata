<?php

/**
 * Displays the interface language dropdown. The onchange event is attached in general.js.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_language_dropdown($params, &$smarty)
{
	// default to whatever is explicitly supplied. Failing that, default to the global var
	$defaultLanguage = isset($params["default"]) ? $params["default"] : Core::getCurrentLanguageFile();
	$nameId = isset($params["nameId"]) ? $params["nameId"] : "";

	$translations        = Core::getAvailableTranslations();
	$currentLanguageFile = Core::getCurrentLanguageFile();
	$L                   = Core::getCurrentLanguageStrings();

	$options = "";
	while (list($file, $language) = each($translations))
  {
    $value = preg_replace("/\.php$/", "", $file);
    $selected = ($value == $currentLanguageFile) ? " selected" : "";
    $options .= "<option value=\"{$value}\"{$selected}>{$language}</option>\n";
  }

  echo <<<END
    <select name="$nameId" id="$nameId">
      <option value="">{$L["select_language"]}</option>
      {$options}
    </select>
END;
}