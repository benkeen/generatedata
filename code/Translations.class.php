<?php


class Translations
{
	/**
	 * Examines the contents of the /global/lang folder and returns the $L["language"] value for
	 * all translation files.
	 *
	 * @return array a hash of filename => language name
	 */
	public function getList()
	{
	  $translationFolder = realpath(dirname(__FILE__) . "/../lang/");
	  $translations = array();
	  if ($handle = opendir($translationFolder))
	  {
	    while (false !== ($item = readdir($handle)))
	    {
	      if ($item == "." || $item == ".." || $item == ".svn")
	        continue;

	      if (is_file("$translationFolder/$item") && preg_match("/php$/", $item))
	      {
	      	$lang = $this->extractTranslationFileLanguage("$translationFolder/$item");
	      	if (!empty($lang))
	          $translations[$item] = $lang;
	      }
	    }
	    closedir($handle);
	  }

	  return $translations;
	}


	private function extractTranslationFileLanguage($file)
	{
	  @include($file);
	  $info = get_defined_vars();
	  return (isset($info["L"]["language"])) ? $info["L"]["language"] : "";
	}
}
