<?php

/**
 *
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_export_types($params, &$smarty)
{
	$translations        = Core::$translations->getList();
	$currentLanguageFile = Core::$language->getCurrentLanguageFile();
	$L                   = Core::$language->getCurrentLanguageStrings();

/*
              <input type="radio" name="resultType" value="HTML" id="HTML" checked="checked" /> <label for="HTML">HTML</label>&nbsp;
              <input type="radio" name="resultType" value="Excel" id="Excel" /> <label for="Excel">Excel</label>&nbsp;
              <input type="radio" name="resultType" value="XML" id="XML" /> <label for="XML">XML</label>&nbsp;
              <input type="radio" name="resultType" value="CSV" id="CSV" /> <label for="CSV">CSV</label>&nbsp;
              <input type="radio" name="resultType" value="SQL" id="SQL" /> <label for="SQL">SQL</label>
*/

}