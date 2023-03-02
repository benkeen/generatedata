import { ETMessageData } from '~types/exportTypes';
import { SQLSettings } from './SQL.state';
import { ColumnData } from '~types/general';

export const generate = (data: ETMessageData): string => {
	let content = '';
	if (data.settings.databaseType === 'MySQL') {
		content = generateMySQL(data);
	} else if (data.settings.databaseType === 'Postgres') {
		content = generatePostgres(data);
	} else if (data.settings.databaseType === 'SQLite') {
		content = generateSQLite(data);
	} else if (data.settings.databaseType === 'Oracle') {
		content = generateOracle(data);
	} else if (data.settings.databaseType === 'MSSQL') {
		content = generateMSSQL(data);
	}

	return content;
};

export const enum QuoteType {
	single = '\'',
	double = '"'
}

const getWrappedValue = (value: any, colIndex: number, numericFieldIndexes: number[], quote: QuoteType = QuoteType.double): any => {
	let val = '';
	if (numericFieldIndexes.indexOf(colIndex) !== -1) {
		val = value;
	} else {
		if (quote === QuoteType.double) {
			if (value.toString().indexOf(QuoteType.double) !== -1) {
				value = value.replaceAll(QuoteType.double, `${QuoteType.double}${QuoteType.double}`);
			}
		} else {
			if (value.toString().indexOf(QuoteType.single) !== -1) {
				value = value.replaceAll(QuoteType.single, `${QuoteType.single}${QuoteType.single}`);
			}
		}
		val = `${quote}${value}${quote}`;
	}
	return val;
};

export const generateMySQL = (data: ETMessageData): string => {
	const sqlSettings: SQLSettings = data.settings;
	const { isFirstBatch, columns, rows } = data;

	const backquote = sqlSettings.encloseInBackQuotes ? '`' : '';
	const colTitles = columns.map(({ title }) => title);
	let content = '';

	const numericFieldIndexes = getNumericFieldColumnIndexes(data.columns);

	if (isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `DROP TABLE IF EXISTS ${backquote}${sqlSettings.tableName}${backquote};\n\n`;
		}
		if (sqlSettings.createTable) {
			content += `CREATE TABLE ${backquote}${sqlSettings.tableName}${backquote} (\n`;
			if (sqlSettings.addPrimaryKey) {
				content += `  ${backquote}id${backquote} mediumint(8) unsigned NOT NULL auto_increment,\n`;
			}
			const cols: any[] = [];
			columns.forEach(({ title, dataType, metadata }) => {
				let columnTypeInfo = 'MEDIUMTEXT';
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
				content += '\n);\n\n';
			}
		}
	}

	let colNamesStr = '';
	if (sqlSettings.encloseInBackQuotes) {
		colNamesStr = `\`${colTitles.join('`,`')}\``;
	} else {
		colNamesStr = colTitles.join(',');
	}

	let rowDataStr: string[] = [];
	rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes));
			});
			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else if (sqlSettings.statementType === 'insertIgnore') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes));
			});
			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT IGNORE INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				const colValue = getWrappedValue(row[colIndex], colIndex, numericFieldIndexes);
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


