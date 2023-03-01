# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; Phone

This Data Type generates a phone number with a simple search-replace algorithm. Any `X`'s in the placeholder
string are replaced with 1-9; any `x`'s (lowercase) are replaced with 0-9. 


### Example API Usage

Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "rows": [
        {
            "type": "Phone",
            "title": "phone_num",
            "settings": {
                "placeholder": "1-Xxx-Xxx-xxxx"
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

Tip: to generate random formats, just include multiple values for the placeholder field in the string, separated by a `|` pipe
character. The generator will pick one of the formats at random.

 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
