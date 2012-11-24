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
 */
class SQL extends ExportTypePlugin {
	protected $exportTypeName = "SQL";
	protected $jsModules = array("SQL.js");
	public $L = array();

	// stores various info about the current generation set
	private $template;
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

		$content = "";
		switch ($this->databaseType) {
			case "MySQL":
				$content .= $this->generateCreateTableSQL_MySQL();
				break;
			case "Oracle":
				$content .= $this->generateCreateTableSQL_Oracle();
				break;
			case "SQLite":
				$content .= $this->generateCreateTableSQL_SQLite();
				break;
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
			<td width="150"><label for="etSQL_tableName">{$LANG["db_table_name"]}</label></td>
			<td><input type="text" size="48" name="etSQL_tableName" id="etSQL_tabelName" value="myTable" /></td>
		</tr>
		<tr>
			<td><label for="etSQL_databaseType">{$LANG["db_type"]}</label></td>
			<td>
				<select name="etSQL_databaseType" id="etSQL_databaseType">
					<option value="MySQL">MySQL</option>
					<option value="SQLite">SQLite</option>
					<option value="Oracle">Oracle</option>
				</select>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$LANG["misc_options"]}</label></td>
			<td>
				<div>
					<input type="checkbox" name="etSQL_createTable" id="etSQL_createTable" checked="checked" />
					<label for="etSQL_createTable">{$LANG["include_create_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="etSQL_dropTable" id="etSQL_dropTable" checked="checked" />
					<label for="etSQL_dropTable">{$LANG["include_drop_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="etSQL_encloseWithBackquotes" id="etSQL_encloseWithBackquotes" checked="checked" />
					<label for="etSQL_encloseWithBackquotes">{$LANG["enclose_table_backquotes"]}</label>
				</div>
			</td>
		</tr>
		</table>

	</td>
	<td width="50%" valign="top">

		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td valign="top"><label>{$LANG["statement_type"]}</label></td>
			<td>
				<div>
					<input type="radio" name="etSQL_statementType" id="etSQL_statementType1" value="insert" checked="checked" />
					<label for="etSQL_statementType1">INSERT</label>
				</div>
				<div>
					<input type="radio" name="etSQL_statementType" id="etSQL_statementType2" value="update" />
					<label for="etSQL_statementType2">UPDATE</label>
				</div>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$LANG["primary_key"]}</label></td>
			<td>
			<div>
				<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey1" value="none" />
				<label for="etSQL_primaryKey1">{$LANG["none"]}</label>
			</div>
			<div>
				<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey2" value="default" checked="checked" />
				<label for="etSQL_primaryKey2">{$LANG["add_default_auto_increment_col"]}</label>
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
		$endLineChar = ($this->exportTarget == "inPage") ? "\n" : "<br />\n";
		$prefix      = ($this->exportTarget == "inPage") ? "  " : "&nbsp;&nbsp;";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "inPage") ? "\n\n" : "<br /><br /><hr size=\"1\" />\n";
				$content .= "DROP TABLE {$this->backquote}{$this->tableName}{$this->backquote};{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content = "CREATE TABLE {$this->backquote}{$this->tableName}{$this->backquote} ($endLineChar";
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
				$quoted = Utils::enquoteArray($this->data["rowData"][$i], "'");
				$rowDataStr = implode(",", $quoted);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
			} else {

				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					$colValue = "\"" . $this->data["rowData"][$i][$j] . "\"";
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
	 * Generates an Oracle table with all the data.
	 * @return string
	 */
	private function generateCreateTableSQL_Oracle() {
		$content = "";
		$endLineChar = ($this->exportTarget == "inPage") ? "\n" : "<br />\n";
		$prefix      = ($this->exportTarget == "inPage") ? "  " : "&nbsp;&nbsp;";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "inPage") ? "\n\n" : "<br /><br /><hr size=\"1\" />\n";
				$content .= "DROP TABLE {$this->backquote}{$this->tableName}{$this->backquote};{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content = "CREATE TABLE {$this->backquote}{$this->tableName}{$this->backquote} ($endLineChar";
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
				$quoted = Utils::enquoteArray($this->data["rowData"][$i], "'");
				$rowDataStr = implode(",", $quoted);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
			} else {

				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					$colValue = "\"" . $this->data["rowData"][$i][$j] . "\"";
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
		$endLineChar = ($this->exportTarget == "inPage") ? "\n" : "<br />\n";
		$prefix      = ($this->exportTarget == "inPage") ? "  " : "&nbsp;&nbsp;";

		if ($this->isFirstBatch) {
			if ($this->includeDropTable) {
				$dropTableEndLine = ($this->exportTarget == "inPage") ? "\n\n" : "<br /><br /><hr size=\"1\" />\n";
				$content .= "DROP TABLE {$this->backquote}{$this->tableName}{$this->backquote};{$dropTableEndLine}";
			}

			if ($this->createTable) {
				$content = "CREATE TABLE {$this->backquote}{$this->tableName}{$this->backquote} ($endLineChar";
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
				$quoted = Utils::enquoteArray($this->data["rowData"][$i], "'");
				$rowDataStr = implode(",", $quoted);
				$content .= "INSERT INTO {$this->backquote}{$this->tableName}{$this->backquote} ($colNamesStr) VALUES ($rowDataStr);$endLineChar";
			} else {

				$pairs = array();
				for ($j=0; $j<$numCols; $j++) {
					$colName  = $this->data["colData"][$j];
					$colValue = "\"" . $this->data["rowData"][$i][$j] . "\"";
					$pairs[]  = "{$this->backquote}{$colName}{$this->backquote} = $colValue";
				}

				$pairsStr = implode(", ", $pairs);
				$rowNum = $this->currentBatchFirstRow + $i;
				$content .= "UPDATE {$this->backquote}{$this->tableName}{$this->backquote} SET $pairsStr WHERE {$this->backquote}id{$this->backquote} = $rowNum;$endLineChar";
			}
		}

		return $content;
	}

}
