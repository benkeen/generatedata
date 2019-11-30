<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package ExportTypes
 */
class XML extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "XML";
	protected $jsModules = array("XML.js");
	protected $codeMirrorModes = array("xml", "smarty", "smartymixed");
	protected $contentTypeHeader = "text/xml";
	public $L = array();


	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->smarty = new SecureSmarty();
			$this->smarty->template_dir = realpath(dirname(__FILE__) . "/../../../resources/libs/smarty");
			$this->smarty->compile_dir  = realpath(dirname(__FILE__) . "/../../../cache");
		}
	}

	/**
	 * Generates the XML data.
	 * @param $generator
	 * @return array
	 */
	function generate($generator) {
		$this->genEnvironment = $generator->genEnvironment; // API / POST
		$this->userSettings   = $generator->getUserSettings();
		$useCustomXMLFormat   = $this->isUsingCustomXMLFormat();

		$content = "";
		if ($useCustomXMLFormat) {
			$smartyTemplate = $this->getCustomTemplate();
			$content = $this->generateCustomXML($generator, $smartyTemplate);
		} else {
			$content = $this->generateXML($generator, $this->userSettings);
		}

		return array(
			"success" => true,
			"content" => $content
		);
	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	public function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.xml";
	}

	public function getAdditionalSettingsHTML() {
		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="40%" valign="top">
		<table cellspacing="0" cellpadding="0">
		<tr>
			<td width="160" class="etXMLDefaultFormatLabels"><label for="etXMLRootNodeName">{$this->L["root_node_name"]}</label></td>
			<td>
				<input type="text" size="15" name="etXMLRootNodeName" id="etXMLRootNodeName" value="records" />
			</td>
		</tr>
		<tr>
			<td class="etXMLDefaultFormatLabels"><label for="etXMLRecordNodeName">{$this->L["record_node_name"]}</label></td>
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
<input type="hidden" name="etXMLCustomHTMLSource" id="etXMLCustomHTMLSource" />

<div id="etXMLCustomFormatDialog" style="display:none">
	<div style="width: 300px; float: left;">
		<h4>{$this->L["available_smarty_vars"]}</h4>

<pre>{\$isFirstBatch}, {\$isLastBatch}</pre>
{$this->L["batch_vars"]}

<pre>{\$colData}</pre>
{$this->L["col_names_array"]}

<pre>{\$rowData}</pre>
{$this->L["row_data_array"]}

		<button class="gdPrimaryButton" id="etXML_ResetCustomHTML">{$this->L["reset_custom_html"]}</button>
	</div>
	<div id="etXMLCustomContent">
		<textarea name="etXMLCustomSmarty" id="etXMLCustomSmarty"></textarea>
	</div>
</div>
END;
		return $html;
	}


	/**
	 * Generates the XML data based on the two settings available: Root Node Name and Record Node Name, which
	 * default to "records" and "<record>" respectively.
	 *
	 * @param object $generator the Generator object
	 * @param array $postData
	 * @return string
	 */
	private function generateXML($generator, $postData) {
		$data = $generator->generateExportData();
		$rootNodeName   = $this->getXMLRootNodeName();
		$recordNodeName = $this->getXMLRecordNodeName();

		$content = "";
		if ($generator->isFirstBatch()) {
			$content .= '<?xml version="1.0" encoding="UTF-8" ?>';
			$content .= "<{$rootNodeName}>\n";
		}

		$numCols = count($data["colData"]);
		foreach ($data["rowData"] as $row) {
			$content .= "\t<{$recordNodeName}>\n";
			for ($i=0; $i<$numCols; $i++) {
				$content .= "\t\t<{$data["colData"][$i]}>{$row[$i]}</{$data["colData"][$i]}>\n";
			}
			$content .= "\t</{$recordNodeName}>\n";
		}

		if ($generator->isLastBatch()) {
			$content .= "</{$rootNodeName}>";
		}
		return $content;
	}


	/**
	 * This is used to generate custom XML formats.
	 *
	 * @param object $generator the Generator object
	 * @param string $smartyTemplate the Smarty content
	 * @return string
	 */
	private function generateCustomXML($generator, $smartyTemplate) {
		$data = $generator->generateExportData();
		return Templates::evalSmartyString($smartyTemplate, $data);
	}

	// TODO group these!

	private function isUsingCustomXMLFormat() {
		$usingXMLFormat = false;
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$settings = $this->userSettings->export->settings;
			$usingXMLFormat = property_exists($settings, "useCustomExportFormat") ? $settings->useCustomExportFormat : false;
		} else {
			$usingXMLFormat = $this->userSettings["etXMLUseCustomExportFormat"];
		}
		return $usingXMLFormat;
	}


	private function getCustomTemplate() {
		$template = "";
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$template = $this->userSettings->export->settings->customTemplate;
		} else {
			$template = (get_magic_quotes_gpc()) ? stripslashes($this->userSettings["etXMLCustomHTMLSource"]) : $this->userSettings["etXMLCustomHTMLSource"];
		}
		return $template;
	}

	private function getXMLRootNodeName() {
		$name = "";
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$name = $this->userSettings->export->settings->rootNodeName;
		} else {
			$name = $this->userSettings["etXMLRootNodeName"];
		}
		return $name;
	}

	private function getXMLRecordNodeName() {
		$name = "";
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$name = $this->userSettings->export->settings->recordNodeName;
		} else {
			$name = $this->userSettings["etXMLRecordNodeName"];
		}
		return $name;
	}
}
