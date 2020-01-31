import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';

export type SQLSettings = {
	tableName: string;
	databaseType: string;
};

const state: SQLSettings = {
	tableName: 'myTable',
	databaseType: 'MySQL'
};

export const Settings = ({ coreI18n, i18n, data }: { coreI18n: any, i18n: any, data: any }) => {
	const onChange = (value: string) => {

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
				<div>
					<div><label htmlFor="tableName">{i18n.db_table_name}</label></div>
					<div><input type="text" id="tableName" value={data.tableName} /></div>
				</div>
				<div>
					<div><label htmlFor="databaseType">{i18n.db_type}</label></div>
					<div>
						<Dropdown 
							value={data.example}
							onChange={(i: any): void => onChange(i.value)}
							options={options}
						/>
					</div>
				</div>
				<div>
					<div><label>{i18n.misc_options}</label></div>
					<td>
						<div>
							<input type="checkbox" id="etSQL_createTable" checked />
							<label htmlFor="etSQL_createTable">{i18n.include_create_table_query}</label>
						</div>
						<div>
							<input type="checkbox" id="etSQL_dropTable" checked />
							<label htmlFor="etSQL_dropTable">{i18n.include_drop_table_query}</label>
						</div>
						<div id="etSQL_encloseWithBackquotes_group">
							<input type="checkbox" id="etSQL_encloseWithBackquotes" checked />
							<label htmlFor="etSQL_encloseWithBackquotes">{i18n.enclose_table_backquotes}</label>
						</div>
					</td>
				</div>
			</div>

			<div>
				<div>
					<div><label>{i18n.statement_type}</label></div>
					<div>
						<li>
							<input type="radio" name="etSQL_statementType" id="etSQL_statementType1" value="insert" checked />
							<label htmlFor="etSQL_statementType1">INSERT</label>
						</li>
						<li id="etSQL_insertIgnore">
							<input type="radio" name="etSQL_statementType" id="etSQL_statementType2" value="insertignore" />
							<label htmlFor="etSQL_statementType2">INSERT IGNORE</label>
						</li>
						<li>
							<input type="radio" name="etSQL_statementType" id="etSQL_statementType3" value="update" />
							<label htmlFor="etSQL_statementType3">UPDATE</label>
						</li>
					</div>
				</div>
				<div>
					<div><label htmlFor="etSQL_insertBatchSize" id="etSQL_batchSizeLabel">{i18n.insert_batch_size}</label></div>
					<div>
						<input type="text" name="etSQL_insertBatchSize" id="etSQL_insertBatchSize" value="10" size="3" title={i18n.batch_size_desc} />
					</div>
				</div>
				<div>
					<div><label>{i18n.primary_key}</label></div>
					<div>
						<div>
							<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey1" value="none" />
							<label htmlFor="etSQL_primaryKey1">{coreI18n.none}</label>
						</div>
						<div>
							<input type="radio" name="etSQL_primaryKey" id="etSQL_primaryKey2" value="default" checked />
							<label htmlFor="etSQL_primaryKey2">{i18n.add_default_auto_increment_col}</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}