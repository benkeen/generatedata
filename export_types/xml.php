<?php

$root_node_name    = $_POST["xml_root_node_name"];
$record_node_name  = $_POST["xml_record_node_name"];
$use_custom_format = isset($_POST["xml_use_custom_format"]) ? true : false;
$xml_custom_format = isset($_POST["xml_custom_format"]) ? gd_sanitize($_POST["xml_custom_format"]) : "";


if ($use_custom_format)
{
  echo gd_generate_custom_xml($xml_custom_format, $g_template, $g_numResults);
}
else
{
  echo "<$root_node_name>";

  ksort($g_template, SORT_NUMERIC);
  for ($row=1; $row<=$g_numResults; $row++)
  {
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
    ksort($row_data);

    echo "\t<$record_node_name>\n";
    foreach ($row_data as $data)
    {
      $nodename = $data["title"];
      $val      = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];
      echo "\t\t<$nodename>$val</$nodename>";
    }
    echo "\t</$record_node_name>\n";
  }

  echo "</$root_node_name>";
}
