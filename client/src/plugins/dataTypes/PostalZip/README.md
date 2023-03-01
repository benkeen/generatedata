# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; PostalZip

This Data Type works in conjunction with the Countries plugins to generate country-specific postal/zip formats 
for consistency of data across each row. For example:


```
United Kingdom      01552 515219
Canada              (604) 264-2551
United Kingdom      01512 215441
```

### Example 

```javascript
{
    "numRows": 10,
    "countries": ["united_kingdom", "US"], 
    "rows": [
        {
            "type": "Country",
            "title": "Country Name",
            "settings": {
                "limitCountriesToSelectedPlugins": true
            }
        },
        { 
            "type": "PostalZip",
            "title": "Regional Postal/Zip Format",
            "settings": {
                "countries": ["united_kingdom", "US"]
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
