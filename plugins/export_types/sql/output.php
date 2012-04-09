<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <style type="text/css">
  body { margin: 10px; }
  body, table, th, td { font-family: arial; font-size: 8pt; }
  </style>
</head>
<body>

<?php
$database_type      = $_POST["sql_database"];
$backquote          = isset($_POST["enclose_with_backquotes"]) ? "`" : "";
$sql_statement_type = isset($_POST["sql_statement_type"]) ? $_POST["sql_statement_type"] : "insert";
$sql_primary_key    = (isset($_POST["sql_primary_key"])) ? $_POST["sql_primary_key"] : "default";

// get the column names
$column_names_arr = array();
foreach ($g_template as $data_types)
{
  foreach ($data_types as $data_type)
    $column_names_arr[] = "{$backquote}{$data_type["title"]}{$backquote}";
}

$col_names = implode(",", $column_names_arr);
$table_name = $_POST['sql_table_name'];

// ------------------------------------------------------------------------------------------------

// if required, output the DROP TABLE query
if (isset($_POST["sql_drop_table"]))
{
	echo "DROP TABLE {$backquote}$table_name{$backquote};\n";
  echo "<br /><br /><hr size='1' /><br />";
}


// if required, output the CREATE TABLE query
if (isset($_POST["sql_create_table"]))
{
  switch ($database_type)
  {
    case "MySQL":
      echo "CREATE TABLE {$backquote}$table_name{$backquote} (<br />\n";
      if ($sql_primary_key == "default")
	      echo "&nbsp;&nbsp;{$backquote}id{$backquote} mediumint(8) unsigned NOT NULL auto_increment,<br />\n";

      reset($g_template);
      $rows = array();
      //ksort($g_template, SORT_NUMERIC);
			while (list($order, $data_types) = each($g_template))
			{
			  foreach ($data_types as $data_type)
			  {
	        $data_type_folder = $data_type["data_type_folder"];
	        $order            = $data_type["column_num"];
          $get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
		      $export_type_info = $get_export_type_info_func('sql', 'MySQL');
		      $rows["$order"] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			  }
			}
			reset($g_template);
			ksort($rows, SORT_NUMERIC);
			echo implode(",<br />\n", $rows);

      if ($sql_primary_key == "default")
	      echo ",<br />\n&nbsp;&nbsp;PRIMARY KEY ({$backquote}id{$backquote})<br />\n) TYPE=MyISAM AUTO_INCREMENT=1;";
      else if ($sql_primary_key == "none")
        echo "<br />) TYPE=MyISAM;";
      break;

    case "Oracle":
      echo "CREATE TABLE {$backquote}$table_name{$backquote} (<br />\n";
      if ($sql_primary_key == "default")
	      echo "&nbsp;&nbsp;{$backquote}id{$backquote} number primary key,<br />\n";

      reset($g_template);
      $rows = array();
			while (list($order, $data_types) = each($g_template))
			{
			  foreach ($data_types as $data_type)
			  {
	        $data_type_folder = $data_type["data_type_folder"];
	        $order            = $data_type["column_num"];
          $get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
		      $export_type_info = $get_export_type_info_func('sql', 'Oracle');
		      $rows[] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			  }
			}
			reset($g_template);
			ksort($rows, SORT_NUMERIC);
			echo implode(",<br />\n", $rows);

			echo "\n<br />);";
      break;

    case "SQLite":
      echo "CREATE TABLE {$backquote}$table_name{$backquote} (<br />\n";
      if ($sql_primary_key == "default")
	      echo "&nbsp;&nbsp;{$backquote}id{$backquote} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,<br />\n";

      reset($g_template);
      $rows = array();
			while (list($order, $data_types) = each($g_template))
			{
			  foreach ($data_types as $data_type)
			  {
	        $data_type_folder = $data_type["data_type_folder"];
	        $order            = $data_type["column_num"];
          $get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
		      $export_type_info = $get_export_type_info_func('sql', 'SQLite');
		      $rows["$order"] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			  }
			}
			reset($g_template);
			ksort($rows, SORT_NUMERIC);
			echo implode(",<br />\n", $rows);

      echo "<br />);\n";
    	break;
  }

  echo "<br /><br /><hr size='1' /><br />";
}

ksort($g_template, SORT_NUMERIC);
for ($row=1; $row<=$g_numResults; $row++)
{
  $row_data = array();
  reset($g_template);
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

  $elements = array();
  foreach ($row_data as $data)
    $elements[] = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];

  array_walk($elements, "enquote");
  $elements_str = implode(",", $elements);

  if ($sql_statement_type == "insert")
    echo "INSERT INTO {$backquote}$table_name{$backquote} ($col_names) VALUES ($elements_str);<br />\n";
  else
  {
    $i = 0;
    $pairs = array();
    reset($row_data);
    while (list($key, $info) = each($row_data))
    {
      $col_name = $info["title"];
    	$value    = $elements[$i];
    	$pairs[]  = "{$backquote}$col_name{$backquote} = $value";
    	$i++;
    }

    $pairs_str = implode(", ", $pairs);
  	echo "UPDATE {$backquote}$table_name{$backquote} SET $pairs_str WHERE {$backquote}id{$backquote} = $row;<br />\n";
  }
}

// helper function to wrap each element of an array with ' chars.
function enquote(&$item1, $key)
{
   $item1 = "'$item1'";
}

?>

</body>
</html>