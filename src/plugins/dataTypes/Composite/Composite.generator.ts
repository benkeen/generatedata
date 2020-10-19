import utils from '../../../utils';
import { DTGenerateResult, DTMetadata } from '~types/dataTypes';

let utilsLoaded = false;

export const generate = (data: any): DTGenerateResult => {
	console.log(data);

	return { display: '' };
};

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};


/*
	public function generate($generator, $generationContextData) {
		$placeholders = array();
		foreach ($generationContextData["existingRowData"] as $rowInfo) {
			$colNum = $rowInfo["colNum"];
			$randomData  = is_array($rowInfo["randomData"]) ? $rowInfo["randomData"]["display"] : $rowInfo["randomData"];
			$placeholders["ROW{$colNum}"] = $randomData;
		}
		while (list($key, $value) = each($placeholders)) {
			$this->smarty->assign($key, $value);
		}
		$output = $this->smarty->fetch('string:' . $generationContextData["generationOptions"]);

		return array(
			"display" => $output
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $col, $num_cols) {
		if (!isset($postdata["dtOption_$col"]) || empty($postdata["dtOption_$col"])) {
			return false;
		}
		return $postdata["dtOption_$col"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		if (empty($json->settings->placeholder)) {
			return false;
		}
		return $json->settings->placeholder;
	}
}
*/
