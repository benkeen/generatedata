import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Dropdown from '../../../components/dropdown/Dropdown';
import { ETSettings } from '../../../../types/exportTypes';
import styles from './SQL.scss';


export type SQLSettings = {
	tableName: string;
	databaseType: string;
	createTable: boolean;
	dropTable: boolean;
	encloseInBackquotes: boolean;
	statementType: 'insert' | 'insertIgnore' | 'update';
	insertBatchSize: number;
	addPrimaryKey: boolean;
};

export const initialState: SQLSettings = {
	tableName: 'myTable',
	databaseType: 'MySQL',
	createTable: true,
	dropTable: true,
	encloseInBackquotes: true,
	statementType: 'insert',
	insertBatchSize: 10,
	addPrimaryKey: true
};

export const Settings: React.ReactNode = ({ i18n, onUpdate, id, data }: ETSettings) => {
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const options = [
		{ value: 'MySQL', label: 'MySQL' },
		{ value: 'Postgres', label: 'Postgres' },
		{ value: 'SQLite', label: 'SQLite' },
		{ value: 'Oracle', label: 'Oracle' },
		{ value: 'MSSQL', label: 'MSSQL' }
	];

	return (
		<>
			<div>
				<div className={styles.row}>
					<div>
						<label htmlFor={`${id}-tableName`}>{i18n.dbTableName}</label>
						<div>
							<input
								type="text"
								id={`${id}-tableName`}
								value={data.tableName}
								onChange={(e): void => onChange('tableName', e.target.value)}
							/>
						</div>
					</div>
					<div>
						<label htmlFor={`${id}-databaseType`}>{i18n.dbType}</label>
						<div>
							<Dropdown
								id={`${id}-databaseType`}
								value={data.databaseType}
								options={options}
								onChange={(i: any): void => onChange('databaseType', i.value)}
							/>
						</div>
					</div>
				</div>

				<div>
					<div><label>{i18n.miscOptions}</label></div>
					<div>
						<div>
							<Switch
								checked={data.dropTable}
								id={`${id}-dropTable`}
								value="checked"
								color="default"
								onChange={(): void => onChange('dropTable', !data.dropTable)}
							/>
							<label htmlFor={`${id}-dropTable`}>{i18n.includeDropTableQuery}</label>
						</div>
						<div>
							<Switch
								checked={data.createTable}
								id={`${id}-createTable`}
								value="checked"
								color="default"
								onChange={(): void => onChange('createTable', !data.createTable)}
							/>
							<label htmlFor={`${id}-createTable`}>
								{i18n.includeCreateTableQuery}
							</label>
						</div>
						<div id="etSQL_encloseInBackquotes_group">
							<Switch
								checked={data.encloseInBackquotes}
								id={`${id}-encloseInBackquotes`}
								value="checked"
								color="default"
								onChange={(): void => onChange('encloseInBackquotes', !data.encloseInBackquotes)}
							/>
							<label htmlFor={`${id}-encloseInBackquotes`}>{i18n.encloseTableBackquotes}</label>
						</div>
						<div>
							<Switch
								checked={data.addPrimaryKey}
								id={`${id}-addPrimaryKey`}
								value="checked"
								color="default"
								onChange={(): void => onChange('addPrimaryKey', !data.addPrimaryKey)}
							/>
							<label htmlFor={`${id}-addPrimaryKey`}>{i18n.addDefaultAutoIncrementPrimaryKey}</label>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div><label>{i18n.statementType}</label></div>
				<RadioGroup name="gender1" value={data.statementType} onChange={(e): void => onChange('statementType', e.target.value)}>
					<div>
						<div className={styles.row}>
							<div>
								<FormControlLabel
									value="insert"
									control={<Radio />}
									label="INSERT"
								/>
								<br />
								<FormControlLabel
									id="etSQL_insertIgnore"
									value="insertIgnore"
									control={<Radio />}
									label="INSERT IGNORE"
								/>
							</div>
							<div className={styles.batchSize}>
								<span style={{ fontSize: 50, color: '#dddddd' }}>&#125;</span>
								<label
									htmlFor={`${id}_insertBatchSize`}
									id={`${id}_insertBatchSize`}>
									{i18n.batchSize}
								</label>
								<input
									type="number"
									id={`${id}-insertBatchSize`}
									value={data.insertBatchSize}
									style={{ width: 60 }}
									title={i18n.batchSizeDesc}
									disabled={data.statementType === 'update'}
									min={1}
									max={1000}
									onChange={(e): void => onChange('insertBatchSize', parseInt(e.target.value, 10))}
								/>
							</div>
						</div>

						<div>
							<FormControlLabel
								value="update"
								control={<Radio />}
								label="UPDATE"
							/>
						</div>
					</div>
				</RadioGroup>
			</div>
		</>
	);
};


