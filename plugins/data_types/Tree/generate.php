<?php

// this lets the processor know that this data type relies on data defined in other fields. That
// information is either hardcoded in the functions below, or passed via an option
$Tree_process_order = 2;
$Tree_open_nodes = array();


function Tree_get_template_options($postdata, $col, $num_cols)
{
  if (empty($postdata["tree_ai_row_num_$col"]) || empty($postdata["tree_max_siblings_$col"]))
	  return false;

  // note that we don't bother confirming that the AutoIncrement row specified actually exists. The
  // reason being perhaps the user wants to use another field (like an alpha-numeric one)

  $options = array(
    "ai_row_num"   => $postdata["tree_ai_row_num_$col"],
    "max_siblings" => $postdata["tree_max_siblings_$col"]
  );

  return $options;
}


function Tree_generate_item($row, $options, $existing_row_data)
{
  global $Tree_open_nodes, $LANG;

  $ai_row_num = $options["ai_row_num"];

  if (!isset($existing_row_data["order{$ai_row_num}"]["random_data"]))
    return $LANG["Tree_invalid_parent"];

  $parent_row_id = $existing_row_data["order{$ai_row_num}"]["random_data"];

  if ($row == 1)
  {
    $Tree_open_nodes[] = array($parent_row_id, 1);
	  return "0";
  }

  // randomly pick an open (non-full) node
  $rand_index = rand(0, count($Tree_open_nodes)-1);
  $rand_row   = $Tree_open_nodes[$rand_index];
  $parent_row = $rand_row[0];

  // increment this node. If it's full, remove it from the array
  $Tree_open_nodes[$rand_index][1]++;
  if ($Tree_open_nodes[$rand_index][1] > $options["max_siblings"])
    array_splice($Tree_open_nodes, $rand_index, 1);

  // finally, add the new index
  $Tree_open_nodes[] = array($parent_row_id, 1);

  return $parent_row;
}


function Tree_get_export_type_info($export_type, $options)
{
  $info = "";
  switch ($export_type)
  {
  	case "sql":
  		if ($options == "MySQL" || $options == "SQLite")
        $info = "mediumint default NULL";
      else
        $info = "number";
  	  break;
  }

  return $info;
}