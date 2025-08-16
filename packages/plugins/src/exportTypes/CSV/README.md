# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Export Types](../README.md) &raquo; CSV

The CSV Export Type generates the random data in CSV format. It provides a couple of simple options:

- `delimiter`: the character used to delimit columns 
- `eol`: the end of line character to use. For this setting, pass a string corresponding to the eol you want to 
use: `Windows`, `Unix` or `Mac`. These correspond to `\r\n`, `\n` and `\r` respectively.


### Example API Usage

Try POSTing the following JSON content to the following URL:
`http://[your site]/[generate data folder]/api/v1/data`


```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AutoIncrement",
            "title": "Row",
            "settings": {
                "incrementStart": 1,
                "incrementValue": 1
            }
        },
        {
            "type": "Names",
            "title": "name",
            "settings": {
                 "placeholder": "Name Initial. Surname"
            }
        }
    ],
    "export": {
        "type": "CSV",
        "settings": {
            "delimiter": "|",
            "eol": "Unix"
        }
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
