<?php


class Translations
{
	private $list;

	/**
	 * Examines the contents of the /global/lang folder and returns the $L["language"] value for
	 * all translation files.
	 *
	 * @return array a hash of filename => language name
	 */
	function __construct()
	{
	  $translationsFolder = realpath(dirname(__FILE__) . "/../lang/");
	  $translations = array();
	  if ($handle = opendir($translationsFolder))
	  {
	    while (false !== ($item = readdir($handle)))
	    {
	      if ($item == "." || $item == ".." || $item == ".svn")
	        continue;

	      if (is_file("$translationsFolder/$item") && preg_match("/php$/", $item))
	      {
	      	$lang = $this->extractTranslationFileLanguage("$translationsFolder/$item");
	      	if (!empty($lang))
	          $translations[$item] = $lang;
	      }
	    }
	    closedir($handle);
	  }

	  $this->list = $translations;
	}

	public function getList()
	{
		return $this->list;
	}

	private function extractTranslationFileLanguage($file)
	{
	  @include($file);
	  $info = get_defined_vars();
	  return (isset($info["L"]["language"])) ? $info["L"]["language"] : "";
	}
}
