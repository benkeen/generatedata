<?php


class DataType_StreetAddress extends DataTypePlugin {
	protected $dataTypeName = "Street Address";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 10;


	public function generate($row, $options, $existingRowData) {
//	  global $g_words, $L;
		$street_address = "";
		$street_name = ucwords(gd_generate_random_text_str($g_words, false, "fixed", 1));
		$valid_street_types = explode(",", $L["StreetAddress_street_types"]);
		$street_type = $valid_street_types[rand(0, count($valid_street_types)-1)];

		$format = rand(1, 4);

		switch($format) {
			case "1":
				$street_address = $L["StreetAddress_po_box"] . " " . rand(100, 999) . ", " . rand(100, 9999) . " $street_name " . $street_type;
				break;
			case "2":
				$street_address = rand(100, 999) . "-" . rand(100, 9999) . " $street_name " . $street_type;
				break;
			case "3":
				$street_address = $L["StreetAddress_ap_num"] . rand(100, 999) . "-" . rand(100, 9999) . " $street_name " . $street_type;
				break;
			case "4":
				$street_address = rand(100, 9999) . " $street_name " . $street_type;
				break;
		}

		return $street_address;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(255) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(255) default NULL";
				break;
		}

		return $info;
	}

}
