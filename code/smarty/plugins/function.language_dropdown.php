<?php

function smarty_function_language_dropdown($params, &$smarty)
{
	/*
      <select id="selectLanguage">
        <option value=""><?php echo $LANG["select_language"]?></option>
        <?php
        while (list($file, $language) = each($g_translations))
        {
          $value = preg_replace("/\.php$/", "", $file);
          $selected = ($value == $g_language) ? " selected" : "";
          echo "<option value=\"{$value}\"{$selected}>{$language}</option>\n";
        }
        ?>
      </select>
  */
}
