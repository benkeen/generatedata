import { ExportTypeGenerationData } from '../../../../types/general';
import { SQLSettings } from './SQL.ui';


export const generate = (): any => {

};


// Generates a MySQL table with all the data.
export const generateMySQL = (generationData: ExportTypeGenerationData, sqlSettings: SQLSettings): string => {
	const backquote = sqlSettings.encloseInBackquotes ? '`' : '';
	const colTitles = generationData.columns.map(({ title }) => title);
	let content = '';

	if (generationData.isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `DROP TABLE IF EXISTS ${backquote}${sqlSettings.tableName}${backquote};\n\n`;
		}
		if (sqlSettings.createTable) {
			content += `CREATE TABLE ${backquote}${sqlSettings.tableName}${backquote} (\n`;
			if (sqlSettings.addPrimaryKey) {
				content += `  ${backquote}id${backquote} mediumint(8) unsigned NOT NULL auto_increment,\n`;
			}
			const cols: any[] = [];
			generationData.columns.forEach(({ title, dataType }) => {
				let columnTypeInfo = 'MEDIUMTEXT';
				const metadata = generationData.dataTypeMetadata[dataType];
				if (metadata && metadata.sql) {
					if (metadata.sql.field_MySQL) {
						columnTypeInfo = metadata.sql.field_MySQL;
					} else if (metadata.sql.field) {
						columnTypeInfo = metadata.sql.field;
					}
				}
				cols.push(`  ${backquote}${title}${backquote} ${columnTypeInfo}`);
			});

			content += cols.join(',\n');
			if (sqlSettings.addPrimaryKey) {
				content += `,\n  PRIMARY KEY (${backquote}id${backquote})\n) AUTO_INCREMENT=1;\n\n`;
			} else {
				content += `\n);\n\n`;
			}
		}
	}

	let colNamesStr = '';
	if (sqlSettings.encloseInBackquotes) {
		colNamesStr = `\`${colTitles.join('`,`')}\``;
	} else {
		colNamesStr = colTitles.join(',');
	}

	let rowDataStr: string[] = [];
	generationData.rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				// if ($this->numericFields[$j]) {
				// 	$displayVals[] = $this->data["rowData"][$i][$j];
				// } else {
				// 	$displayVals[] = "\"" . $this->data["rowData"][$i][$j] . "\"";
				// }
				displayVals.push(`"${row[colIndex]}"`);
			});

			rowDataStr.push(displayVals.join(','));

			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else if (sqlSettings.statementType === 'insertIgnore') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				// if ($this->numericFields[$j]) {
				// 	$displayVals[] = $this->data["rowData"][$i][$j];
				// } else {
				// 	$displayVals[] = "\"" . $this->data["rowData"][$i][$j] . "\"";
				// }
				displayVals.push(`"${row[colIndex]}"`);
			});

			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT IGNORE INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				// if ($this->numericFields[$j]) {
				// 		$colValue = $this->data["rowData"][$i][$j];
				// } else {
				// 		$colValue = "\"" . $this->data["rowData"][$i][$j] . "\"";
				// }
				const colValue = `"${row[colIndex]}"`;
				pairs.push(`${backquote}${title}${backquote} = ${colValue}`);
			});

			const pairsStr = pairs.join(', ');
			content += `UPDATE ${backquote}${sqlSettings.tableName}${backquote} SET ${pairsStr} WHERE ${backquote}id${backquote} = ${rowIndex+1};\n`;
		}
	});

	if (rowDataStr.length) {
		if (sqlSettings.statementType === 'insert') {
			content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
		} else if (sqlSettings.statementType === 'insertIgnore') {
			content += `INSERT IGNORE INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
		}
	}

	return content;
};



/*
	protected $isEnabled = true;
	protected $exportTypeName = "SQL";
	protected $jsModules = array("SQL.js");
	protected $codeMirrorModes = array("sql");
	protected $contentTypeHeader = "application/octet-stream";
	protected $addHeadersInNewWindow = false;

	public $L = array();

	// stores various info about the current generation set
	private $genEnvironment; // "API" or "POST"
	private $template;
	private $numericFields;
	private $userSettings;
	private $exportTarget;
	private $isFirstBatch;
	private $isLastBatch;
	private $includeDropTable;
	private $createTable;
	private $databaseType;
	private $tableName;
	private $backquote;
	private $sqlStatementType;
	private $primaryKey;
	private $insertBatchSize;


	function generate($generator) {
		$this->genEnvironment = $generator->genEnvironment;
		$this->template     = $generator->getTemplateByDisplayOrder();
		$this->userSettings = $generator->getUserSettings();
		$this->exportTarget = $generator->getExportTarget();

		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$this->exportTarget = "promptDownload";
		}

		$this->isFirstBatch = $generator->isFirstBatch();
		$this->isLastBatch  = $generator->isLastBatch();
		$this->data         = $generator->generateExportData();
		$this->currentBatchFirstRow = $generator->getCurrentBatchFirstRow();

		// grab whatever settings where chosen by the user
		$this->extractSettings();

		foreach ($this->template as $item) {
			$this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
		}

		$content = "";
		switch ($this->databaseType) {
			case "MySQL":
				$content .= $this->generateCreateTableSQL_MySQL();
				break;
			case "Postgres":
				$content .= $this->generateCreateTableSQL_Postgres();
				break;
			case "Oracle":
				$content .= $this->generateCreateTableSQL_Oracle();
				break;
			case "SQLite":
				$content .= $this->generateCreateTableSQL_SQLite();
				break;
			case "MSSQL":
				$content .= $this->generateCreateTableSQL_MSSQL();
				break;
		}

		if ($this->exportTarget == "newTab") {
			$content = $this->wrapGeneratedContent($content);
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
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.sql";
	}

	function isBatchSizeValid ($size) {
		if (empty($size) || !is_numeric($size) || $size > 300) {
			return false;
		}
		return true;
	}


	 * Generates a MySQL table with all the data.
	 * @return string
	private function generateCreateTableSQL_Postgres() {
		$content = "";
		$endLineChar = ($this->exportTarget == "newTab") ? "<br />\n" : "\n";
		$prefix      = ($this->exportTarget == "newTab") ? "&nbsp;&nbsp;" : "  ";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "newTab") ? "<br /><br /><hr size=\"1\" />\n" : "\n\n";
				$content .= "DROP TABLE IF EXISTS \"{$this->tableName}\";{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content .= "CREATE TABLE \"{$this->tableName}\" ($endLineChar";
				if ($this->primaryKey == "default") {
					$content .= "{$prefix}id SERIAL PRIMARY KEY,$endLineChar";
				}

				$cols = array();
				foreach ($this->template as $dataType) {
					// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
					$columnTypeInfo = "MEDIUMTEXT";
					if (isset($dataType["columnMetadata"]["SQLField_Postgres"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField_Postgres"];
					} else if (isset($dataType["columnMetadata"]["SQLField"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField"];
					}
					$cols[] = "{$prefix}{$dataType["title"]} $columnTypeInfo";
				}

				$content .= implode(",$endLineChar", $cols);
				$content .= "$endLineChar);{$endLineChar}{$endLineChar}";
			}
		}

		$colNamesStr = implode(",", $this->data["colData"]);

		$numRows = count($this->data["rowData"]);
		$numCols = count($this->data["colData"]);
		for ($i=0; $i<$numRows; $i++) {
			if ($this->sqlStatementType == "insert") {
				$displayVals = array();
				for ($j=0; $j<$numCols; $j++) {
					if ($this->numericFields[$j]) {
						$displayVals[] = $this->data["rowData"][$i][$j];
					} else {
						$displayVals[] = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
				}
				$rowDataStr[] = implode(",", $displayVals);
				if (count($rowDataStr) == $this->insertBatchSize) {
					$content .= "INSERT INTO \"{$this->tableName}\" ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
					$rowDataStr = array();
				}
			} else {
				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					if ($this->numericFields[$j]) {
						$colValue = $this->data["rowData"][$i][$j];
					} else {
						$colValue = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
					$pairs[]  = "{$colName} = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE \"{$this->tableName}\" SET $pairsStr WHERE id = $rowNum;$endLineChar";
			}
		}
		if (!empty($rowDataStr) && $this->sqlStatementType == "insert") {
			$content .= "INSERT INTO \"{$this->tableName}\" ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
		}

		return $content;
	}


	 * Generates an Oracle table with all the data.
	 * @return string
	private function generateCreateTableSQL_Oracle() {
		$content = "";
		$endLineChar = ($this->exportTarget == "newTab") ? "<br />\n" : "\n";
		$prefix      = ($this->exportTarget == "newTab") ? "&nbsp;&nbsp;" : "  ";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "newTab") ? "<br /><br /><hr size=\"1\" />\n" : "\n\n";
				$content .= "DROP TABLE {$this->backquote}{$this->tableName}{$this->backquote};{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content .= "CREATE TABLE {$this->backquote}{$this->tableName}{$this->backquote} ($endLineChar";
				if ($this->primaryKey == "default") {
					$content .= "{$prefix}{$this->backquote}id{$this->backquote} number primary key,$endLineChar";
				}

				$cols = array();
				foreach ($this->template as $dataType) {
					// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
					$columnTypeInfo = "MEDIUMTEXT";
					if (isset($dataType["columnMetadata"]["SQLField_Oracle"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField_Oracle"];
					} else if (isset($dataType["columnMetadata"]["SQLField"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField"];
					}
					$cols[] = "{$prefix}{$this->backquote}{$dataType["title"]}{$this->backquote} $columnTypeInfo";
				}

				$content .= implode(",$endLineChar", $cols);

				if ($this->primaryKey == "default") {
					$content .= ",$endLineChar{$prefix}PRIMARY KEY ({$this->backquote}id{$this->backquote})$endLineChar) AUTO_INCREMENT=1;{$endLineChar}{$endLineChar}";
				} else if ($this->primaryKey == "none") {
					$content .= "$endLineChar);{$endLineChar}{$endLineChar}";
				}
			}
		}

		$colNamesStr = "";
		if ($this->backquote) {
			$quoted = Utils::enquoteArray($this->data["colData"], "`");
			$colNamesStr = implode(",", $quoted);
		} else {
			$colNamesStr = implode(",", $this->data["colData"]);
		}

		$numRows = count($this->data["rowData"]);
		$numCols = count($this->data["colData"]);
		for ($i=0; $i<$numRows; $i++) {
			if ($this->sqlStatementType == "insert") {
				$displayVals = array();
				for ($j=0; $j<$numCols; $j++) {
					if ($this->numericFields[$j]) {
						$displayVals[] = $this->data["rowData"][$i][$j];
					} else {
						$displayVals[] = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
				}
				$rowDataStr[] = implode(",", $displayVals);
				if (count($rowDataStr) == $this->insertBatchSize) {
					$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
					$rowDataStr = array();
				}
			} else {
				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					if ($this->numericFields[$j]) {
						$colValue = $this->data["rowData"][$i][$j];
					} else {
						$colValue = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
					$pairs[]  = "{$this->backquote}{$colName}{$this->backquote} = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE {$this->backquote}{$this->tableName}{$this->backquote} SET $pairsStr WHERE {$this->backquote}id{$this->backquote} = $rowNum;$endLineChar";
			}
		}
		if (!empty($rowDataStr) && $this->sqlStatementType == "insert") {
			$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
		}

		return $content;
	}


	private function generateCreateTableSQL_SQLite() {
		$content = "";
		$endLineChar = ($this->exportTarget == "newTab") ? "<br />\n" : "\n";
		$prefix      = ($this->exportTarget == "newTab") ? "&nbsp;&nbsp;" : "  ";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "newTab") ? "<br /><br /><hr size=\"1\" />\n" : "\n\n" ;
				$content .= "DROP TABLE {$this->backquote}{$this->tableName}{$this->backquote};{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content .= "CREATE TABLE {$this->backquote}{$this->tableName}{$this->backquote} ($endLineChar";
				if ($this->primaryKey == "default") {
					$content .= "{$prefix}{$this->backquote}id{$this->backquote} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,$endLineChar";
				}

				$cols = array();
				foreach ($this->template as $dataType) {
					// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
					$columnTypeInfo = "MEDIUMTEXT";
					if (isset($dataType["columnMetadata"]["SQLField_SQLite"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField_SQLite"];
					} else if (isset($dataType["columnMetadata"]["SQLField"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField"];
					}
					$cols[] = "{$prefix}{$this->backquote}{$dataType["title"]}{$this->backquote} $columnTypeInfo";
				}

				$content .= implode(",$endLineChar", $cols);

				if ($this->primaryKey == "default") {
					$content .= ",$endLineChar{$prefix}PRIMARY KEY ({$this->backquote}id{$this->backquote})$endLineChar) AUTO_INCREMENT=1;{$endLineChar}{$endLineChar}";
				} else if ($this->primaryKey == "none") {
					$content .= "$endLineChar);{$endLineChar}{$endLineChar}";
				}
			}
		}

		$colNamesStr = "";
		if ($this->backquote) {
			$quoted = Utils::enquoteArray($this->data["colData"], "`");
			$colNamesStr = implode(",", $quoted);
		} else {
			$colNamesStr = implode(",", $this->data["colData"]);
		}

		$numRows = count($this->data["rowData"]);
		$numCols = count($this->data["colData"]);
		for ($i=0; $i<$numRows; $i++) {
			if ($this->sqlStatementType == "insert") {
				$displayVals = array();
				for ($j=0; $j<$numCols; $j++) {
					if ($this->numericFields[$j]) {
						$displayVals[] = $this->data["rowData"][$i][$j];
					} else {
						$displayVals[] = "\"" . $this->data["rowData"][$i][$j] . "\"";
					}
				}
				$rowDataStr[] = implode(",", $displayVals);
                                if (count($rowDataStr) == $this->insertBatchSize) {
                                    $content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
                                    $rowDataStr = array();
                                }
			} else {
				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					if ($this->numericFields[$j]) {
						$colValue = $this->data["rowData"][$i][$j];
					} else {
						$colValue = "\"" . $this->data["rowData"][$i][$j] . "\"";
					}
					$pairs[]  = "{$this->backquote}{$colName}{$this->backquote} = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE {$this->backquote}{$this->tableName}{$this->backquote} SET $pairsStr WHERE {$this->backquote}id{$this->backquote} = $rowNum;$endLineChar";
			}
		}
		if (!empty($rowDataStr) && $this->sqlStatementType == "insert") {
			$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES (" . implode('),(', $rowDataStr) . ");$endLineChar";
		}

		return $content;
	}

	private function generateCreateTableSQL_MSSQL() {
		$content = "";
		$endLineChar = ($this->exportTarget == "newTab") ? "<br />\n" : "\n";
		$prefix      = ($this->exportTarget == "newTab") ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "    ";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "newTab") ? "<br /><br /><hr size=\"1\" />\n" : "\n\n" ;
				$content .= "IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID('{$this->tableName}'))$endLineChar";
				$content .= "BEGIN;$endLineChar";
				$content .= "{$prefix}DROP TABLE [{$this->tableName}];$endLineChar";
				$content .= "END;$endLineChar";
				$content .= "GO{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content .= "CREATE TABLE [{$this->tableName}] ($endLineChar";
				if ($this->primaryKey == "default") {
					$content .= "{$prefix}[{$this->tableName}ID] INTEGER NOT NULL IDENTITY(1, 1),$endLineChar";
				}

				$cols = array();
				foreach ($this->template as $dataType) {
					// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
					$columnTypeInfo = "MEDIUMTEXT";
					if (isset($dataType["columnMetadata"]["SQLField_MSSQL"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField_MSSQL"];
					} else if (isset($dataType["columnMetadata"]["SQLField"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField"];
					}
					$cols[] = "{$prefix}[{$dataType["title"]}] $columnTypeInfo";
				}

				$content .= implode(",$endLineChar", $cols);

				if ($this->primaryKey == "default") {
					$content .= ",$endLineChar{$prefix}PRIMARY KEY ([{$this->tableName}ID])$endLineChar);{$endLineChar}GO{$endLineChar}{$endLineChar}";
				} else if ($this->primaryKey == "none") {
					$content .= "$endLineChar);{$endLineChar}GO{$endLineChar}{$endLineChar}";
				}
			}
		}

		$colNamesStr = "[" . implode("],[", $this->data["colData"]) . "]";
		$numRows = count($this->data["rowData"]);
		$numCols = count($this->data["colData"]);
		for ($i=0; $i<$numRows; $i++) {
			$currentRow = $i + 1;
			if ($this->sqlStatementType == "insert") {
				$displayVals = array();
				for ($j=0; $j<$numCols; $j++) {
					if ($this->numericFields[$j]) {
						$displayVals[] = $this->data["rowData"][$i][$j];
					} else {
						$displayVals[] = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
				}

				$rowDataStr[] = implode(",", $displayVals);
                                if (count($rowDataStr) == $this->insertBatchSize) {
                                    $content .= "INSERT INTO {$this->tableName}($colNamesStr) VALUES(" . implode('),(', $rowDataStr) . ");$endLineChar";
                                    $rowDataStr = array();
                                }

				if (($currentRow % 1000) == 0) {
					$content .= $endLineChar;
					$content .= "PRINT 'Row {$currentRow} inserted';$endLineChar";
					$content .= "GO";
					$content .= $endLineChar;
				}
			} else {
				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					if ($this->numericFields[$j]) {
						$colValue = $this->data["rowData"][$i][$j];
					} else {
						$colValue = "'" . preg_replace("/'/", "''", $this->data["rowData"][$i][$j]) . "'";
					}
					$pairs[]  = "[{$colName}] = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE [{$this->tableName}] SET $pairsStr WHERE [{$this->tableName}ID] = $rowNum;$endLineChar";

				if (($currentRow % 1000) == 0) {
					$content .= $endLineChar;
					$content .= "PRINT 'Row {$currentRow} updated';$endLineChar";
					$content .= "GO";
					$content .= $endLineChar;
				}
			}
		}
		if (!empty($rowDataStr) && $this->sqlStatementType == "insert") {
			$content .= "INSERT INTO {$this->tableName}($colNamesStr) VALUES(" . implode('),(', $rowDataStr) . ");$endLineChar";
		}

		return $content;
	}


	private function wrapGeneratedContent($generatedContent) {
		$html =<<< END
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style type="text/css">
	body { margin: 10px; font-family: "lucida grande", arial; font-size: 9pt; }
	</style>
</head>
<body>
$generatedContent
</body>
</html>
END;
		return $html;
	}


	private function extractSettings() {
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			$settings = $this->userSettings->export->settings;

			// these two are enforced as required by the schema file
			$this->databaseType     = $settings->databaseType;
			$this->tableName        = $settings->tableName;

			// optional values. Note the default values for each
			$this->includeDropTable = property_exists($settings, "dropTable") ? $settings->dropTable : false;
			$this->createTable      = property_exists($settings, "createTable") ? $settings->createTable : true;
			$backquote = property_exists($settings, "encloseWithBackquotes") ? $settings->encloseWithBackquotes : false;
			$this->backquote = ($backquote) ? "`" : "";
			$this->sqlStatementType = property_exists($settings, "statementType") ? $settings->statementType : "insert";

			$addPrimaryKey = property_exists($settings, "addPrimaryKey") ? $settings->addPrimaryKey : null;
			if ($addPrimaryKey == null) {
				$this->primaryKey = false;
			} else {
				$this->primaryKey = ($addPrimaryKey) ? "default" : "none";
			}

			$this->insertBatchSize = property_exists($settings, "insertBatchSize") ? $settings->insertBatchSize : 1;
		} else {
			$this->includeDropTable = isset($this->userSettings["etSQL_dropTable"]);
			$this->createTable = isset($this->userSettings["etSQL_createTable"]);
			$this->databaseType = $this->userSettings["etSQL_databaseType"];
			$this->tableName = $this->userSettings["etSQL_tableName"];
			$this->backquote = isset($this->userSettings["etSQL_encloseWithBackquotes"]) ? "`" : "";
			$this->sqlStatementType = isset($this->userSettings["etSQL_statementType"]) ? $this->userSettings["etSQL_statementType"] : "insert";
			$this->primaryKey = (isset($this->userSettings["etSQL_primaryKey"])) ? $this->userSettings["etSQL_primaryKey"] : "default";
			$this->insertBatchSize = ($this->isBatchSizeValid($this->userSettings["etSQL_insertBatchSize"])) ? $this->userSettings["etSQL_insertBatchSize"] : 1;
		}
	}
}
*/
