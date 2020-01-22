import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { GenerationData, DTGenerateReturnType } from '../../../../types/dataTypes';
import { getLipsumWords, toTitleCase } from '../../../utils/stringUtils';
import { generateRandomTextStr } from '../../../utils/randomUtils';

const { words } = getLipsumWords();

export const generate = (data: GenerationData): DTGenerateReturnType => {

/*
	private $validStreetTypes;
	private $numValidStreetTypes;

	$this->validStreetTypes = explode(",", $this->L["street_types"]);
	$this->numValidStreetTypes = count($this->validStreetTypes);
*/

	const streetName = toTitleCase(generateRandomTextStr(words, false, 1));
	// $streetType = $this->validStreetTypes[mt_rand(0, $this->numValidStreetTypes-1)];

	// $format = mt_rand(1, 4);
	// $streetAddress = "";
	// switch ($format) {
	// 	case "1":
	// 		$streetAddress = $this->L["po_box"] . " " . mt_rand(100, 999) . ", " . mt_rand(100, 9999) . " $streetName " . $streetType;
	// 		break;
	// 	case "2":
	// 		$streetAddress = mt_rand(100, 999) . "-" . mt_rand(100, 9999) . " $streetName $streetType";
	// 		break;
	// 	case "3":
	// 		$streetAddress = $this->L["ap_num"] . mt_rand(100, 999) . "-" . mt_rand(100, 9999) . " $streetName " . $streetType;
	// 		break;
	// 	case "4":
	// 		$streetAddress = mt_rand(100, 9999) . " $streetName " . $streetType;
	// 		break;
	// }

	return {
		display: '' // streetAddress
	};
}

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
