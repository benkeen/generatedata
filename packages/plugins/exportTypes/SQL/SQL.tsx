import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import { SQLSettings } from './SQL.state';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings } from '~types/exportTypes';
import styles from './SQL.scss';

export const Settings = ({ coreI18n, i18n, onUpdate, id, data }: ETSettings): any => {
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

	const getBackQuotesOption = (): React.ReactNode => {
		if (data.databaseType === 'Postgres' || data.databaseType === 'MSSQL') {
			return null;
		}

		return (
			<div>
				<Switch
					checked={data.encloseInBackQuotes}
					id={`${id}-encloseInBackQuotes`}
					value="checked"
					color="primary"
					onChange={(): void => onChange('encloseInBackQuotes', !data.encloseInBackQuotes)}
				/>
				<label htmlFor={`${id}-encloseInBackQuotes`}>{i18n.encloseTableBackquotes}</label>
			</div>
		);
	};

	const getInsertIgnoreOption = (): React.ReactNode => {
		if (data.databaseType !== 'MySQL') {
			return null;
		}
		return (
			<li>
				<input
					type="radio"
					value="insertIgnore"
					id={`${id}-insertIgnore`}
					onChange={(): void => onChange('statementType', 'insertIgnore')}
					checked={data.statementType === 'insertIgnore'}
				/>
				<label htmlFor={`${id}-insertIgnore`}>INSERT IGNORE</label>
			</li>
		);
	};

	const getInsertBatchSize = (): React.ReactNode => {
		if (data.databaseType === 'Oracle') {
			return null;
		}

		let classes = styles.batchSize;
		let brace = null;
		let label = <span><span className={styles.batchSizeHyphen}>&#8212;</span> {i18n.batchSize}</span>;
		if (data.databaseType === 'MySQL') {
			classes += ` ${styles.withBrace}`;
			brace = <span className={styles.brace}>&#125;</span>;
			label = i18n.batchSize;
		}

		return (
			<div className={classes}>
				{brace}
				<label
					htmlFor={`${id}_insertBatchSize`}
					id={`${id}_insertBatchSize`}>
					{label}
				</label>
				<TextField
					type="number"
					id={`${id}-insertBatchSize`}
					value={data.insertBatchSize}
					style={{ width: 60 }}
					disabled={data.statementType === 'update'}
					error={data.insertBatchSize ? '' : coreI18n.requiredField}
					min={1}
					max={1000}
					onChange={(e: any): void => onChange('insertBatchSize', parseInt(e.target.value, 10))}
				/>
			</div>
		);
	};

	const getQuotes = (): React.ReactNode => {
		if (data.databaseType !== 'MSSQL') {
			return null;
		}

		return (
			<div className={styles.block}>
				<div><label className={styles.title}>Quotes</label></div>
				<div>
					<div className={styles.row}>
						<ul>
							<li>
								<input
									type="radio"
									value="single"
									name={`${id}-quotes`}
									id={`${id}-quotesSingle`}
									onChange={(): void => onChange('quotes', 'single')}
									checked={data.quotes === 'single'}
								/>
								<label htmlFor={`${id}-quotesSingle`}>Single</label>
							</li>
							<li>
								<input
									type="radio"
									value="double"
									name={`${id}-quotes`}
									id={`${id}-quotesDouble`}
									onChange={(): void => onChange('quotes', 'double')}
									checked={data.quotes === 'double'}
								/>
								<label htmlFor={`${id}-quotesDouble`}>Double</label>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	};

	// TODO - add title for TextField above... title={i18n.batchSizeDesc}

	// TODO need better validation on the database table name

	return (
		<>
			<div>
				<div className={styles.row}>
					<div>
						<label htmlFor={`${id}-tableName`}>{i18n.dbTableName}</label>
						<div>
							<TextField
								error={data.tableName.trim() !== '' ? '' : coreI18n.requiredField}
								id={`${id}-tableName`}
								value={data.tableName}
								onChange={(e: any): void => onChange('tableName', e.target.value)}
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

				<div className={styles.block}>
					<div><label className={styles.title}>{i18n.miscOptions}</label></div>
					<div>
						<div>
							<Switch
								checked={data.dropTable}
								id={`${id}-dropTable`}
								value="checked"
								color="primary"
								onChange={(): void => onChange('dropTable', !data.dropTable)}
							/>
							<label htmlFor={`${id}-dropTable`}>{i18n.includeDropTableQuery}</label>
						</div>
						<div>
							<Switch
								checked={data.createTable}
								id={`${id}-createTable`}
								value="checked"
								color="primary"
								onChange={(): void => onChange('createTable', !data.createTable)}
							/>
							<label htmlFor={`${id}-createTable`}>
								{i18n.includeCreateTableQuery}
							</label>
						</div>
						{getBackQuotesOption()}
						<div>
							<Switch
								checked={data.addPrimaryKey}
								id={`${id}-addPrimaryKey`}
								value="checked"
								color="primary"
								onChange={(): void => onChange('addPrimaryKey', !data.addPrimaryKey)}
							/>
							<label htmlFor={`${id}-addPrimaryKey`}>{i18n.addDefaultAutoIncrementPrimaryKey}</label>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.block}>
				<div><label className={styles.title}>{i18n.statementType}</label></div>
				<div>
					<div className={styles.row}>
						<ul>
							<li>
								<input
									type="radio"
									value="insert"
									id={`${id}-insert`}
									onChange={(): void => onChange('statementType', 'insert')}
									checked={data.statementType === 'insert'}
								/>
								<label htmlFor={`${id}-insert`}>INSERT</label>
							</li>
							{getInsertIgnoreOption()}
							<li>
								<input
									type="radio"
									value="update"
									id={`${id}-update`}
									onChange={(): void => onChange('statementType', 'update')}
									checked={data.statementType === 'update'}
								/>
								<label htmlFor={`${id}-update`}>UPDATE</label>
							</li>
						</ul>

						{getInsertBatchSize()}
					</div>
				</div>
			</div>

			{getQuotes()}
		</>
	);
};

export const getCodeMirrorMode = (): string => 'text/x-sql';

export const getExportTypeLabel = (data: SQLSettings): string => data.databaseType;

export const validateTitleField = (title: string, i18n: any, settings: SQLSettings): null | string => {
	// as noted in issues/262, SQL Server allows spaces in the db names, hence the separate regexp. issues/426 noted
	// that MySQL tables can begin with _ (and 0-9 as it turns out).
	const validTableCol = new RegExp('^[0-9a-zA-Z_$]*$');
	const validTableColSQLServer = new RegExp('^[_a-zA-Z][0-9a-zA-Z_-\\s]*$');

	if (settings.databaseType === 'MSSQL') {
		if (!validTableColSQLServer.test(title)) {
			return i18n.validationInvalidColName;
		}
	} else {
		if (!validTableCol.test(title)) {
			return i18n.validationInvalidColName;
		}
	}

	return null;
};

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.sql`,
	fileType: 'text/x-sql'
});

export const isValid = (settings: SQLSettings): boolean => {
	if (!settings.tableName) {
		return false;
	}

	if (settings.databaseType !== 'Oracle' && !settings.insertBatchSize) {
		return false;
	}

	return true;
};
