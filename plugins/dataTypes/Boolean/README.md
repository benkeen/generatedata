## Boolan Data Type

This Data Type generates random Boolean strings according to whatever format you want. Note: for the 
placeholder strings, documentation for this Data Type in the generatedata UI. That provides the list of available
placeholders.

### Example API Usage

This example generates random Boolean. POST the following JSON content to 
`http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "Boolean",
            "title": "Random False-True",
            "settings": {
                "placeholder": "False|True"
            }
        },
        {
            "type": "Boolean",
            "title": "Random 0 or 1",
            "settings": {
                "placeholder": "0|1"
            }
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "simple"
        }
    }
}
```

### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
