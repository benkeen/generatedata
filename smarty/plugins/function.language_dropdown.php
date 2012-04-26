<?php

/**
 * Displays the interface language dropdown. The onchange event is attached in general.js, but is only triggered if the
 * $name_id is set to "selectLanguage".
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_language_dropdown($params, &$smarty)
{
  $language = Core::getLanguage();

  // default to whatever is explicitly supplied. Failing that, default to the global var
	$defaultLanguage = isset($params["default"]) ? $params["default"] : $language->getCurrentLanguageFile();
	$nameId = isset($params["nameId"]) ? $params["nameId"] : "";

	$translations        = Core::$translations->getList();
	$currentLanguageFile = $language->getCurrentLanguageFile();
	$L                   = $language->getCurrentLanguageStrings();

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