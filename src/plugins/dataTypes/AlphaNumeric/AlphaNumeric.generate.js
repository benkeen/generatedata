
	protected $isEnabled = true;
	protected $dataTypeName = "Alphanumeric";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 10;


	public function generate($generator, $generationContextData) {
	$formats = explode("|", $generationContextData["generationOptions"]);
	$chosenFormat = $formats[0];
	if (count($formats) > 1) {
	$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
}
	$val = Utils::generateRandomAlphanumericStr($chosenFormat);
	return array(
	"display" => $val
	);
}

	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
	if (!isset($postdata["dtOption_$colNum"]) || empty($postdata["dtOption_$colNum"])) {
	return false;
}
	return $postdata["dtOption_$colNum"];
}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
	if (empty($json->settings->placeholder)) {
	return false;
}
	return $json->settings->placeholder;
}

	public function getDataTypeMetadata() {
	return array(
	"SQLField" => "varchar(255)",
	"SQLField_Oracle" => "varchar2(255)",
	"SQLField_MSSQL" => "VARCHAR(255) NULL"
	);
}

}
