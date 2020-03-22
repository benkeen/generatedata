import { ETDefinition } from '../../../../types/exportTypes';

const definition: ETDefinition = {
	name: 'SQL',
	schema: {
		title: 'SQL',
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			tableName: {
				type: 'string'
			},
			databaseType: {
				enum: ['MySQL', 'Postgres', 'SQLite', 'Oracle', 'MSSQL']
			},
			createTable: {
				type: 'boolean'
			},
			dropTable: {
				type: 'boolean'
			},
			encloseWithBackquotes: {
				type: 'boolean'
			},
			statementType: {
				enum: ['insert', 'insertignore', 'update']
			},
			insertBatchSize: {
				type: 'integer'
			},
			addPrimaryKey: {
				type: 'boolean'
			}
		},
		required: ['tableName', 'databaseType']
	}
};

export default definition;
