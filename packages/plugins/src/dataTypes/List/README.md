# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; List

This Data Type generates a item from a random list. 


### Example API Usage

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "List",
            "title": "Colour",
            "settings": {
                "listType": "exactly", 
                "exactly": 1,
                "list": "red|orange|yellow|green|blue|indigo|violet"
            }
        },
        {
            "type": "List",
            "title": "Numbers",
            "settings": {
                "listType": "atMost", 
                "atMost": 3,
                "list": "1|2|3|4|5"
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
