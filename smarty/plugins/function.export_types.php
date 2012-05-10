<?php

/**
 * Generates the list of available Export Types.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_export_types($params, &$smarty)
{
	$defaultExportType = Core::getDefaultExportType();
  $exportTypes       = Core::$exportTypes;

  foreach ($exportTypes as $exportType) {
  	$name = $exportType->getName();
    $class = get_class($exportType);

    $checked = ($defaultExportType == $class) ? 'checked="checked"' : "";

    echo <<< END
    <input type="radio" name="gdExportType" value="$class" $checked />
      <label for="$class">$name</label>
END;

  }
}