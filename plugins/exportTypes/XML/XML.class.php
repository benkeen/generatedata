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
}
