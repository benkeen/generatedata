<?php

function smarty_function_export_types_dropdown($params, &$smarty) {
	$L = Core::$language->getCurrentLanguageStrings();
	$exportTypeGroups = Core::$exportTypePlugins;

//	print_r($exportTypeGroups);
//	exit;
	return;

	// TODO clean up these

	$name = isset($params["name"]) ? $params["name"] : "gdDataType_%ROW%";
	$id = isset($params["id"]) ? $params["id"] : "gdDataType_%ROW%";
	$multiple = (isset($params["multiple"]) && $params["multiple"]) ? "multiple" : "";
	$extras = (isset($params["extras"])) ? $params["extras"] : "";
	$style = (isset($params["style"])) ? $params["style"] : "";
	$includeDefaultOption = (isset($params["includeDefaultOption"])) ? $params["includeDefaultOption"] : true;

	$options = "";
	if ($includeDefaultOption) {
		$options .= "<option value=\"\">{$L["please_select"]}</option>";
	}

	while (list($group, $dataTypes) = each($dataTypeGroups)) {
		$groupName = $L[$group];
		$options .= "<optgroup label=\"$groupName\">\n";

		foreach ($dataTypes as $dataType) {
			$name = $dataType->getName();
			$options .= "<option value=\"{$dataType->folder}\">$name</option>\n";
		}
		$options .= "</optgroup>";
	}

	echo <<< END
	<select class="gdDataType" name="$name" id="$id" style="$style" $multiple $extras>
		$options
	</select>
END;
}
