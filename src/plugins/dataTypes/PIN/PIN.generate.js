import { getRandomNum } from '../../../utils/utils';

export const generate = () => ({ display: getRandomNum(1111, 9999) });

// public function getDataTypeMetadata() {
// 	return array(
// 		"SQLField" => "varchar(255)",
// 		"SQLField_Oracle" => "varchar2(255)",
// 		"SQLField_MSSQL" => "VARCHAR(255) NULL"
// );
// }