export const generatePostgres = (generationData: ETMessageData): string => {
	const sqlSettings: SQLSettings = generationData.settings;
	const colTitles = generationData.columns.map(({ title }) => title);
	let content = '';

	const numericFieldIndexes = getNumericFieldColumnIndexes(generationData.columns);

	if (generationData.isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `DROP TABLE IF EXISTS "${sqlSettings.tableName}";\n\n`;
		}
		if (sqlSettings.createTable) {
			content += `CREATE TABLE "${sqlSettings.tableName}" (\n`;

			if (sqlSettings.addPrimaryKey) {
				content += '  id SERIAL PRIMARY KEY,\n';
			}
			const cols: any[] = [];
			generationData.columns.forEach(({ title, dataType, metadata }) => {
				let columnTypeInfo = 'MEDIUMTEXT';
				if (metadata) {
					if (metadata.sql && metadata.sql.field_Postgres) {
						columnTypeInfo = metadata.sql.field_Postgres;
					} else if (metadata.sql && metadata.sql.field) {
						columnTypeInfo = metadata.sql.field;
					}
				}
				cols.push(`  ${title} ${columnTypeInfo}`);
			});

			content += cols.join(',\n');
			content += '\n);\n\n';
		}
	}

	const colNamesStr = colTitles.join(',');

	let rowDataStr: string[] = [];
	generationData.rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes, QuoteType.single));
			});
			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT INTO ${sqlSettings.tableName} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				const colValue = getWrappedValue(row[colIndex], colIndex, numericFieldIndexes);
				pairs.push(`${title} = ${colValue}`);
			});
			const pairsStr = pairs.join(', ');
			content += `UPDATE ${sqlSettings.tableName} SET ${pairsStr} WHERE id = ${rowIndex+1};\n`;
		}
	});

	if (rowDataStr.length && sqlSettings.statementType === 'insert') {
		content += `INSERT INTO ${sqlSettings.tableName} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
	}

	return content;
};


export const generateSQLite = (generationData: ETMessageData): string => {
	const sqlSettings: SQLSettings = generationData.settings;
	const backquote = sqlSettings.encloseInBackQuotes ? '`' : '';
	const colTitles = generationData.columns.map(({ title }) => title);
	let content = '';

	const numericFieldIndexes = getNumericFieldColumnIndexes(generationData.columns);

	if (generationData.isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `DROP TABLE IF EXISTS ${backquote}${sqlSettings.tableName}${backquote};\n\n`;
		}
		if (sqlSettings.createTable) {
			content += `CREATE TABLE ${backquote}${sqlSettings.tableName}${backquote} (\n`;
			if (sqlSettings.addPrimaryKey) {
				content += `  ${backquote}id${backquote} number primary key,\n`;
			}
			const cols: any[] = [];

			generationData.columns.forEach(({ title, dataType, metadata }) => {
				let columnTypeInfo = 'MEDIUMTEXT';

				// figure out the content type. Default to MEDIUMTEXT, then use the specific SQLField_MySQL, then the SQLField
				if (metadata && metadata.sql) {
					if (metadata.sql.field_SQLite) {
						columnTypeInfo = metadata.sql.field_SQLite;
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
				content += '\n);\n\n';
			}
		}
	}

	let colNamesStr = '';
	if (sqlSettings.encloseInBackQuotes) {
		colNamesStr = `\`${colTitles.join('`,`')}\``;
	} else {
		colNamesStr = colTitles.join(',');
	}

	let rowDataStr: string[] = [];
	generationData.rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes));
			});
			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				const colValue = getWrappedValue(row[colIndex], colIndex, numericFieldIndexes);
				pairs.push(`${backquote}${title}${backquote} = ${colValue}`);
			});
			const pairsStr = pairs.join(', ');
			content += `UPDATE ${backquote}${sqlSettings.tableName}${backquote} SET ${pairsStr} WHERE ${backquote}id${backquote} = ${rowIndex+1};\n`;
		}
	});

	if (rowDataStr.length && sqlSettings.statementType === 'insert') {
		content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
	}

	return content;
};


export const generateOracle = (generationData: ETMessageData): string => {
	const sqlSettings: SQLSettings = generationData.settings;
	const backquote = sqlSettings.encloseInBackQuotes ? '`' : '';
	const colTitles = generationData.columns.map(({ title }) => title);
	let content = '';

	const numericFieldIndexes = getNumericFieldColumnIndexes(generationData.columns);

	if (generationData.isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `DROP TABLE ${backquote}${sqlSettings.tableName}${backquote};\n\n`;
		}
		if (sqlSettings.createTable) {
			content += `CREATE TABLE ${backquote}${sqlSettings.tableName}${backquote} (\n`;
			if (sqlSettings.addPrimaryKey) {
				content += `  ${backquote}id${backquote} number primary key,\n`;
			}

			const cols: any[] = [];
			generationData.columns.forEach(({ title, dataType, metadata }) => {
				let columnTypeInfo = 'MEDIUMTEXT';
				if (metadata && metadata.sql) {
					if (metadata.sql.field_Oracle) {
						columnTypeInfo = metadata.sql.field_Oracle;
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
				content += '\n);\n\n';
			}
		}
	}

	let colNamesStr = '';
	if (sqlSettings.encloseInBackQuotes) {
		colNamesStr = `\`${colTitles.join('`,`')}\``;
	} else {
		colNamesStr = colTitles.join(',');
	}

	const rowDataStr: string[] = [];
	generationData.rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes));
			});
			const rowDataStr = displayVals.join(',');
			content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES (${rowDataStr});\n`;
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				const colValue = getWrappedValue(row[colIndex], colIndex, numericFieldIndexes);
				pairs.push(`${backquote}${title}${backquote} = ${colValue}`);
			});
			const pairsStr = pairs.join(', ');
			content += `UPDATE ${backquote}${sqlSettings.tableName}${backquote} SET ${pairsStr} WHERE ${backquote}id${backquote} = ${rowIndex+1};\n`;
		}
	});

	if (rowDataStr.length && sqlSettings.statementType === 'insert') {
		content += `INSERT INTO ${backquote}${sqlSettings.tableName}${backquote} (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
	}

	return content;
};


