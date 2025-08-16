import { ETState } from '~types/exportTypes';

export type GenerationOptionsType = {
	tableName: string;
	databaseType: 'MySQL' | 'Postgres' | 'SQLite' | 'Oracle' | 'MSSQL';
	createTable: boolean;
	dropTable: boolean;
	encloseInBackQuotes: boolean;
	statementType: 'insert' | 'insertIgnore' | 'update';
	insertBatchSize: number;
	addPrimaryKey: boolean;
	quotes: 'single' | 'double';
}

export const defaultGenerationOptions: GenerationOptionsType = {
	tableName: 'myTable',
	databaseType: 'MySQL',
	createTable: true,
	dropTable: true,
	encloseInBackQuotes: true,
	statementType: 'insert',
	insertBatchSize: 10,
	addPrimaryKey: true,
	quotes: 'single'
};

export interface SQLSettings extends ETState, GenerationOptionsType {}

export const initialState: SQLSettings = {
	...defaultGenerationOptions,
	isValid: true
};
