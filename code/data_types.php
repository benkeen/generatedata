<?php


/**
 * This function creates a "template" of the data set to be generated. It's an ordered array of hashes, with
 * the hashes having the following values:
 *
 *     $title            - whatever string is being used for the column title / node name / etc.
 *     $type             - the namespace (folder name) of the data type
 *     $options          - whatever custom options
 *     $has_dependencies - boolean true / false.
 *
 * The first two values are found right in the $_POST values, but the third is determined by the data
 * type itself. It's expected that the data type has a generate.php function with a
 * [NAMESPACE]_get_template_options() function.
 *
 * Once this function has generated the data set template, the individual result type pages (HTML, CSV etc)
 * do the job of calling the
 *
 * @param array $hash
 * @param integer $numCols
 * @return array
 */
function gd_get_data_set_template($hash, $num_cols)
{
  $row_order = $hash["rowOrder"];
  $row_numbers = explode(",", $row_order);

  // find out what the user wants to generate
  $info = array();
  $order = 1;
  foreach ($row_numbers as $i)
  {
    $title = $hash["title_$i"];
    $type  = $hash["type_$i"];

    // if there's no type, the field just wasn't filled in. Ignore the row
    if (empty($type))
      continue;

    // make a note of the process order
    $process_order = 1;
    $process_order_varname = "{$type}_process_order";
    global $$process_order_varname;
    if (!empty($$process_order_varname))
    {
      $process_order = $$process_order_varname;
    }

    // this data type may or may not have options. If it does, it'll have a ..._get_template_options
    // function defined to return them
    $data_type_function = "{$type}_get_template_options";
    $options = "";

    if (function_exists($data_type_function))
      $options = $data_type_function($hash, $i, $num_cols);

    if ($options !== false)
    {
      if (!array_key_exists("process_order$process_order", $info))
        $info["process_order$process_order"] = array();

      $info["process_order$process_order"][] = array(
        "column_num"       => $order,
        "title"            => $title,
        "data_type_folder" => $type,
        "options"          => $options
      );
    }
    $order++;
  }

  // sort by process order and return
  ksort($info);

  return $info;
}


/**
 * Used for sorting the data set template, created by gd_get_data_set_template(). This is
 *
 * @param array $template
 */
function gd_sort_by_col_order($template)
{
	$ordered = array();
  while (list($order, $data_types) = each($template))
  {
    foreach ($data_types as $data_type)
    {
    	$order = $data_type["column_num"];
    	$ordered["order$order"] = $data_type;
    }
  }
  asort($ordered);

	return array_values($ordered);
}



/**
 * Populates the $g_data_types global with all information from the available data types.
 * That information is then handled by other functions to generate the examples, options,
 * help content and data type dropdown.
 */
function gd_get_data_types()
{
  global $g_field_groups, $LANG, $g_language;

  $folder = dirname(__FILE__);
  $data_types_folder = realpath("$folder/../data_types");

  $data_types = array();
  if ($handle = opendir($data_types_folder))
   {
    while (false !== ($item = readdir($handle)))
    {
      if ($item == "." || $item == ".." || $item == ".svn")
        continue;

      if (is_dir("$data_types_folder/$item"))
      {
        $info = gd_extract_data_type_info("$data_types_folder/$item");
        if (!empty($info))
          $data_types[] = $info;
      }
    }
    closedir($handle);
  }

  // now sort the data type information by field groups first and their order within those
  // field groups
  $sorted_data_types = array();
  foreach ($g_field_groups as $group_name_key)
  {
    $group_types = array();
    foreach ($data_types as $curr_data_type)
    {
      if ($curr_data_type["data_type_field_group_index"] == $group_name_key)
        $group_types[] = $curr_data_type;
    }
    $sorted_data_types[$group_name_key] = gd_array_sort($group_types, "data_type_field_group_order");
  }

  return $sorted_data_types;
}


/**
 * Helper function to extract all info from a data type.
 *
 * @param string $folder
 */
function gd_extract_data_type_info($folder)
{
  global $LANG;

  if (!is_file("$folder/ui.php"))
    return array();

  @include("$folder/ui.php");

  $info = get_defined_vars();
  unset($info["L"]);
  $info["data_type_name"] = $LANG["{$info["data_folder_name"]}_name"];

  return $info;
}


/**
 * Called by process.php. This includes all data type generate.php files.
 */
function gd_include_data_type_code()
{
  $folder = dirname(__FILE__);
  $data_types_folder = realpath("$folder/../data_types");

  if ($handle = opendir($data_types_folder))
   {
    while (false !== ($item = readdir($handle)))
    {
      if ($item == "." || $item == ".." || $item == ".svn")
        continue;

      if (is_dir("$data_types_folder/$item"))
      {
        include_once("$data_types_folder/$item/generate.php");
      }
    }

    closedir($handle);
  }
}

function gd_include_data_type_includes()
{
  $data_types = array();
  $folder = dirname(__FILE__);
  $data_types_folder = realpath("$folder/../data_types");

  if ($handle = opendir($data_types_folder))
   {
    while (false !== ($item = readdir($handle)))
    {
      if ($item == "." || $item == ".." || $item == ".svn")
        continue;

      if (is_dir("$data_types_folder/$item") && is_file("$data_types_folder/$item/include.php"))
      {
        include_once("$data_types_folder/$item/include.php");
      }
    }

    closedir($handle);
  }
}