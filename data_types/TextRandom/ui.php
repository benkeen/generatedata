<?php

/**
 * This is the field type's ui.php file: it contains all the info needed to display the data type
 * in the user interface, such as any examples, options markup and JS, and the content of the help
 * popup (if defined). The name of the data type must be defined in the language file:
 * /global/lang/***.php. It must be of the form:
 *
 *      $DT["NAMEOFFOLDER"] = array();
 *      $DT["NAMEOFFOLDER"]["name"] = "name of data type here";
 */

// ------------------------------------------------------------------------------------------------
// MAIN SETTINGS


// this acts as the internal namespace for the data type. It must be unique, alphanumeric chars only - a-Z -
// and be the same as the actual folder name.
$data_folder_name = "TextRandom";

// the name of the field group in which this data type should appear
$data_type_field_group_index = "text";

// the order in which this item should appear in the field group. To allow other data types
// to be sandwiched in between others, it's generally a good idea to make each item 10 apart
$data_type_field_group_order = 20;


// ------------------------------------------------------------------------------------------------
// OPTIONS

$data_type_options_html =<<<EOF
	<table cellpadding="0" cellspacing="1">
	<tr>
		<td>
			<input type="checkbox" name="startsWithLipsum_\$ROW\$" id="startsWithLipsum_\$ROW\$" />
			<label for="startsWithLipsum_\$ROW\$">Start with "Lorem Ipsum..."</label>
		</td>
	</tr>
	<tr>
		<td>
			Generate #<input type="text" name="numWordsMin_\$ROW\$" id="numWordsMin_\$ROW\$" style="width: 40px" value="1" />
			to #<input type="text" name="numWordsMax_\$ROW\$" id="numWordsMax_\$ROW\$" style="width: 40px" value="10" /> words
		</td>
	</tr>
	</table>
EOF;

// ------------------------------------------------------------------------------------------------
// HELP

$help_popup_width = 320;
$help_html_content =<<<EOF
	<p>
		This option generates a random number of words - the total number within the
		range that you specify (inclusive). As with the Fixed number option, the words
		are pulled the standard lorem ipsum	latin text.
	</p>
EOF;

