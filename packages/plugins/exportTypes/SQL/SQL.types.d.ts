// this is for Data Types to describe how their field should be described for the SQL DB table creation statement
export type DatabaseTypes = {

    // e.g. "varchar(50)". This is the default value used for all DB types if they're not defined in one of the custom
	// properties below
    field?: string;

    // database type-specific field descriptions
    field_Oracle?: string;
	field_MySQL?: string;
    field_MSSQL?: string;
    field_Postgres?: string;
	field_SQLite?: string;
};