export const generateMSSQL = (generationData: ETMessageData): string => {
	const sqlSettings: SQLSettings = generationData.settings;
	const colTitles = generationData.columns.map(({ title }) => title);
	const quote = sqlSettings.quotes === 'single' ? QuoteType.single : QuoteType.double;
	let content = '';

	const numericFieldIndexes = getNumericFieldColumnIndexes(generationData.columns);

	if (generationData.isFirstBatch) {
		if (sqlSettings.dropTable) {
			content += `IF EXISTS(SELECT 1 FROM sys.tables WHERE object_id = OBJECT_ID(${quote}${sqlSettings.tableName}${quote}))\n`;
			content += 'BEGIN;\n';
			content += `    DROP TABLE [${sqlSettings.tableName}];\n`;
			content += 'END;\n';
			content += 'GO\n\n';
		}

		if (sqlSettings.createTable) {
			content += `CREATE TABLE [${sqlSettings.tableName}] (\n`;
			if (sqlSettings.addPrimaryKey) {
				content += `    [${sqlSettings.tableName}ID] INTEGER NOT NULL IDENTITY(1, 1),\n`;
			}

			const cols: any[] = [];
			generationData.columns.forEach(({ title, dataType, metadata }) => {
				let columnTypeInfo = 'MEDIUMTEXT';
				if (metadata && metadata.sql) {
					if (metadata.sql.field_MSSQL) {
						columnTypeInfo = metadata.sql.field_MSSQL;
					} else if (metadata.sql.field) {
						columnTypeInfo = metadata.sql.field;
					}
				}
				cols.push(`    [${title}] ${columnTypeInfo}`);
			});

			content += cols.join(',\n');
			if (sqlSettings.addPrimaryKey) {
				content += `,\n    PRIMARY KEY ([${sqlSettings.tableName}ID])\n);\nGO\n\n`;
			} else {
				content += '\n);\nGO\n\n';
			}
		}
	}

	const colNamesStr = colTitles.join(',');

	let rowDataStr: string[] = [];
	generationData.rows.forEach((row: any, rowIndex: number) => {
		if (sqlSettings.statementType === 'insert') {
			const displayVals: any = [];
			colTitles.forEach((columnTitle: string, colIndex: number) => {
				displayVals.push(getWrappedValue(row[colIndex], colIndex, numericFieldIndexes, quote));
			});
			rowDataStr.push(displayVals.join(','));
			if (rowDataStr.length === sqlSettings.insertBatchSize) {
				content += `INSERT INTO [${sqlSettings.tableName}] (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
				rowDataStr = [];
			}

			// TODO - need the current row
			// if (($currentRow % 1000) == 0) {
			// 	$content .= $endLineChar;
			// 	$content .= "PRINT 'Row {$currentRow} inserted';$endLineChar";
			// 	$content .= "GO";
			// 	$content .= $endLineChar;
			// }
		} else {
			const pairs: string[] = [];
			colTitles.forEach((title: string, colIndex: number) => {
				const colValue = getWrappedValue(row[colIndex], colIndex, numericFieldIndexes);
				pairs.push(`[${title}] = ${colValue}`);
			});
			const pairsStr = pairs.join(', ');
			content += `UPDATE [${sqlSettings.tableName}] SET ${pairsStr} WHERE [{$this->tableName}ID] = ${rowIndex+1};\n`;

			// if (($currentRow % 1000) == 0) {
			// 	$content .= $endLineChar;
			// 	$content .= "PRINT 'Row {$currentRow} updated';$endLineChar";
			// 	$content .= "GO";
			// 	$content .= $endLineChar;
			// }
		}
	});

	if (rowDataStr.length && sqlSettings.statementType === 'insert') {
		content += `INSERT INTO [${sqlSettings.tableName}] (${colNamesStr})\nVALUES\n  (${rowDataStr.join('),\n  (')});\n`;
	}

	return content;
};


export const getNumericFieldColumnIndexes = (columns: ColumnData[]): number[] => {
	const numericFieldColIndexes: number[] = [];

	columns.forEach((col: ColumnData, colIndex: number) => {
		const { metadata } = col;
		const dataType = metadata.general && metadata.general.dataType;

		if (dataType === 'number') {
			numericFieldColIndexes.push(colIndex);
		}
	});

	return numericFieldColIndexes;
};
