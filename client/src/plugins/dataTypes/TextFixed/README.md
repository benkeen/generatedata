# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; TextFixed

This Data Type generates a fixed number of random words.  


### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "TextRandom",
            "title": "text",
            "settings": {
                "startsWithLipsum": false,
                "minWords": 2,
                "maxWords": 10
            }
        }
    ],
    "export": {
        "type": "JSON",
        "settings": {
            "stripWhitespace": false,
            "dataStructureFormat": "complex"
        }
    }
}
```
 
### API help

For more information about the API, check out:
[http://benkeen.github.io/generatedata/api.html](http://benkeen.github.io/generatedata/api.html)
