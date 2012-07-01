<?php

/**
 * Generates the list of available Export Types.
 *
 * @param array $params
 * @param object $smarty
 */
function smarty_function_export_types($params, &$smarty) {
	$defaultExportType = Core::getDefaultExportType();
	$exportTypes       = Core::$exportTypePlugins;

	for ($i=0; $i<count($exportTypes); $i++) {
		$exportType = $exportTypes[$i];
		$name = $exportType->getName();
		$class = get_class($exportType);

		$checked = ($defaultExportType == $class) ? 'checked="checked"' : "";

		echo <<< END
		<input type="radio" name="gdExportType" class="gdExportType" id="gdExportType{$i}" value="$class" $checked />
			<label for="gdExportType{$i}">$name</label>
END;
	}
}
