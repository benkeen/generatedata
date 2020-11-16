## AutoIncrement Data Type

This Data Type generates auto-increment sequences as number of strings in a variety of different ways. Note: for the 
increment placeholder strings check out the documentation for this Data Type, found within the generatedata UI.

### Example API Usage

This example generates a couple of auto-increment values: 
- 1, 2, 3, 4, ...
- 100B, 95B, 90B, 85B, ...

POST the following JSON content to `http://[your site]/[generate data folder]/api/v1/data`:

```javascript
{
    "numRows": 10,
    "rows": [
        {
            "type": "AutoIncrement",
            "title": "Simple increment",
            "settings": {
                "incrementStart": 1,
                "incrementValue": 1
            }
        },
        {
            "type": "AutoIncrement",
            "title": "Decrement with placeholder",
            "settings": {
                "incrementStart": 100,
                "incrementValue": -5,
                "incrementPlaceholder": "{$INCR}B"
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
