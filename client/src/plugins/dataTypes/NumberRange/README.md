# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; NumberRange

This Data Type generates a number.


### Example API Usage

This generates a number between 1 and 100. Just POST the following JSON content to: 
`http://[your site]/[generate data folder]/api/v1/data`

```javascript
{
    "numRows": 50,
    "rows": [
        {
            "type": "NumberRange",
            "title": "num",
            "settings": {
                "rangeMin": 1,
                "rangeMax": 100
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
