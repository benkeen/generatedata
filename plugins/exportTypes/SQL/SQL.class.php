<?php

/**
 * For Data Types to properly integrate with the SQL Export Type, they should return additional metadata
 * that lets this module know about the database column type. That value is used in the initial CREATE TABLE
 * statement.
 *
 * 		"sqlField"          This is used for all SQL database types.
 * 		"sqlField_Oracle"   Used for Oracle only
 * 		"sqlField_MySQL"    Used for MySQL only
 * 		"sqlField_SQLite"   Used for SQLite only
 *		"sqlField_MSSQL"	Used for MSSQL only
 *
 * @author Ben Keen <ben.keen@gmail.com>
 * @package ExportTypes
 */
class SQL extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "SQL";
	protected $jsModules = array("SQL.js");
	protected $codeMirrorModes = array("sql");
	public $L = array();

	// stores various info about the current generation set
	private $template;
	private $numericFields;
	private $postData;
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


	function generate($generator) {
		$this->template     = $generator->getTemplateByDisplayOrder();
		$this->postData     = $generator->getPostData();
		$this->exportTarget = $generator->getExportTarget();
		$this->isFirstBatch = $generator->isFirstBatch();
		$this->isLastBatch  = $generator->isLastBatch();
		$this->data         = $generator->generateExportData();
		$this->currentBatchFirstRow = $generator->getCurrentBatchFirstRow();

		// grab whatever settings where chosen by the user
		$this->includeDropTable = isset($this->postData["etSQL_dropTable"]);
		$this->createTable      = isset($this->postData["etSQL_createTable"]);
		$this->databaseType     = $this->postData["etSQL_databaseType"];
		$this->tableName        = $this->postData["etSQL_tableName"];
		$this->backquote        = isset($this->postData["etSQL_encloseWithBackquotes"]) ? "`" : "";
		$this->sqlStatementType = isset($this->postData["etSQL_statementType"]) ? $this->postData["etSQL_statementType"] : "insert";
		$this->primaryKey       = (isset($this->postData["etSQL_primaryKey"])) ? $this->postData["etSQL_primaryKey"] : "default";

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

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.sql";
	}

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="50%">

		<table cellspacing="2" cellpadding="0" width="100%">
		<tr>
			<td width="150"><label for="etSQL_tableName">{$this->L["db_table_name"]}</label></td>
			<td valign="top"><input type="text" size="40" name="etSQL_tableName" id="etSQL_tableName" value="myTable" /></td>
		</tr>
		<tr>
			<td><label for="etSQL_databaseType">{$this->L["db_type"]}</label></td>
			<td>
				<select name="etSQL_databaseType" id="etSQL_databaseType">
					<option value="MySQL">MySQL</option>
					<option value="Postgres">Postgres</option>
					<option value="SQLite">SQLite</option>
					<option value="Oracle">Oracle</option>
					<option value="MSSQL">SQL Server</option>
				</select>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$this->L["misc_options"]}</label></td>
			<td>
				<div>
					<input type="checkbox" name="etSQL_createTable" id="etSQL_createTable" checked="checked" />
					<label for="etSQL_createTable">{$this->L["include_create_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="etSQL_dropTable" id="etSQL_dropTable" checked="checked" />
					<label for="etSQL_dropTable">{$this->L["include_drop_table_query"]}</label>
				</div>
				<div id="etSQL_encloseWithBackquotes_group">
					<input type="checkbox" name="etSQL_encloseWithBackquotes" id="etSQL_encloseWithBackquotes" checked="checked" />
					<label for="etSQL_encloseWithBackquotes">{$this->L["enclose_table_backquotes"]}</label>
				</div>
			</td>
		</tr>
		</table>

	</td>
	<td width="50%" valign="top">

		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td valign="top"><label>{$this->L["statement_type"]}</label></td>
			<td>
				<div>
					<input type="radio" name="etSQL_statementType" id="etSQL_statementType1" value="insert" checked="checked" />
					<label for="etSQL_statementType1">INSERT</label>
				</div>
				<div id="etSQL_insertIgnore">
					<input type="radio" name="etSQL_statementType" id="etSQL_statementType2" value="insertignore" />
					<label for="etSQL_statementType2">INSERT IGNORE</label>
				</div>
				<div>
					<input type="radio" name="etSQL_statementType" id="etSQL_statementType3" value="update" />
					<label for="etSQL_statementType3">UPDATE</label>
				</div>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$this->L["primary_key"]}</label></td>
			<td>
				<div>
					<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey1" value="none" />
					<label for="etSQL_primaryKey1">{$LANG["none"]}</label>
				</div>
				<div>
					<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey2" value="default" checked="checked" />
					<label for="etSQL_primaryKey2">{$this->L["add_default_auto_increment_col"]}</label>
				</div>
			</td>
		</tr>
		</table>

	</td>
</tr>
</table>
END;
		return $html;
	}


	/**
	 * Generates a MySQL table with all the data.
	 * @return string
	 */
	private function generateCreateTableSQL_MySQL() {
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
					$content .= "{$prefix}{$this->backquote}id{$this->backquote} mediumint(8) unsigned NOT NULL auto_increment,$endLineChar";
				}

				$cols = array();
				foreach ($this->template as $dataType) {
					// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
					$columnTypeInfo = "MEDIUMTEXT";
					if (isset($dataType["columnMetadata"]["SQLField_MySQL"])) {
						$columnTypeInfo = $dataType["columnMetadata"]["SQLField_MySQL"];
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
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
			} elseif ($this->sqlStatementType == "insertignore") {
				$displayVals = array();
				for ($j=0; $j<$numCols; $j++) {
					if ($this->numericFields[$j]) {
						$displayVals[] = $this->data["rowData"][$i][$j];
					} else {
						$displayVals[] = "\"" . $this->data["rowData"][$i][$j] . "\"";
					}
				}
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT IGNORE INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
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

		return $content;
	}


	/**
	 * Generates a MySQL table with all the data.
	 * @return string
	 */
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
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT INTO \"{$this->tableName}\" ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
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

		return $content;
	}


	/**
	 * Generates an Oracle table with all the data.
	 * @return string
	 */
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
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
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
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
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
				$content .= "{$prefix}DROP TABLE {$this->tableName};$endLineChar";
				$content .= "END;$endLineChar";
				$content .= "GO{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content .= "CREATE TABLE {$this->tableName} ($endLineChar";
				if ($this->primaryKey == "default") {
					$content .= "{$prefix}{$this->tableName}ID INTEGER NOT NULL IDENTITY(1, 1),$endLineChar";
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
					$cols[] = "{$prefix}{$dataType["title"]} $columnTypeInfo";
				}

				$content .= implode(",$endLineChar", $cols);

				if ($this->primaryKey == "default") {
					$content .= ",$endLineChar{$prefix}PRIMARY KEY ({$this->tableName}ID)$endLineChar);{$endLineChar}GO{$endLineChar}{$endLineChar}";
				} else if ($this->primaryKey == "none") {
					$content .= "$endLineChar);{$endLineChar}GO{$endLineChar}{$endLineChar}";
				}
			}
		}

		$colNamesStr = implode(",", $this->data["colData"]);
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
						$displayVals[] = "'" . preg_replace("/'/", "\'", $this->data["rowData"][$i][$j]) . "'";
					}
				}
				$rowDataStr = implode(",", $displayVals);
				$content .= "INSERT INTO {$this->tableName}($colNamesStr) VALUES($rowDataStr);$endLineChar";
				
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
						$colValue = "'" . preg_replace("/'/", "\'", $this->data["rowData"][$i][$j]) . "'";
					}
					$pairs[]  = "{$colName} = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE {$this->tableName} SET $pairsStr WHERE {$this->tableName}ID = $rowNum;$endLineChar";
				
				if (($currentRow % 1000) == 0) {
					$content .= $endLineChar;
					$content .= "PRINT 'Row {$currentRow} updated';$endLineChar";
					$content .= "GO";
					$content .= $endLineChar;
				}
			}
		}

		return $content;
	}

	
	function wrapGeneratedContent($generatedContent) {
		$html =<<< END
<!DOCTYPE html>
<html>
<head>
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

}