/*

	var _onChangeStatementType = function(e) {
		if (e.target.value === "insert" || e.target.value === "insertignore") {
			$("#etSQL_batchSizeLabel").css("color", "");
			$("#etSQL_insertBatchSize").prop("disabled", false).removeClass("gdDisabled");
		} else {
			$("#etSQL_insertBatchSize").prop("disabled", true).addClass("gdDisabled");
			$("#etSQL_batchSizeLabel").css("color", "#cccccc");
		}
	};

	var _onChangeSettings = function() {
		var dbType = $("#etSQL_databaseType").val();
		_updateAvailableSettings(dbType);
	};

	var _updateAvailableSettings = function(dbType) {
		if (dbType === "Postgres") {
			$("#etSQL_encloseWithBackquotes").prop("disabled", true).prop("checked", false);
			$("#etSQL_encloseWithBackquotes_group label").css("color", "#cccccc");
		} else {
			$("#etSQL_encloseWithBackquotes").prop("disabled", false);
			$("#etSQL_encloseWithBackquotes_group label").css("color", "");
		}

		if (dbType === "MySQL") {
			$("#etSQL_statementType2").prop("disabled", false);
			$("#etSQL_insertIgnore label").css("color", "");
		} else {
			$("#etSQL_statementType2").prop("disabled", true).prop("checked", false);
			$("#etSQL_insertIgnore label").css("color", "#cccccc");
		}

    if (dbType === "Oracle") {
      $("#etSQL_insertBatchSize").prop("disabled", true).css("color", "#cccccc");
      $("#etSQL_batchSizeLabel").css("color", "#cccccc");
    } else {
      $("#etSQL_insertBatchSize").prop("disabled", false).css("color", "");
      $("#etSQL_batchSizeLabel").css("color", "");
    }
	};

	var _resultTypeChanged = function(msg) {
		if (msg.newExportType === "SQL") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	};

	 * If the user is generating in-page data with this Export Type, enable the XML
	 * mode for the in-page editor. Since Oracle and SQLite don't have their own CodeMirror modes yet,
	 * we just re-use MySQL for all of them: they're pretty similar, anyway.
	var _onGenerate = function(msg) {
		if (msg.exportTarget !== "inPage" || msg.exportType !== "SQL") {
			return;
		}

		// the default mode is a simple x-sql mime type. But if there's a specific one available for the
		// chosen database type, use that instead
		var selectedSQLMode = $("#etSQL_databaseType").val();
		var mode = "text/x-sql";
		switch (selectedSQLMode) {
			case "MySQL":
				mode = "text/x-mysql";
				break;
			case "MSSQL":
				mode = "text/x-mssql";
				break;
		}

		msg.editor.setOption("mode", mode);
	};

	var _validate = function(rowNums) {
		var errors = [];

		// first, check the Table Column names that have been entered are valid
		var errorFields = [];
		var errorFieldVisibleRowNums = [];

    // as noted in issues/262, SQL Server allows spaces in the db names, hence the separate regexp. issues/426 noted
    // that MySQL tables can begin with _ (and 0-9 as it turns out).
    var validTableCol          = new RegExp("^[0-9a-zA-Z_$]*$");
    var validTableColSQLServer = new RegExp("^[_a-zA-Z][0-9a-zA-Z_\\s]*$");

    var selectedSQLMode = $("#etSQL_databaseType").val();

		for (var i=0; i<rowNums.length; i++) {
			var tableColField = $("#gdTitle_" + rowNums[i]);
			var tableColFieldVal = tableColField.val();

			// we don't bother throwing an error if the field is empty, because that's caught by the Core script
			if (tableColFieldVal === "") {
        continue;
      }

      var hasError = false;
      if (selectedSQLMode === "MSSQL") {
        if (!validTableColSQLServer.test(tableColFieldVal)) {
          hasError = true;
        }
      } else {
        if (!validTableCol.test(tableColFieldVal)) {
          hasError = true;
        }
      }

      if (hasError) {
        errorFields.push(tableColField);
        errorFieldVisibleRowNums.push(generator.getVisibleRowOrderByRowNum(rowNums[i]));
      }
		}

		if (errorFields.length) {

      // N.B. the error message here isn't quite right for SQL Server, which permits spaces. But frankly it's best if they
      // don't know about it. The code will work (the PHP side will automatically detect the space and wrap it in brackets)
			errors.push({
				els: errorFields,
				error: LANG.validation_invalid_col_name + "<b>" + errorFieldVisibleRowNums.join(", ") + "</b>"
			});
		}

		// secondly, check the SQL fields have all been entered properly
		var tableNameField = $("#etSQL_tableName");
		var tableNameFieldVal = $.trim(tableNameField.val());
		var validTableName = new RegExp("^[a-zA-Z_][0-9a-zA-Z_$]*$");
		if (tableNameFieldVal === "" || !validTableName.test(tableNameFieldVal)) {
			errors.push({
				els: tableNameField,
				error: LANG.validation_invalid_table_name
			});
		}

		// check batch size if current statement type is "insert" or "insertignore"
		var statementType = $.trim($('input[name="etSQL_statementType"]:checked').val());
		if (statementType === "insert" || statementType === "insertignore") {
			var validBatchSize = new RegExp("^([1-9]|[1-9][0-9]|[1-2][0-9][0-9]|300)$");
			var batchSizeField = $("#etSQL_insertBatchSize");
			var batchSizeFieldVal = $.trim(batchSizeField.val());
			if (batchSizeFieldVal === "" || !validBatchSize.test(batchSizeFieldVal)) {
				errors.push({
					els: batchSizeField,
					error: LANG.validation_invalid_batch_size
				});
			}
		}

		return errors;
	};

	var _loadSettings = function(settings) {
		$("#etSQL_tableName").val(settings.tableName);
		$("#etSQL_databaseType").val(settings.databaseType);
		if (settings.createTable == "1") {
			$("#etSQL_createTable").attr("checked", "checked");
		} else {
			$("#etSQL_createTable").removeAttr("checked");
		}
		if (settings.dropTable == "1") {
			$("#etSQL_dropTable").attr("checked", "checked");
		} else {
			$("#etSQL_dropTable").removeAttr("checked");
		}
		if (settings.encloseWithBackquotes == "1") {
			$("#etSQL_encloseWithBackquotes").attr("checked", "checked");
		} else {
			$("#etSQL_encloseWithBackquotes").removeAttr("checked");
		}

		$("input[name=etSQL_statementType]:eq(" + settings.statementType + ")").attr("checked", "checked");

		if (settings.hasOwnProperty("insertBatchSize")) {
			$("#etSQL_insertBatchSize").val(settings.insertBatchSize);
		}
		$("input[name=etSQL_primaryKey][value=" + settings.primaryKey + "]").attr("checked", "checked");
	};
*/
