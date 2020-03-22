// this is for Data Types to describe how their field should be described for the SQL DB table creation statement
export type DatabaseTypes = {

    // e.g. "varchar(50)". This is the default
    field?: string;

    // database type-specific field descriptions
    field_Oracle?: string;
    field_MSSQL?: string;
    field_Postgres?: string;
};
