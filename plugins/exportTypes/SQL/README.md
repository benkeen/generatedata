## SQL Export Type

This plugin is probably the most configurable Export Type currently available. It allows you to generate the random 
data in SQL format for use in populating database such as MySQL, Oracle, SQLite and more. It offers a range of controls
to generate exactly what you want: table names, database types, query type (INSERT/UPDATE), INSERT IGNORE, Primary Keys
and others. Pretty cool.

Using the Data Generator interface you can just select whatever options you want using your mouse & keyboard,
but if you're using the API, these are the settings you'll be interested in.

- `tableName`: the string name of the database table to insert/update the data. *required*
- `databaseType`: a string. One of: `MySQL`, `Postgres`, `SQLite`, `Oracle`, `MSSQL` 
- `createTable`: a boolean. If this is set to true, the generated output will contain a `CREATE TABLE` query at the start.
- `dropTable`: a boolean. If this is set to true, the first generated query will be a safe DROP TABLE to ensure the
table doesn't already exist prior to the INSERT queries.
- `encloseWithBackquotes`: a boolean. Whether column and table names will be enclosed in backquotes.
- `statementType`: a string, one of: `insert`, `insertignore`, `update`. This governs the type of query that'll be 
generated. By and large you'll want this to be set to `insert`. 
- `insertBatchSize`: an integer. This allows you to reduce the number of queries by grouping them, e.g. a single
INSERT statement to insert 10 rows at once.
- `addPrimaryKey`: a boolean. This lets you choose to add a Primary Key field to your SQL statements.



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
        "settings" {
            
        }
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
