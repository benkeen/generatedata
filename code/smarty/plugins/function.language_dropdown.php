<?php

/**
 * Displays the interface language dropdown. The onchange event is attached in general.js.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_language_dropdown($params, &$smarty)
{
	global $L;

	$translations = gd_get_translations();

	$options = "";
  while (list($file, $language) = each($translations))
  {
    $value = preg_replace("/\.php$/", "", $file);
    $selected = ($value == $g_language) ? " selected" : "";
    $options .= "<option value=\"{$value}\"{$selected}>{$language}</option>\n";
  }

  echo <<<END
    <select id="selectLanguage">
      <option value="">{$L["select_language"]}</option>
      {$options}
    </select>
END;
}