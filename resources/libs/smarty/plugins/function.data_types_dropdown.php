<?php

/**
 * Used in the Settings tab to output a list of available dropdowns. This is enhanced client-side with
 * the Chosen plugin.
 */
function smarty_function_data_types_dropdown($params, &$smarty) {
	$L = Core::$language->getCurrentLanguageStrings();
	$dataTypeGroups = Core::$dataTypePlugins;

	// TODO clean up these

	$name = isset($params["name"]) ? $params["name"] : "gdDataType_%ROW%";
	$id = isset($params["id"]) ? $params["id"] : "gdDataType_%ROW%";
	$multiple = (isset($params["multiple"]) && $params["multiple"]) ? "multiple" : "";
	$extras = (isset($params["extras"])) ? $params["extras"] : "";
	$style = (isset($params["style"])) ? $params["style"] : "";
	$includeDefaultOption = (isset($params["includeDefaultOption"])) ? $params["includeDefaultOption"] : true;
	$selected = isset($params["selected"]) ? explode(",", $params["selected"]) : array();

	$options = "";
	if ($includeDefaultOption) {
		$options .= "<option value=\"\">{$L["select_data_type"]}</option>";
	}

	while (list($group, $dataTypes) = each($dataTypeGroups)) {
		$groupName = $L[$group];
		$options .= "<optgroup label=\"$groupName\">\n";

		foreach ($dataTypes as $dataType) {
			$currName = $dataType->getName();
			$value = "data-type-{$dataType->folder}";
			$selectedAttr = (in_array($value, $selected)) ? " selected=\"selected\"" : "";
			$options .= "<option value=\"$value\"$selectedAttr>$currName</option>\n";
		}
		$options .= "</optgroup>";
	}

	echo <<< END
	<select class="gdDataType" name="$name" id="$id" style="$style" $multiple $extras>
		$options
	</select>
END;
}
