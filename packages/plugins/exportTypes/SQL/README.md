# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Export Types](../README.md) &raquo; SQL


This plugin is probably the most configurable Export Type currently available. It generates the random data in SQL
format for use in populating database such as MySQL, Oracle, SQLite and more. It offers a range of controls
to generate exactly what you want: table names, database types, query type (INSERT/UPDATE), INSERT IGNORE, Primary Keys
and others. Pretty cool.

Using the GenerateData interface you can just select whatever options you want using your mouse & keyboard,
but if you're using the API, these are the settings you'll be interested in.

- `tableName`: the string name of the database table to insert/update the data. *required*
- `databaseType`: a string. One of: `MySQL`, `Postgres`, `SQLite`, `Oracle`, `MSSQL`. *required* 
- `createTable`: a boolean, defaults to `true`. If this is set to true, the generated output will contain a 
`CREATE TABLE` query at the start.
- `dropTable`: a boolean, defaults to `false`. If this is set to true, the first generated query will be a safe 
DROP TABLE to ensure the table doesn't already exist prior to the INSERT queries.
- `encloseWithBackquotes`: a boolean, defaults to `false`. Whether column and table names will be enclosed in backquotes.
- `statementType`: a string, one of: `insert`, `insertignore`, `update`. This governs the type of query that'll be 
generated. By and large you'll want this to be set to `insert`, the default value. 
- `insertBatchSize`: an integer. This allows you to reduce the number of queries by grouping them, e.g. a single
INSERT statement to insert 10 rows at once. Defaults to 1.
- `addPrimaryKey`: a boolean, defaults to `false`. This lets you choose to add a Primary Key field to your SQL 
statements.


#### Conditional settings

Some settings are database specific. 

- Postgres will ignore the `encloseWithBackquotes` setting.
- Postgres, SQLite, Oracle and MSSQL won't accept the `insertignore` as a value for the `statementType` setting. That 
only works with MySQL.


### Example API Usage

Post the following JSON content to the following API path: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 15,
    "rows": [
        {
            "type": "AlphaNumeric",
            "title": "Random Password",
            "settings": {
                "placeholder": "LLLxxLLLxLL"
            }
        },
        {
            "type": "AlphaNumeric",
            "title": "US Zipcode",
            "settings": {
                "placeholder": "xxxxx"
            }
        }
    ],
    "export": {
        "type": "SQL",
        "settings": {
            "tableName": "myTable",
            "databaseType": "MySQL",
            "encloseWithBackquotes": true,
            "createTable": true
        }
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
