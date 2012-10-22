<?php


class DataType_Company extends DataTypePlugin {

	protected $dataTypeName = "Company Names";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 50;
	private $helpDialogWidth = 340;

	public function generate($row, $placeholderStr, $existingRowData) {
		// Company,Corp.,Corporation,Inc.,Incorporated,LLC,LLP,Ltd,Limited,PC,Foundation,Institute,Associates,Industries,Consulting
	}

	public function getExportTypeInfo($exportType, $options) {
	}

	public function getRowGenerationOptions($postdata, $col, $num_cols) {
	}

	public function getHelpDialogInfo() {
		$content =<<< END
	<p>
		{$this->L["help"]}
	</p>
END;

		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $content
		);
	}
}
