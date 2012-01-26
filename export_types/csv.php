<?php

$csv_delimiter    = $_POST['csv_delimiter'];
$csv_delimiter    = ($csv_delimiter == '\t') ? "\t" : $csv_delimiter;
$csv_line_endings = $_POST["csv_line_endings"];

switch ($csv_line_endings)
{
	case "Windows":
		$newline = "\r\n";
		break;
	case "Unix":
		$newline = "\n";
		break;
	case "Mac":
	default:
		$newline = "\r";
		break;
}

$sorted_cols = gd_sort_by_col_order($g_template);
$titles = array();
foreach ($sorted_cols as $col)
{
  $titles[] = $col["title"];
}
echo implode($csv_delimiter, $titles) . $newline;


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

  $values = array();
  foreach ($row_data as $data)
  {
    $values[] = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];
  }

  echo implode($csv_delimiter, $values) . $newline;
}

?>