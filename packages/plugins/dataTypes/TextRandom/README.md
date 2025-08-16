# [Docs](../../../../../docs/README.md) &raquo; [Plugins](../../README.md) &raquo; [Data Types](../README.md) &raquo; TextRandom

This Data Type generates a random number of random words, taken from lorem ipsum. You can specify the min and max
number of words. 


### Example API Usage

```javascript
{
    "numRows": 20,
    "rows": [
        {
            "type": "TextFixed",
            "title": "text",
            "settings": {
                "numWords": 5 
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
