<?php

/**
 * TODO add setting: "HTML format": table, ul
 */
class HTML extends ExportTypePlugin {
	protected $exportTypeName = "HTML";

	/**
	 * @see ExportTypePlugin::generate()
	 */
	function generate($generator) {
		$columns  = $generator->getTemplateByDisplayOrder();
		$template = $generator->getTemplateByProcessOrder();


		print_r($template);


/*
<table cellpadding="1" cellspacing="1">
<tr>
  foreach ($sorted_cols as $col)
  {
    echo "<th>{$col["title"]}</th>";
  }
</tr>

ksort($g_template, SORT_NUMERIC);
for ($row=1; $row<=$g_numResults; $row++) {

  // TODO. With new design, this chunk of code will be handled PRIOR to the Export Type's generate() method
  $row_data = array();
  while (list($order, $data_types) = each($g_template))
  {
    foreach ($data_types as $data_type)
    {
      $order = $data_type["column_num"];
      $data_type_folder = $data_type["data_type_folder"];
      $data_type_func = "{$data_type_folder}_generate_item";
      $data_type["random_data"] = $data_type_func($row, $data_type["options"], $row_data);
      $row_data["$order"] = $data_type;
    }
  }
  reset($g_template);
  ksort($row_data, SORT_NUMERIC);

  // ---------------------

  echo "<tr>";
  foreach ($row_data as $data)
  {
    $val = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];
    echo "<td>$val</td>";
  }
  echo "</tr>";
}

*/

	}
}
