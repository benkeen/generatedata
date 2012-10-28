<?php

function smarty_function_export_types_dropdown($params, &$smarty) {
	$L = Core::$language->getCurrentLanguageStrings();
	$exportTypeGroups = Core::$exportTypePlugins;

	// TODO clean up these

	$name = isset($params["name"]) ? $params["name"] : "gdDataType_%ROW%";
	$id = isset($params["id"]) ? $params["id"] : "gdDataType_%ROW%";
	$multiple = (isset($params["multiple"]) && $params["multiple"]) ? "multiple" : "";
	$extras = (isset($params["extras"])) ? $params["extras"] : "";
	$style = (isset($params["style"])) ? $params["style"] : "";
	$includeDefaultOption = (isset($params["includeDefaultOption"])) ? $params["includeDefaultOption"] : true;
	$selected = explode(",", $params["selected"]);

	$options = "";
	if ($includeDefaultOption) {
		$options .= "<option value=\"\">{$L["please_select"]}</option>";
	}

	foreach ($exportTypeGroups as $exportTypeGroup) {
		$currName = $exportTypeGroup->getName();
		$value = "export-type-{$exportTypeGroup->folder}";
		$selectedAttr = (in_array($value, $selected)) ? " selected=\"selected\"" : "";
		$options .= "<option value=\"$value\"$selectedAttr>$currName</option>\n";
	}

	echo <<< END
	<select class="gdDataType" name="$name" id="$id" style="$style" $multiple $extras>
		$options
	</select>
END;
}
