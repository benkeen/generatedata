<?php


class SQL extends ExportTypePlugin {
	protected $exportTypeName = "SQL";
	protected $jsModules = array("SQL.js");

	function generator($numResults, $columns, $data) {

	}

	function getAdditionalSettingsHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="50%">

		<table cellspacing="2" cellpadding="0" width="100%">
		<tr>
			<td width="150"><label for="sql_table_name">{$L["db_table_name"]}</label></td>
			<td><input type="text" size="30" name="sql_table_name" id="sql_table_name" value="myTable" /></td>
		</tr>
		<tr>
			<td><label for="sql_database">{$L["db_type"]}</label></td>
			<td>
				<select name="sql_database" id="sql_database">
					<option value="MySQL">MySQL</option>
					<option value="SQLite">SQLite</option>
					<option value="Oracle">Oracle</option>
				</select>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$L["misc_options"]}</label></td>
			<td>
				<div>
					<input type="checkbox" name="sql_create_table" id="sql_create_table" checked />
					<label for="sql_create_table">{$L["include_create_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="sql_drop_table" id="sql_drop_table" checked />
					<label for="sql_drop_table">{$L["include_drop_table_query"]}</label>
				</div>
				<div>
					<input type="checkbox" name="enclose_with_backquotes" id="enclose_with_backquotes" checked />
					<label for="enclose_with_backquotes">{$L["enclose_table_backquotes"]}</label>
				</div>
			</td>
		</tr>
		</table>

	</td>
	<td width="50%" valign="top">

		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td valign="top"><label>{$L["statement_type"]}</label></td>
			<td>
				<div>
					<input type="radio" name="sql_statement_type" id="sst1" value="insert" checked />
					<label for="sst1">INSERT</label>
				</div>
				<div>
					<input type="radio" name="sql_statement_type" id="sst2" value="update" />
					<label for="sst2">UPDATE</label>
				</div>
			</td>
		</tr>
		<tr>
			<td valign="top"><label>{$L["primary_key"]}</label></td>
			<td>
			<div>
				<input type="radio" name="sql_primary_key" id="spk2" value="none" />
				<label for="spk2">{$L["none"]}</label>
			</div>
			<div>
				<input type="radio" name="sql_primary_key" id="spk1" value="default" checked />
				<label for="spk1">{$L["add_default_auto_increment_col"]}</label>
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
