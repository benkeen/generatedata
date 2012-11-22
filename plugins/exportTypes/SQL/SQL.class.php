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

	function generate($generator) {
		$exportTarget = $generator->getExportTarget();
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();

		$includeDropTable = isset($postData["etSQL_dropTable"]);
		$createTable      = isset($postData["etSQL_createTable"]);
		$databaseType     = $postData["etSQL_databaseType"];
		$tableName        = $postData["etSQL_tableName"];
		$backquote        = isset($postData["etSQL_encloseWithBackquotes"]) ? "`" : "";
		$sqlStatementType = isset($postData["etSQL_statementType"]) ? $postData["etSQL_statementType"] : "insert";
		$primaryKey       = (isset($postData["etSQL_primaryKey"])) ? $postData["etSQL_primaryKey"] : "default";

		$content = "";

		// if required, output the DROP TABLE query
		if ($data["isFirstBatch"]) {
			if (isset($includeDropTable)) {
				$content .= "DROP TABLE {$backquote}$tableName{$backquote};\n";
				if ($exportTarget == "newTab") {
					$content .= "<br /><br /><hr size='1' /><br />";
				}
			}
		}

		if ($createTable) {
			switch ($databaseType) {
				case "MySQL":
					$content .= generateCreateTableSQL_MySQL();
					break;
				case "Oracle":
					$content .= generateCreateTableSQL_Oracle();
					break;
				case "SQLite":
					$content .= generateCreateTableSQL_SQLite();
					break;
			}
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
			<td><label for="sql_database">{$LANG["db_type"]}</label></td>
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


	// needed vars: $tableName, $backquote, $primaryKey, $exportTarget, $template... lots!
	private function generateCreateTableSQL_MySQL() {
		$content = "CREATE TABLE {$backquote}$tableName{$backquote} (<br />\n";

		if ($primaryKey == "default") {
			echo "&nbsp;&nbsp;{$backquote}id{$backquote} mediumint(8) unsigned NOT NULL auto_increment,<br />\n";
		}

		$rows = array();
		while (list($order, $data_types) = each($g_template)) {
			foreach ($data_types as $data_type) {
				$data_type_folder = $data_type["data_type_folder"];
				$order            = $data_type["column_num"];
				$get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
				$export_type_info = $get_export_type_info_func('sql', 'MySQL');
				$rows["$order"] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			}
		}

		reset($g_template);
		ksort($rows, SORT_NUMERIC);
		echo implode(",<br />\n", $rows);

		if ($primaryKey == "default") {
			echo ",<br />\n&nbsp;&nbsp;PRIMARY KEY ({$backquote}id{$backquote})<br />\n) TYPE=MyISAM AUTO_INCREMENT=1;";
		} else if ($sql_primary_key == "none") {
			echo "<br />) TYPE=MyISAM;";
		}
	}


	private function generateCreateTableSQL_Oracle() {
		echo "CREATE TABLE {$backquote}$table_name{$backquote} (<br />\n";
		if ($sql_primary_key == "default")
			echo "&nbsp;&nbsp;{$backquote}id{$backquote} number primary key,<br />\n";

		reset($g_template);
		$rows = array();
		while (list($order, $data_types) = each($g_template))
		{
			foreach ($data_types as $data_type)
			{
				$data_type_folder = $data_type["data_type_folder"];
				$order            = $data_type["column_num"];
				$get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
				$export_type_info = $get_export_type_info_func('sql', 'Oracle');
				$rows[] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			}
		}
		reset($g_template);
		ksort($rows, SORT_NUMERIC);
		echo implode(",<br />\n", $rows);

		echo "\n<br />);";
	}

	private function generateCreateTableSQL_SQLite() {

		echo "CREATE TABLE {$backquote}$table_name{$backquote} (<br />\n";
		if ($sql_primary_key == "default")
			echo "&nbsp;&nbsp;{$backquote}id{$backquote} INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,<br />\n";

		reset($g_template);
		$rows = array();
		while (list($order, $data_types) = each($g_template))
		{
			foreach ($data_types as $data_type)
			{
				$data_type_folder = $data_type["data_type_folder"];
				$order            = $data_type["column_num"];
				$get_export_type_info_func = "{$data_type_folder}_get_export_type_info";
				$export_type_info = $get_export_type_info_func('sql', 'SQLite');
				$rows["$order"] = "&nbsp;&nbsp;{$backquote}{$data_type["title"]}{$backquote} " . $export_type_info;
			}
		}
		reset($g_template);
		ksort($rows, SORT_NUMERIC);
		echo implode(",<br />\n", $rows);

		echo "<br />);\n";
	}

}
