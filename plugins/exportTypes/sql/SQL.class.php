<?php


class SQL extends ExportTypePlugin {
	protected $exportTypeName = "SQL";
	protected $jsModules = array("SQL.js");
	public $L = array();

	function generator($numResults, $columns, $data) {

	}

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="50%">

		<table cellspacing="2" cellpadding="0" width="100%">
		<tr>
			<td width="150"><label for="sql_table_name">{$LANG["db_table_name"]}</label></td>
			<td><input type="text" size="30" name="sql_table_name" id="sql_table_name" value="myTable" /></td>
		</tr>
		<tr>
			<td><label for="sql_database">{$LANG["db_type"]}</label></td>
			<td>
				<select name="sql_database" id="sql_database">
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
					<input type="checkbox" name="sql_create_table" id="sql_create_table" checked="checked" />
					<label for="sql_create_table">{$LANG["include_create_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="sql_drop_table" id="sql_drop_table" checked="checked" />
					<label for="sql_drop_table">{$LANG["include_drop_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="enclose_with_backquotes" id="enclose_with_backquotes" checked="checked" />
					<label for="enclose_with_backquotes">{$LANG["enclose_table_backquotes"]}</label>
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
					<input type="radio" name="sql_statement_type" id="sst1" value="insert" checked="checked" />
					<label for="sst1">INSERT</label>
				</div>
				<div>
					<input type="radio" name="sql_statement_type" id="sst2" value="update" />
					<label for="sst2">UPDATE</label>
				</div>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$LANG["primary_key"]}</label></td>
			<td>
			<div>
				<input type="radio" name="sql_primary_key" id="spk2" value="none" />
				<label for="spk2">{$LANG["none"]}</label>
			</div>
			<div>
				<input type="radio" name="sql_primary_key" id="spk1" value="default" checked="checked" />
				<label for="spk1">{$LANG["add_default_auto_increment_col"]}</label>
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
}
