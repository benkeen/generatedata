<?php


class XML extends ExportTypePlugin {
	protected $exportTypeName = "XML";
	protected $jsModules = array("XML.js");
	public $L = array();

	function generate($generator) {

	}

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="30%" valign="top">
		<table cellspacing="0" cellpadding="0">
		<tr>
			<td width="160"><label for="etXML_rootNodeName">{$LANG["root_node_name"]}</label></td>
			<td>
				<input type="text" size="15" name="etXML_rootNodeName" id="etXML_rootNodeName" value="records" />
			</td>
		</tr>
		<tr>
			<td><label for="etXML_recordNodeName">{$LANG["record_node_name"]}</label></td>
			<td>
				<input type="text" size="15" name="etXML_recordNodeName" id="etXML_recordNodeName" value="record" />
			</td>
		</tr>
		</table>
	</td>
	<td width="70%" valign="top">
		<label for="etXML_useCustomExportFormat">
			<input type="checkbox" name="etXML_useCustomExportFormat" id="etXML_useCustomExportFormat" />
			{$LANG["use_custom_xml_format"]}
		</label>
		<textarea style="width: 98%; height: 70px" class="gdDisabled" name="etXML_customFormat" id="etXML_customFormat" disabled="disabled">&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;records&gt;
	{records}
		&lt;record&gt;
			&lt;row1&gt;{ROW1}&lt;/row1&gt;
			&lt;row2&gt;{ROW2}&lt;/row2&gt;
		&lt;/record&gt;
	{/records}
&lt;/records&gt;</textarea>
		<!--<div style="line-height:12px"><a href="">edit full screen</a></div>-->
	</td>
</tr>
</table>
END;
		return $html;
	}

	/**
	 * This is used to generate custom XML structures (added on 2.3.6).
	 *
	 * @param string $custom_xml_structure
	 * @param array $g_template
	 * @param integer $num_rows
	 */
	public function generateCustomXML($custom_xml_structure, $g_template, $num_rows) {
		global $L;

		$xml = "";

		// first, add the chunk of markup between the records tag. Note the "is" bit. That tells
		// the regexp parser to let . match newline characters and that it should be case
		// insensitive
		preg_match("/(.*)\{records\}(.*)\{\/records\}(.*)/is", $custom_xml_structure, $matches);

		if (count($matches) < 2) {
			echo "<error>{$L["invalid_custom_xml"]}</error>";
			return;
		}

		$xml_start  = $matches[1];
		$row_markup = $matches[2];
		$xml_end    = $matches[3];

		// now loop through the {records} and replace the appropriate placeholders with their rows
		$xml_rows = "";
		for ($row=1; $row<=$num_rows; $row++) {
			$placeholders = array();
			while (list($order, $data_types) = each($g_template)) {
				foreach ($data_types as $data_type) {
					$order = $data_type["column_num"];
					$data_type_folder = $data_type["data_type_folder"];
					$data_type_func = "{$data_type_folder}_generate_item";
					$data_type["random_data"] = $data_type_func($row, $data_type["options"], $row_data);

					if (is_array($data_type["random_data"])) {
						$placeholders["ROW{$order}"] = $data_type["random_data"]["display"];
					} else {
						$placeholders["ROW{$order}"] = $data_type["random_data"];
					}
				}
			}
			reset($g_template);

			$row_markup_copy = $row_markup;
			while (list($placeholder, $value) = each($placeholders)) {
				$row_markup_copy = preg_replace("/\{$placeholder\}/", $value, $row_markup_copy);
			}

			$xml_rows .= $row_markup_copy;
		}

		$final_xml = $xml_start . $xml_rows . $xml_end;

		return $final_xml;
	}

}
