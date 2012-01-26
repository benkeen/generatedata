<?php


/**
 * Examines the contents of the /global/lang folder and returns the $L["language"] value for
 * all translation files.
 *
 * @return array a hash of filename => language name
 */
function gd_get_translations()
{
  $folder = dirname(__FILE__);
  $translation_folder = realpath("$folder/../lang/");

  $translations = array();
  if ($handle = opendir($translation_folder))
  {
    while (false !== ($item = readdir($handle)))
    {
      if ($item == "." || $item == ".." || $item == ".svn")
        continue;

      if (is_file("$translation_folder/$item") && preg_match("/php$/", $item))
        $translations[$item] = gd_extract_translation_file_info("$translation_folder/$item");
    }
    closedir($handle);
  }

  return $translations;
}

function gd_extract_translation_file_info($file)
{
  @include($file);
  $info = get_defined_vars();

  return $info["LANG"]["language"];
}
