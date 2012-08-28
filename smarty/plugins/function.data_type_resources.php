<?php

/**
 * Used to output any HTML/markup resources needed by the Data Types. This is typically
 * the markup used to be inserted into the Examples, Options and Help columns.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_data_type_resources($params, &$smarty) {

	$resources = DataTypePluginHelper::getDataTypeResources();

}
