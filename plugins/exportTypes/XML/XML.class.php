<?php


class XML extends ExportTypePlugin {
	protected $exportTypeName = "XML";
	protected $jsModules = array("XML.js");
	protected $cssFile = "XML.css";
	public $L = array();

	function generate($generator) {

	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.xml";
	}


	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="40%" valign="top">
		<table cellspacing="0" cellpadding="0">
		<tr>
			<td width="160" class="etXMLDefaultFormatLabels"><label for="etXMLRootNodeName">{$LANG["root_node_name"]}</label></td>
			<td>
				<input type="text" size="15" name="etXMLRootNodeName" id="etXMLRootNodeName" value="records" />
			</td>
		</tr>
		<tr>
			<td class="etXMLDefaultFormatLabels"><label for="etXMLRecordNodeName">{$LANG["record_node_name"]}</label></td>
			<td>
				<input type="text" size="15" name="etXMLRecordNodeName" id="etXMLRecordNodeName" value="record" />
			</td>
		</tr>
		</table>
	</td>
	<td width="60%" valign="top">
		<input type="checkbox" name="etXMLUseCustomExportFormat" id="etXMLUseCustomExportFormat" />
			<label for="etXMLUseCustomExportFormat">{$this->L["use_custom_xml_format"]}</label>
			<input type="button" id="etXMLEditCustomFormat" value="edit" disabled="disabled" />
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
