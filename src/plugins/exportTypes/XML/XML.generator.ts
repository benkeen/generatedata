import { ExportTypeGenerationData } from '../../../../types/general';
import { XMLSettings } from './XML.ui';

export const generate = (blah: any): any => {
	console.log(blah);

	return {
		display: ''
	};
};

export const generateXML = (generationData: ExportTypeGenerationData, xmlSettings: XMLSettings): string => {
	const { rootNodeName, recordNodeName } = xmlSettings;

	let content = "";
	if (generationData.isFirstBatch) {
		content += '<?xml version="1.0" encoding="UTF-8" ?>';
		content += `<${rootNodeName}>\n`;
	}

	const numCols = generationData.columns.length;
	// foreach ($data["rowData"] as $row) {
	// 	$content .= "\t<{$recordNodeName}>\n";
	// 	for ($i=0; $i<$numCols; $i++) {
	// 		$content .= "\t\t<{$data["colData"][$i]}>{$row[$i]}</{$data["colData"][$i]}>\n";
	// 	}
	// 	$content .= "\t</{$recordNodeName}>\n";
	// }

	if (generationData.isLastBatch) {
		content += `</${rootNodeName}>`;
	}

	return content;
};

/*
     * Generates the XML data.
	 * @param $generator
	 * @return array
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

	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	public function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.xml";
	}

	 * Generates the XML data based on the two settings available: Root Node Name and Record Node Name, which
	 * default to "records" and "<record>" respectively.
	 *
	 * @param object $generator the Generator object
	 * @param array $postData
	 * @return string
	private function generateXML($generator, $postData) {
	}


	 * This is used to generate custom XML formats.
	 *
	 * @param object $generator the Generator object
	 * @param string $smartyTemplate the Smarty content
	 * @return string
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
*/
