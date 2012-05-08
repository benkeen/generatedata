<?php

function smarty_function_data_types_dropdown($params, &$smarty) {
  $L = Core::$language->getCurrentLanguageStrings();
  $dataTypeGroups = Core::$dataTypes;

  $options = "";
  while (list($group, $dataTypes) = each($dataTypeGroups)) {
    $groupName = $L[$group];
    $options .= "<optgroup label=\"$groupName\">\n";

    foreach ($dataTypes as $dataType) {
      $name = $dataType->getName();
      $options .= "<option value=\"\">$name</option>\n";
    }
    $options .= "</optgroup>";
  }

  // name="type_$ROW$" id="type_$ROW$" onchange="gd.changeRowType(this.name, this.value)"

  echo <<< END
  <select>
    <option value="">{$L["please_select"]}</option>
    $options
  </select>
END;
}
